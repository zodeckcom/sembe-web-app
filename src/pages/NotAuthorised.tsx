import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';


const NotAuthorised = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Not Authorised'));
    });

    return (
        <div>
            

            <div className="pt-5">
                YOu are not authorised to view this page!!!
            </div>
        </div>
    );
};

export default NotAuthorised;
