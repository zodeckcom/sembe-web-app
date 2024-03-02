import { useState, useEffect } from 'react';

interface AuthState {
    isAuthenticated: boolean;
    userAccountType: string | null;
    userToken: string | null;
}

const useAuth = (): AuthState => {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        userAccountType: null,
        userToken: null
    });

    const updateAuthState = (newAuthState: Partial<AuthState>) => {
        setAuthState(prevState => ({
            ...prevState,
            ...newAuthState
        }));
    };

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        const userAccountType = localStorage.getItem('userAccountType');
        const userToken = localStorage.getItem('userToken');
        if (userToken !== "") {
            console.log("userToken==========");
            const userData = {
                isAuthenticated: isAuthenticated === 'true',
                userAccountType: userAccountType,
                userToken: userToken
            };
            updateAuthState(userData);

        }
        console.log(authState);
    }, []);

    // You can also include functions for login, logout, etc. here

    return authState;
};

export default useAuth;
