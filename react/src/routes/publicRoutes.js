import { lazy } from 'react';

const BlogDisplay = lazy(() => import('../pages/blogs/BlogsDisplay'));
const BlogPage = lazy(() => import('../pages/blogs/BlogPage'));
const Chat = lazy(() => import('../pages/apps/chat/Chat'));
//const Customer = lazy(() => import('../components/stripe/Customer/CreateForm'));
const Listing = lazy(() => import('../components/listings/AddListing'));
const Login = lazy(() => import('../pages/loginpage/Login'));
const Register = lazy(() => import('../pages/registerpage/Register'));
const Events = lazy(() => import('../components/events/Events'));
const EventCardPage = lazy(() => import('../components/events/EventCardPage'));
const LocationVerification = lazy(() => import('../pages/verificationpage/LocationVerification'));
// const Product = lazy(() => import('../pages/ecommerce/'));
//const Products = lazy(() => import('../pages/ecommerce/Products'));

const EventWizard = lazy(() => import('../components/eventwizard/EventWizardSA'));

const ErrorPageNotFound = lazy(() => import('../pages/error/PageNotFound'));
const ErrorServerError = lazy(() => import('../pages/error/ServerError'));
const Landing = lazy(() => import('../pages/landing/'));
const LandingAboutPage = lazy(() => import('../components/aboutpage/AboutPage'));
const LandingContactPage = lazy(() => import('../components/contact/ContactPage'));
const LandingFAQs = lazy(() => import('../components/questions/FAQ'));
const ListingSearch = lazy(() => import('../pages/searchlisting/'));
const ListingView = lazy(() => import('../pages/viewlisting/'));
const ReservationForm = lazy(() => import('../reservations/ReservationForm'));
const TestAddALocation = lazy(() => import('../components/locations/AddALocation'));
const TestExternalLinks = lazy(() => import('../components/externallinks/ExternalLinks'));
const TestSwapperStory = lazy(() => import('../components/SwapperStory/SwapperStory'));
const UserRegister = lazy(() => import('../pages/registerpage/Register'));
const UserLogin = lazy(() => import('../pages/loginpage/Login'));
const UserLogout = lazy(() => import('../components/logout/Logout'));
const UserUnsubscribe = lazy(() => import('../pages/unsubscribepage/Unsubscribe'));
const UserChangePassword = lazy(() => import('../pages/changepassword/ChangePassword'));
const UserForgotPassword = lazy(() => import('../pages/forgotpassword/ForgotPassword'));
const VenueForm = lazy(() => import('../components/venue/VenueForm'));
const Venue = lazy(() => import('../components/venue/Venue'));
const SwapListing = lazy(() => import('../reservations/SwapListing'));
const UserListing = lazy(() => import('../reservations/UserListing'));
const Cart = lazy(() => import('../pages/checkoutpage/Cart'));
const VenuePage = lazy(() => import('../components/venue/VenuePage'));

