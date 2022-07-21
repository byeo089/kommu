import { lazy } from 'react';

const AdminAnalytics = lazy(() => import('../pages/dashboard/analytics'));
const AdminDashboard = lazy(() => import('../components/standin/AdminDashboard'));
const BlogAddForm = lazy(() => import('../components/forms/BlogAddForm'));
const AdminViewUsers = lazy(() => import('../pages/userstable/UsersTable'));
const newsLettersTemplate = lazy(() => import('../components/templates/NewsLetterTemplate'));
const newsletterTemplateForm = lazy(() => import('../components/templates/NewsLetterForm'));
const CheckoutCancelled = lazy(() => import('../components/stripe/CheckoutCancelled'));
const CheckoutCustomer = lazy(() => import('../components/stripe/Customer/CreateForm'));
const CheckoutSuccess = lazy(() => import('../components/stripe/CheckoutSuccess'));
const ListingNew = lazy(() => import('../components/listings/AddListing'));
const ListingLocationVerification = lazy(() => import('../pages/verificationpage/LocationVerification'));
const Newsletter = lazy(()=>import('../components/newsletter/Newsletter'));
const NewsletterAdd = lazy(()=>import('../components/newsletter/AddNewsletter')); 
const CalendarApp = lazy(() => import('../pages/apps/newcalendar/CalendarApp'));
const UserDashboard = lazy(() => import('../pages/dashboard/user/UserDashboard.jsx'));
const UserProfile = lazy(() => import('../pages/userprofile/Profile'));
const UserProfileEdit = lazy(() => import('../pages/userprofile/EditProfile'));
const VenueForm = lazy(() => import('../components/venue/VenueForm'));
const Venue = lazy(() => import('../components/venue/Venue'));
const NewsletterSubscribers = lazy(() => import('../pages/newslettersubscriptionspage/NewsletterSubscribers'));

const adminRoutes = [
    {
        path: '/dashboard/admin',
        name: 'Admin',
        element: AdminDashboard,
        roles: ['Admin', 'SysAdmin'],
        exact: true,
        isAnonymous: false,
    },
    {
        path: '/dashboard/admin/viewusers',
        name: 'View Users',
        exact: true,
        element: AdminViewUsers,
        roles: ['Admin', 'SysAdmin'],
        isAnonymous: false,
    },
    {
        path: '/dashboard/admin/analytics',
        name: 'Analytics',
        element: AdminAnalytics,
        roles: ['Admin', 'SysAdmin'],
        exact: true,
        isAnonymous: false,
    },
];

const listingsRoutes = [
    {
        path: '/listing/new',
        name: 'New Listing',
        exact: true,
        element: ListingNew,
        roles: ['User', 'SysAdmin', 'Admin'],
        isAnonymous: false,
    },
    {
        path: '/apps/newcalendar',
        name: 'Calendar',
        element: CalendarApp,
        roles: ['Admin', 'User', 'SysAdmin'],
        exact: true,
        isAnonymous: false,
    },
    {
        path: '/listing/verification',
        name: 'Location Verification',
        exact: true,
        element: ListingLocationVerification,
        roles: ['User', 'SysAdmin', 'Admin'],
        isAnonymous: false,
    },
];

const UserRoutes = [
    {
        path: '/dashboard/',
        name: 'Dashboard',
        element: UserDashboard,
        roles: ['User', 'SysAdmin', 'Admin'],
        exact: true,
        isAnonymous: false,
    },
    {
        path: '/profile/edit',
        name: 'Create Profile',
        exact: true,
        element: UserProfileEdit,
        roles: ['User', 'SysAdmin', 'Admin'],
        isAnonymous: false,
    },
    {
        path: '/profile/:profileId',
        name: 'Profile',
        element: UserProfile,
        roles: ['User', 'SysAdmin', 'Admin'],
        exact: true,
        isAnonymous: false,
    },
];

const checkoutRoutes = [
    {
        path: '/customer',
        name: 'Customer',
        exact: true,
        element: CheckoutCustomer,
        roles: ['User', 'SysAdmin', 'Admin'],
        isAnonymous: false,
    },

    {
        path: '/stripe/checkout/success',
        name: 'Checkout Success',
        exact: true,
        element: CheckoutSuccess,
        roles: ['User', 'SysAdmin', 'Admin'],
        isAnonymous: false,
    },
    {
        path: '/stripe/checkout/cancelled',
        name: 'Checkout Cancelled',
        exact: true,
        element: CheckoutCancelled,
        roles: ['User', 'SysAdmin', 'Admin'],
        isAnonymous: false,
    },
];

const locationVenueRoutes = [
    {
        path: '/venues/new',
        name: 'New Venue',
        exact: true,
        element: VenueForm,
        roles: ['User', 'SysAdmin', 'Admin'],
        isAnonymous: false,
    },
    {
        path: '/venues',
        name: 'Venues',
        exact: true,
        element: Venue,
        roles: ['User', 'SysAdmin', 'Admin'],
        isAnonymous: false,
    },
];

const newsLettersTemplates = [
    {
        path: '/newsletterstemplate',
        name: 'NewsLetterTemplates',
        exact: true,
        element: newsLettersTemplate,
        roles: ['Admin'],
        isAnonymous: false,
    },
    {
        path: '/newsletters/newtemplateform',
        name: 'Newsletter Templates Form',
        element: newsletterTemplateForm,
        roles: [`Admin`],
        isAnonymous: false,
    },
    {
        path: '/newsletterstemplate/:id',
        name: 'Update Template',
        element: newsletterTemplateForm,
        roles: [`Admin`],
        isAnonymous: false,
    },
];

const subscribersRoutes = [
    {
        path: '/newslettersubscribers',
        name: 'Newsletter Subscribers',
        element: NewsletterSubscribers,
        roles: ['Admin', 'SysAdmin'],
        exact: true,
        isAnonymous: false,
    },
]

 const newsletterRoutes = [
    {
        path: '/newsletter',
        name: 'Newsletter',
        element: Newsletter,
        roles: ['Admin', 'User'],
        isAnonymous: false,
    },
    {
        path: '/newsletter/add',
        name: 'Add Newsletter',
        element: NewsletterAdd,
        roles: ['Admin', 'User'],
        isAnonymous: false,
    },
    {
        path: `/newsletter/update/:articleId`,
        name: 'Update Newsletter',
        element: NewsletterAdd,
        roles: ['Admin', 'User'],
        isAnonymous: false,
    },
];

const blogRoutes = [
    {
        path: '/blogAddForm',
        name: 'BlogAddForm',
        exact: true,
        element: BlogAddForm,
        roles: ['User', 'SysAdmin', 'Admin'],
        isAnonymous: true,
    },
    {
        path: '/blogAddForm/:id/update',
        name: 'BlogAddForm',
        exact: true,
        element: BlogAddForm,
        roles: ['User', 'SysAdmin', 'Admin'],
        isAnonymous: true,
    },
];

const allRoutes = [
    ...adminRoutes,
    ...blogRoutes,
    ...listingsRoutes,
    ...UserRoutes,
    ...checkoutRoutes,
    ...locationVenueRoutes,
    ...newsletterRoutes,
    ...newsLettersTemplates,
    ...subscribersRoutes,
];

export default allRoutes;
