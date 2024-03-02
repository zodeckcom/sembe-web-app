import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import IconMail from '../../components/Icon/IconMail';
import ThemeToggler from '../../components/Layouts/ThemeToggler';
import { getBaseURL, post } from '../../utils/apiHelpers';

const RecoverIdCover = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
    });
    useEffect(() => {
        dispatch(setPageTitle('Recover'));
    });
    const navigate = useNavigate();
    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const submitForm = async () => {
       
        try {
            const baseURL = getBaseURL("onrender");
            const response = await post(`${baseURL}/auth/users/`, formData);
            console.log('Form submitted successfully:', response);
            setFormData({
                email: '',
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    
};
    const submitForm2 = () => {
        navigate('/');
    };

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>
            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <div className="fixed top-4 right-4 z-50">
                    <ThemeToggler />
                </div>
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
                    <div className="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgb(27,117,171,1)_0%,rgba(8,38,64,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                        <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
                        <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
                            <Link to="/" className="w-48 block lg:w-72 ms-10">
                                <img src="/assets/images/auth/logo.png" alt="Logo" className="w-full" />
                            </Link>
                            <div className="mt-2 hidden w-full max-w-[530px] lg:block">
                                <img src="/assets/mine/pix1.webp" alt="" className="w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                        <div className="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
                            <Link to="/" className="w-8 block lg:hidden">
                                <img src="/assets/images/logo.svg" alt="Logo" className="mx-auto w-10" />
                            </Link>
                        </div>
                        <div className="w-full max-w-[440px] lg:mt-16">
                            <div className="mb-7">
                                <h1 className="mb-3 text-2xl font-bold !leading-snug dark:text-white">Password Reset</h1>
                                <p>Enter your email to recover your ID</p>
                            </div>
                            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); submitForm(); }}>
                                <div>
                                    <label htmlFor="Email">Email</label>
                                    <div className="relative text-white-dark">
                                            <input required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                id="email" name="email" type="email" placeholder="Enter Email" className="form-input ps-10 placeholder:text-white-dark" />
                                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                <IconMail fill={true} />
                                            </span>
                                        </div>
                                </div>
                                <button type="submit" className="btn bg-green-400 !mt-6 w-full border-0 uppercase">
                                    RECOVER
                                </button>
                                <div className="mb-5 flex justify-between">
                                    <div>
                                        
                                    </div>
                                    <Link
                                        to="/login"
                                        className="text-sky-800 dark:text-sky-100 flex justify-right items-right h-full mx-2"
                                    >
                                        Login to Your Account
                                    </Link>
                                </div>
                            </form>
                        </div>
                        <p className="absolute bottom-6 w-full text-center dark:text-white">© {new Date().getFullYear()}. SEMBE All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecoverIdCover;