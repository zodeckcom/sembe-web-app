import { SetStateAction, useEffect, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import IconUser from '../../components/Icon/IconUser';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconFacebookCircle from '../../components/Icon/IconFacebookCircle';
import IconGoogle from '../../components/Icon/IconGoogle';
import IconPhone from '../../components/Icon/IconPhone';
import { getBaseURL, post } from '../../utils/apiHelpers';
import ThemeToggler from '../../components/Layouts/ThemeToggler';
import IconLayoutGrid from '../../components/Icon/IconLayoutGrid';

const RegisterCover = () => {
    const [otp, setOtp] = useState(false);
    const [otpemail, setOtpEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState<string[]>([]);
    const [errorMsgOtp, setErrorMsgOtp] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [modal2, setModal2] = useState(false);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
        account_type: ''
    });
    const [formDataOtp, setFormDataOTp] = useState({
        otp: ''
    });

    const handleError = (errors: string[]) => {
        setErrorMsg(errors.map(error => toSentenceCase(error)));
    };

    useEffect(() => {
        dispatch(setPageTitle('Register'));
    });
    const navigate = useNavigate();

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleInputOTpChange = (e: { target: { name: any; value: any; }; }) => {
        setFormDataOTp({
            ...formDataOtp,
            [e.target.name]: e.target.value,
        });
    };
    const handleConfirmPasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setConfirmPassword(e.target.value);
    };
    const toSentenceCase = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(); // Capitalize first character and convert rest to lowercase
    };
    const submitForm = async () => {
        setPasswordsMatch(true);

        if (formData.password === confirmPassword) {
            try {
                const baseURL = getBaseURL("railway");
                const response = await post(`${baseURL}/auth/users/`, formData);
                if (response?.status) {
                    console.log('Form submitted successfully:', response);
                    setOtpEmail(formData.email);
                    setFormData({
                        first_name: '',
                        last_name: '',
                        email: '',
                        phone_number: '',
                        password: '',
                        account_type: ''
                    });
                    setOtp(true);
                    dispatch(setPageTitle('OTP Verification'));
                }
            } catch (error: any) {
                console.error('Error submitting form:', error);
                if (!error.status) {
                    handleError(error.error);
                }
            }
        } else {
            setPasswordsMatch(false);
        }

    };
    const submitFormOtp = async () => {
        try {
            const baseURL = getBaseURL("railway");
            const response = await post(`${baseURL}/users/verify-otp/`, formDataOtp);
            setFormDataOTp({
                otp: ''
            });
            setModal2(true);
        } catch (error: any) {
            console.error('Error submitting form:', error);
            if (!error.status) {
                setErrorMsgOtp(error.error);
            }
        }
    };
    function maskEmailUsername(email: string) {
        // Split the email into username and domain parts
        var parts = email.split('@');
        var username = parts[0];
        var domain = parts[1];

        // Calculate the length of the middle part to be masked
        var middlePartLength = Math.floor(username.length / 2);

        // Mask the middle part of the username
        var maskedUsername = username.substring(0, Math.ceil(middlePartLength / 2)) +
            '*'.repeat(middlePartLength) +
            username.substring(Math.ceil(username.length - middlePartLength / 2));

        // Concatenate the masked username with the domain and return
        return maskedUsername + '@' + domain;
    }
    const ContinueToLogin = () => {
        navigate('/login');
    };

    return (
        <div>
            <Transition appear show={modal2} as={Fragment}>
                <Dialog as="div" open={modal2} onClose={() => setModal2(true)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">

                                    <div className="p-4 md:p-5 flex flex-col items-center justify-center text-center">
                                        <img src='/assets/images/mine/success.webp' className='w-12 h-12' />
                                        <h3 className="text-xl font-normal text-green-500 dark:text-green-400">Congratulations!</h3>
                                        <h3 className="mb-5 text-md font-normal text-gray-500 dark:text-gray-400">Your registration was successful.</h3>
                                        <button onClick={ContinueToLogin} type="button" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5">
                                            Continue
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
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
                        {!otp ?
                            <div className="w-full max-w-[440px] md:max-w-[540px] lg:mt-16">
                                <div className="mb-10">
                                    <h1 className="text-3xl font-extrabold uppercase !leading-snug text-sky-800 md:text-4xl">Sign Up</h1>
                                    {errorMsg.length === 0 &&
                                        <div>
                                            {!passwordsMatch ? <p className="text-base font-bold leading-normal text-orange-400">Passwords do not match!</p>
                                                : <p className="text-base font-bold leading-normal text-white-dark">Enter your details to register</p>}
                                        </div>
                                    }
                                    <div>
                                        {errorMsg.length > 0 && (
                                            <div className=' text-orange-400'>
                                                <p className="text-base font-bold leading-normal">The following errors occured:</p>
                                                <ul>
                                                    {errorMsg.map((error, index) => (
                                                        <li key={index}>{error}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <form className="space-y-5 dark:text-white" onSubmit={(e) => { e.preventDefault(); submitForm(); }}>
                                    <div className='md:flex md:gap-3'>
                                        <div className='w-full'>
                                            <label htmlFor="first_name">First Name</label>
                                            <div className="relative text-white-dark">
                                                <input required id="first_name"
                                                    value={formData.first_name}
                                                    onChange={handleInputChange}
                                                    name='first_name' type="text" placeholder="First Name" className="form-input ps-10 placeholder:text-white-dark" />
                                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                    <IconUser fill={true} />
                                                </span>
                                            </div>
                                        </div>
                                        <div className='w-full'>
                                            <label htmlFor="last_name">Last Name</label>
                                            <div className="relative text-white-dark">
                                                <input required
                                                    value={formData.last_name}
                                                    onChange={handleInputChange}
                                                    id="last_name" name='last_name' type="text" placeholder="Last Name" className="form-input ps-10 placeholder:text-white-dark" />
                                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                    <IconUser fill={true} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='md:flex md:gap-3'>
                                        <div className='w-full'>
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
                                            <label htmlFor="phone_number">Phone Number</label>
                                            <div className="relative text-white-dark">
                                                <input required
                                                    value={formData.phone_number}
                                                    onChange={handleInputChange}
                                                    id="phone_number" name="phone_number" type="text" placeholder="Enter Phone" className="form-input ps-10 placeholder:text-white-dark" />
                                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                    <IconPhone fill={true} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='md:flex md:gap-3'>
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
                                        <div className='w-full'>
                                            <label htmlFor="confirmPassword">Confirm Password</label>
                                            <div className="relative text-white-dark">
                                                <input required id="confirmPassword"
                                                    value={confirmPassword}
                                                    onChange={handleConfirmPasswordChange}
                                                    type="password"
                                                    placeholder="Confirm Password"
                                                    className={`form-input ps-10 placeholder:text-white-dark`} />
                                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                    <IconLockDots fill={true} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='md:flex md:gap-3'>
                                        <div className='w-full'>
                                            <label htmlFor="account_type">Type of Service</label>
                                            <div className='relative text-white-dark w-full '>
                                                <select id='account_type' name='account_type'
                                                    value={formData.account_type}
                                                    onChange={handleInputChange} required
                                                    className="form-select form-select-md w-full text-white-dark">
                                                    <option value="">Select Service Type</option>
                                                    <option value="CUSTOMER">Customer</option>
                                                    <option value="SERVICE-PROVIDER">Service Provider</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='w-full mt-7'>
                                            <button type="submit" className="w-full btn self-end text-sky-800 font-semibold bg-green-400 border-0 uppercase">
                                                Sign Up
                                            </button>
                                            
                                        </div>
                                    </div>
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
                                    Already have an account ?&nbsp;
                                    <Link to="/login" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                        SIGN IN
                                    </Link>
                                </div>
                            </div>
                            : <div className="w-full max-w-[440px] lg:mt-16">
                                <div className="mb-7">
                                    <h1 className="mb-3 text-2xl font-bold !leading-snug dark:text-white">Email OTP Verification</h1>
                                    <p>We have sent a code to your email address <span className='font-bold'>{maskEmailUsername(otpemail)}</span></p>
                                    <p>Please enter the code bellow.</p>
                                    <div className='text-orange-400 mt-3 font-bold'>{errorMsgOtp}</div>
                                </div>
                                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); submitFormOtp(); }}>
                                    <div>
                                        <label htmlFor="Email">OTP</label>
                                        <div className="relative text-white-dark">
                                            <input required
                                                value={formDataOtp.otp}
                                                onChange={handleInputOTpChange}
                                                id="otp" name="otp" type="number" placeholder="Enter OTP" className="form-input ps-10 placeholder:text-white-dark" />
                                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                <IconLayoutGrid fill={true} />
                                            </span>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn bg-green-400 !mt-6 w-full border-0 uppercase">
                                        Verify OTP
                                    </button>
                                    <div className="mb-5 flex justify-between">
                                        <div>

                                        </div>
                                        <button type="button" className='text-sky-800 dark:text-sky-100 flex justify-right items-right h-full mx-2'>
                                            Resend OTP
                                        </button>

                                    </div>
                                </form>
                            </div>
                        }
                        <p className="absolute bottom-6 w-full text-center dark:text-white">© {new Date().getFullYear()}. SEMBE All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterCover;
