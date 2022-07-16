import React, { Suspense, useState, useEffect, useMemo } from 'react';
import logger from 'sabio-debug';
import { Routes, Route, useLocation } from 'react-router-dom';
import DefaultLayout from './layouts/Default';
import HorizontalLayout from './layouts/Horizontal/';
import userService from './services/userService';
import '@stripe/react-stripe-js';
import ReactGA from 'react-ga';

import { authFlatRoutes, publicFlatRoutes } from './routes';
import defaultUser from './constants/defaultUser';
import ContextHolder from './helpers/ContextHolder';

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_VIEWID);

const loading = () => <div className="">loading....</div>;
const _logger = logger.extend('App');

export default function App(props) {
    const { pathname, state } = useLocation();
    const [currentUser, setCurrentUser] = useState({
        ...defaultUser,
    });
    const [pathRouting, setPathRouting] = useState({
        isPublic: false,
        isSecured: false,
        hasAccess: false,
        isKnown: false,
    });

    useEffect(() => {
        userService.current().then(onGetUserSuccess).catch(onGetUserError);
        _logger('initial useEffect');
    }, []);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
        userService.current().then(onGetUserSuccess).catch(onGetUserError);

        if (pathRouting.hasAccess === true) {
            _logger('pathname useEffect');
            setCurrentUser({ id: 0, roles: [], email: '', isLoggedIn: false });
        }
    }, [pathname]);

    useEffect(() => {
        if (state?.type === 'LOGOUT') {
            _logger('state useEffect');
            setCurrentUser({ id: 0, roles: [], email: '', isLoggedIn: false });
        }
    }, [state]);

    useEffect(() => {
        updatePathRouting();
    }, [currentUser]);

    const onGetUserSuccess = (message) => {
        let loginData = message.data.item;
        setCurrentUser({
            ...loginData,
            roles: loginData.roles.map((x) => x.name),
            listingIds: loginData.listingIds.map((x) => x.id),
            isLoggedIn: true,
        });

        _logger('User login data found: ', message);
    };
    const onGetUserError = (message) => {
        _logger('User not logged in: ', message);
    };

    const updatePathRouting = () => {
        let pathRouting = {
            isPublic: false,
            isSecured: false,
            hasAccess: false,
            isKnown: false,
        };

        let flatRoutes = publicFlatRoutes.concat(authFlatRoutes);

        flatRoutes.some((pp) => {
            if (pathRoutingCheck(pp)) {
                pathRouting.isKnown = true;
                if (typeof pp.roles === 'undefined' || pp.roles.length === 0) {
                    pathRouting.isPublic = true;
                } else {
                    pathRouting.isSecured = true;
                    if (hasMatchingItem(currentUser.roles, pp.roles)) {
                        pathRouting.hasAccess = true;
                    }
                }
                return true;
            } else return false;
        });

        _logger('Current path:', pathRouting);

        setPathRouting(pathRouting);
    };

    const hasMatchingItem = (arr1, arr2) => {
        return arr1.some((r) => arr2.includes(r));
    };

    const pathRoutingCheck = (pp) => {
        let ppPath = pp.path.split('/').filter((el) => el !== '');
        let pathNameCheck = pathname.split('/').filter((el) => el !== '');
        let result = false;
        if (ppPath.length === pathNameCheck.length) {
            if (pathNameCheck.length === 0) {
                result = true;
            } else {
                for (let a = 0; a < pathNameCheck.length; a++) {
                    if (pathNameCheck[a] !== ppPath[a]) {
                        if (ppPath[a].startsWith(':') && pathNameCheck[a].match(/^[0-9]+$/)) {
                            result = true;
                        } else {
                            return false;
                        }
                    } else {
                        result = true;
                    }
                }
            }
        }
        return result;
    };

    const mapRoutes = (routes) => {
        routes = routes.filter((route) => {
            if (route.roles?.length === 0) {
                return true;
            }
            return route.roles?.some((role) => currentUser.roles.includes(role));
        });

        let mappedRoutes = routes.map((routeData) => (
            <Route
                key={routeData.path}
                path={routeData.path}
                exact={routeData.exact}
                name={routeData.name}
                element={<routeData.element currentUser={currentUser} />}
            />
        ));

        return mappedRoutes;
    };

    const mapPublicRoutes = useMemo(() => {
        return mapRoutes(publicFlatRoutes);
    }, [publicFlatRoutes, currentUser]);

    const mapAuthRoutes = useMemo(() => {
        return mapRoutes(authFlatRoutes);
    }, [authFlatRoutes, currentUser]);

    return (
        <div>
            <Suspense fallback={loading}>
                <ContextHolder.Provider value={{ user: currentUser, setUser: setCurrentUser }}>
                    {pathRouting.isKnown && pathRouting.isSecured && pathRouting.hasAccess ? (
                        <HorizontalLayout {...props}>
                            <Routes>{mapAuthRoutes}</Routes>
                        </HorizontalLayout>
                    ) : (
                        <DefaultLayout {...props}>
                            <Routes>{mapPublicRoutes}</Routes>
                        </DefaultLayout>
                    )}
                </ContextHolder.Provider>
            </Suspense>
        </div>
    );
}
