"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthImage from '../../../public/1.png';

const ForgotPasswordPage = () => {
  const [isResetPasswordSent, setIsResetPasswordSent] = useState(false);
  const [email, setEmail] = useState('');
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (email.trim() === '') {
      toast.error('Please enter your email!', { autoClose: 2000 });
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Invalid email format!', { autoClose: 2000 });
      return;
    }

    setLoadingAnimation(true);

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setIsResetPasswordSent(true)
      toast.success('Password reset email sent!',{ autoClose: 2000 });
    
    } catch (err) {
      toast.error('Error sending password reset email: ' + err.message, { autoClose: 2000 });
    } finally {
      setLoadingAnimation(false);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const buttonClass = email.length === 0
    ? 'bg-[#dedede] text-gray-600 cursor-default'
    : 'bg-black text-white hover:opacity-90 transition ease-in-out duration-300';

  return (
    <form onSubmit={handleForgotPassword}>
      <ToastContainer />
      <div className="bg-[#F7F7F7] h-screen w-full flex overflow-y-auto">
        <div className="lg:w-[39%] w-full bg-white overflow-y-auto h-screen lg:rounded-r-[28px] px-6 flex justify-center items-center">
          <div className="sm:w-[360px] w-full py-8">
            <div className="flex items-center gap-4">
              <span></span>
              <span className="bg-gray-300 w-[1.80px] h-[26px]"></span>
              <span className="text-[19px] font-medium text-gray-500">Forgot Password</span>
            </div>
            <div className="mt-4">
              <div className="pt-5">
                <h6 className="text-black font-medium">Email</h6>
                <div>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="focus:outline-none focus:border focus:border-gray-300 bg-[#F7F7F7] rounded-xl px-5 h-[48px] text-[15px] w-full mt-2"
                    placeholder="Email"
                  />
                </div>
              </div>
            
              <div>
                <button
                  className={`${buttonClass} ${loadingAnimation ? 'cursor-default opacity-60 pointer-events-none' : ''} mt-8 w-full rounded-full flex justify-center items-center text-sm h-[38px] shadow`}
                  type="submit"
                >
                  {loadingAnimation ? (
                    <div className="flex flex-row space-x-4">
                      <div className="w-5 h-5 rounded-full animate-spin border border-solid border-white border-t-transparent"></div>
                    </div>
                  ) : (
                    'Forgot Password'
                  )}
                </button>
              </div>
            </div>
            {isResetPasswordSent && (
                                <div
                                    id="alert-3"
                                    className="mt-6 flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 "
                                    role="alert"
                                >
                                    <svg
                                        className="flex-shrink-0 w-4 h-4"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <div className="ms-3 text-sm font-medium">
                                        A password reset email has been sent to your email
                                        address. Please check your{" "}
                                        <a
                                            href="https://mail.google.com/mail/u/0/#inbox"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-semibold underline hover:no-underline"
                                        >
                                            Gmail
                                        </a>
                                        .
                                    </div>
                                    <button
                                        onClick={() => setIsResetPasswordSent(false)}
                                        type="button"
                                        className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8"
                                        aria-label="Close"
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg
                                            className="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            )}
            <div className="text-gray-600 text-sm flex gap-1 mt-4 justify-center">
              Back to Login?
              <span className="font-medium hover:opacity-80 transition ease-in-out duration-300 cursor-pointer" onClick={() => router.push('/login')}>
                Sign In
              </span>
            </div>
          </div>
        </div>
        <div className="lg:block hidden w-[61%] bg-gradient-to-r from-black via-gray-700 to-black rounded-l-[28px]">
          <div className="w-full h-full flex justify-center items-center">
            <img className="w-[70%]" src={AuthImage.src} alt="Exportable" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ForgotPasswordPage;