const landingRoutes = [
    {
        path: '/',
        name: 'Kommu Landing',
        exact: true,
        element: Landing,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/eventwizard',
        name: 'EventWizard',
        exact: true,
        element: EventWizard,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/eventwizard/:eventId',
        name: 'EventWizard',
        exact: true,
        element: EventWizard,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/location',
        name: 'Location',
        exact: true,
        element: TestAddALocation,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/verification',
        name: 'Location Verification',
        exact: true,
        element: LocationVerification,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/listing',
        name: 'Listing',
        exact: true,
        element: Listing,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/login',
        name: 'Login',
        exact: true,
        element: Login,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/register',
        name: 'Register',
        exact: true,
        element: Register,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/faq',
        name: 'FAQ',
        exact: true,
        element: LandingFAQs,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/AboutUs',
        name: 'About Us',
        exact: true,
        element: LandingAboutPage,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/contactus',
        name: 'Contact Us',
        exact: true,
        element: LandingContactPage,
        roles: [],
        isAnonymous: true,
    },
];
const eventRoutes = [
    {
        path: '/events',
        name: 'Events',
        exact: true,
        element: Events,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/event/view/:eventId',
        name: 'EventCardPage',
        exact: true,
        element: EventCardPage,
        roles: [],
        isAnonymous: true,
    },
];
const blogRoutes = [
    {
        path: '/blogs',
        name: 'Blogs',
        exact: true,
        element: BlogDisplay,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/blogPage',
        name: 'Blog Page',
        exact: true,
        element: BlogPage,
        roles: [],
        isAnonymous: true,
    },
];
const cartRoute = [
    {
        path: '/checkout',
        name: 'Cart',
        exact: true,
        element: Cart,
        roles: [],
        isAnonymous: true,
    },
];
const userRoutes = [
    {
        path: '/register',
        name: 'Register',
        exact: true,
        element: UserRegister,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/login',
        name: 'Login',
        exact: true,
        element: UserLogin,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/logout',
        name: 'Logout',
        exact: true,
        element: UserLogout,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/unsubscribe',
        name: 'Unsubscribe',
        exact: true,
        element: UserUnsubscribe,
        roles: [],
        isAnonymous: true,
    },
];
const checkoutRoute = [
    {
        path: '/changepassword',
        name: 'ChangePassword',
        exact: true,
        element: UserChangePassword,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/forgotpassword',
        name: 'ForgotPassword',
        exact: true,
        element: UserForgotPassword,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/chat',
        name: 'Chat',
        exact: true,
        element: Chat,
        roles: [],
        isAnonymous: true,
    },
];

const locationVenueRoutes = [
    {
        path: '/venues/new',
        name: 'New Venue',
        exact: true,
        element: VenueForm,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/venues',
        name: 'Venues',
        exact: true,
        element: Venue,
        roles: [],
        isAnonymous: true,
    },
];
const listingsRoutes = [
    {
        path: '/listings',
        name: 'Search Listing',
        exact: true,
        element: ListingSearch,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/listing/view/:listingId',
        name: 'View Listing',
        exact: true,
        element: ListingView,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/listing/swap/:listingIdToConfirm',
        name: 'Swap Listing page',
        element: SwapListing,
        roles: [],
        exact: true,
        isAnonymous: true,
    },
];
const reservationRoutes = [
    {
        path: '/reservationform/:listingId',
        name: 'Reservation Form',
        element: ReservationForm,
        roles: [],
        exact: true,
        isAnonymous: true,
    },
];
const testingRoutes = [
    {
        path: '/externallinks',
        name: 'External Links',
        element: TestExternalLinks,
        roles: [],
        exact: true,
        isAnonymous: true,
    },
    {
        path: '/story',
        name: 'Swapper Story',
        exact: true,
        element: TestSwapperStory,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/location',
        name: 'Location',
        exact: true,
        element: TestAddALocation,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/userlisting',
        name: 'User Listing',
        exact: true,
        element: UserListing,
        roles: [],
        isAnonymous: true,
    },
];
const errorRoutes = [
    {
        path: '/error-500',
        name: 'Error - 500',
        element: ErrorServerError,
        roles: [],
        exact: true,
        isAnonymous: true,
    },
    {
        path: '*',
        name: 'Error - 404',
        element: ErrorPageNotFound,
        roles: [],
        exact: true,
        isAnonymous: true,
    },
];
const venuePage = [
    {
        path: '/venues/view/:id',
        name: 'SingleVenue',
        exact: true,
        element: VenuePage,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/venues/:id',
        name: 'VenueForm',
        exact: true,
        element: VenueForm,
        roles: [],
        isAnonymous: true,
    },
];

const allRoutes = [
    ...errorRoutes,
    ...cartRoute,
    ...landingRoutes,
    ...eventRoutes,
    ...blogRoutes,
    ...userRoutes,
    ...listingsRoutes,
    ...locationVenueRoutes,
    ...testingRoutes,
    ...reservationRoutes,
    ...cartRoute,
    ...venuePage,
    ...checkoutRoute,
];
export default allRoutes;
