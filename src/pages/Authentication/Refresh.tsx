import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Refresh = () => {

    useEffect(() => {
        //window.location.reload();
        window.location.href = '/';
    }, []);
    return (
        <div>
            Loading ...
        </div>
    );
};

export default Refresh;
