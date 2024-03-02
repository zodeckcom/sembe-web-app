import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Logout = () => {

    useEffect(() => {
        localStorage.setItem('isAuthenticated', 'false');
        localStorage.setItem('userAccountType', "");
        localStorage.setItem('userToken', "");
        window.location.reload();
    }, []);
    return (
        <div>
            Logging out ...
        </div>
    );
};

export default Logout;