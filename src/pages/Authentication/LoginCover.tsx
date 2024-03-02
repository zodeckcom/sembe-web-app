import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconFacebookCircle from '../../components/Icon/IconFacebookCircle';
import IconGoogle from '../../components/Icon/IconGoogle';
import ThemeToggler from '../../components/Layouts/ThemeToggler';
import { getBaseURL, post } from '../../utils/apiHelpers';

const LoginCover = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    useEffect(() => {
        dispatch(setPageTitle('Login'));
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
            const baseURL = getBaseURL("railway");
            const response = await post(`${baseURL}/auth/jwt/create/`, formData);
            console.log(response);
            if (response.status) {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userAccountType', response.data.user.account_type);
                localStorage.setItem('userToken', response.data.access);
            }
            setFormData({
                email: '',
                password: ''
            });          
            navigate('/refresh');
        } catch (error) {
            console.error('Error logging in:', error);
        }
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
                            <Link to="/" className="w-36 block lg:hidden">
                                <img src="/assets/images/logo.png" alt="SEMBE" className="mx-auto w-36" />
                            </Link>
                        </div>
                        <div className="w-full max-w-[440px] lg:mt-16">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-sky-800 md:text-4xl">Sign in</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={(e) => { e.preventDefault(); submitForm(); }}>
                                <div>
                                    <label htmlFor="email">Email</label>
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
                                <div className='w-full'>
                                    <label htmlFor="password">Password</label>
                                    <div className="relative text-white-dark">
                                        <input required
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            id="password" name='password'
                                            type="password" placeholder="Enter Password"
                                            className="form-input ps-10 placeholder:text-white-dark" />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div className="mb-5 flex justify-between">
                                    <div>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="form-checkbox" />
                                            <span className="text-white-dark">Remember Me</span>
                                        </label>
                                    </div>
                                    <Link
                                        to="/forgot"
                                        className="text-sky-800 dark:text-sky-100 flex justify-right items-right h-full mx-2"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                                <button type="submit" className="btn bg-green-400 !mt-6 w-full border-0 uppercase">
                                    Sign in
                                </button>
                            </form>

                            <div className="relative my-7 text-center md:mb-9">
                                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                                <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span>
                            </div>
                            <div className="mb-10 md:mb-[60px]">
                                <ul className="md:flex justify-center gap-3.5 text-white">
                                    <li className='flex border dark:border-sky-800 rounded-r-md rounded-l-full shadow-lg hover:shadow-none group hover:cursor-pointer'>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition group-hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(27,117,171, 1) 0%, rgba(8,38,64, 1) 100%)' }}
                                        >
                                            <IconFacebookCircle />
                                        </Link>
                                        <div className='text-sky-800 dark:text-sky-100 flex justify-center items-center h-full mx-2'>Continue with Facebook</div>
                                    </li>
                                    <li className='flex border dark:border-sky-800 rounded-r-md rounded-l-full shadow-lg hover:shadow-none group hover:cursor-pointer'>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition group-hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(27,117,171, 1) 0%, rgba(8,38,64, 1) 100%)' }}
                                        >
                                            <IconGoogle />
                                        </Link>
                                        <div className='text-sky-800 dark:text-sky-100 flex justify-center items-center h-full mx-2'>Continue with Google</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="text-center dark:text-white">
                                Don't have an account ?&nbsp;
                                <Link to="/register" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    SIGN UP
                                </Link>
                            </div>
                        </div>
                        <p className="absolute bottom-6 w-full text-center dark:text-white">© {new Date().getFullYear()}. SEMBE All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginCover;
