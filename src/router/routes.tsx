import { lazy } from 'react';
import Blank from '../pages/Blank';
import DashboardCustomer from '../pages/Dashboard/DashboardCustomer';
import WalletHomeCustomer from '../pages/Wallet/WalletHomeCustomer';
import WalletHomeProvider from '../pages/Wallet/WalletHomeProvider';
import CustomerOrders from '../pages/Orders/CustomerOrders';
import ProviderOrders from '../pages/Orders/ProviderOrders';
import DashboardProvider from '../pages/Dashboard/DashboardProvider';
import ProviderRatings from '../pages/ProviderRatings';
import { Navigate } from 'react-router-dom';
import NotAuthorised from '../pages/NotAuthorised';
import Logout from '../pages/Authentication/Logout';
import Refresh from '../pages/Authentication/Refresh';
const LoginCover = lazy(() => import('../pages/Authentication/LoginCover'));
const RegisterCover = lazy(() => import('../pages/Authentication/RegisterCover'));
const RecoverIdCover = lazy(() => import('../pages/Authentication/RecoverIdCover'));
const Error = lazy(() => import('../components/Error'));



const ACCOUNT_TYPE = {
    PUBLIC: "PUBLIC",
    CUSTOMER: "CUSTOMER",
    SERVICE_PROVIDER: "SERVICE-PROVIDER"
};

const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
const userAccountType = localStorage.getItem('userAccountType');

const ProtectedDashboard = () => {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    if (userAccountType === ACCOUNT_TYPE.CUSTOMER) {
        return <DashboardCustomer />;
    } else {
        return <DashboardProvider />;
    }
};

const ProtectedOrders = () => {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    if (userAccountType === ACCOUNT_TYPE.CUSTOMER) {
        return <CustomerOrders />;
    } else {
        return <ProviderOrders />;
    }
};

const ProtectedWallet = () => {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    if (userAccountType === ACCOUNT_TYPE.CUSTOMER) {
        return <WalletHomeCustomer />;
    } else {
        return <WalletHomeProvider />;
    }
};
const ProtectedRating = () => {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    if (userAccountType === ACCOUNT_TYPE.SERVICE_PROVIDER) {
        return <ProviderRatings />;
    } else {
        return <NotAuthorised />
    }
};
const CheckLogout = () => {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return <Logout />
};
const routes = [
    {
        path: '/',
        element: <ProtectedDashboard />,
    },
    {
        path: '/wallet',
        element: <ProtectedWallet />,

    },
    {
        path: '/orders',
        element: <ProtectedOrders />

    },
    {
        path: '/ratings',
        element: <ProtectedRating />

    },
    {
        path: '/login',
        element: <LoginCover />,
        layout: 'blank',
    },
    {
        path: '/logout',
        element: <CheckLogout />,
    },
    {
        path: '/refresh',
        element: <Refresh />
    },
    {
        path: '/register',
        element: <RegisterCover />,
        layout: 'blank',
    },
    {
        path: '/forgot',
        element: <RecoverIdCover />,
        layout: 'blank',
    },
    {
        path: '/blank',
        element: <Blank />
    },
    {
        path: '*',
        element: <Blank />,
    },
];

export { routes };
