"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { signInWithPopup, createUserWithEmailAndPassword, getAuth, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../../../firebaseConfig";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthImage from '../../../public/1.png';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Invalid email format!', { autoClose: 2000 });
      return;
    }

    if (password.trim().length < 8) {
      toast.error('Password must be at least 8 characters long!', { autoClose: 2000 });
      return;
    }

    setLoadingAnimation(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('token', token);
      router.push('/');
    } catch (err) {
      toast.error(err.message, { autoClose: 2000 });
    } finally {
      setLoadingAnimation(false);
    }
  };

  const handleWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        const token = await user.getIdToken();
        localStorage.setItem('token', token);
        router.push('/');
      }
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  const passwordFieldType = isPasswordVisible ? 'text' : 'password';
  const buttonClass = email.length === 0 || password.length === 0
    ? 'bg-[#dedede] text-gray-600 cursor-default'
    : 'bg-black text-white hover:opacity-90 transition ease-in-out duration-300';

  return (
    <form onSubmit={handleRegister}>
      <div className="bg-[#F7F7F7] h-screen w-full flex overflow-y-auto">
        <div className="lg:w-[39%] w-full bg-white overflow-y-auto h-screen lg:rounded-r-[28px] px-6 flex justify-center items-center">
          <div className="sm:w-[360px] w-full py-8">
            <div className="flex items-center gap-4">
              <span></span>
              <span className="bg-gray-300 w-[1.80px] h-[26px]"></span>
              <span className="text-[19px] font-medium text-gray-500">Register</span>
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
              <div className="pt-5">
                <h6 className="text-black font-medium">Password</h6>
                <div className="relative">
                  <input
                    type={passwordFieldType}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="focus:outline-none focus:border focus:border-gray-300 bg-[#F7F7F7] rounded-xl px-5 h-[48px] text-[15px] w-full mt-2 pr-12"
                    placeholder="Password"
                  />
                  <span
                    className="absolute top-[21.4px] right-4 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye-off" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#6b7280" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                        <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                        <path d="M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#6b7280" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                        <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                      </svg>
                    )}
                  </span>
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
                    'Sign Up'
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center w-full gap-2 mt-6">
              <span className="bg-gray-300 h-[1px] w-full"></span>
              <span className="text-gray-500 font-medium text-sm">Or</span>
              <span className="bg-gray-300 h-[1px] w-full"></span>
            </div>
            <div className="mt-6">
              <button
                onClick={handleWithGoogle}
                className="w-full rounded-full flex justify-center items-center gap-2 hover:bg-gray-100 transition ease-in-out duration-150 text-sm h-[41px] border-gray-300 border"
                style={{ border: '1px solid #d1d5db' }}
              >
                <span>
                  <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.5916 10.2078C20.5916 9.56661 20.5374 8.95328 20.4366 8.36661H10.5916V12.0333H16.2324C15.9491 13.2333 15.2666 14.2666 14.2666 14.9333V17.2666H17.3166C19.1499 15.5666 20.5916 13.1333 20.5916 10.2078Z" fill="#4285F4" />
                    <path d="M10.5916 19.1667C13.0416 19.1667 15.0916 18.3083 16.5999 16.975L14.2666 14.9417C13.4324 15.5417 12.3416 15.9083 10.5916 15.9083C8.26659 15.9083 6.26659 14.375 5.52492 12.2333H2.36659V14.6333C3.87492 17.4417 6.99992 19.1667 10.5916 19.1667Z" fill="#34A853" />
                    <path d="M5.52492 12.2333C5.24992 11.6333 5.09159 10.975 5.09159 10.3C5.09159 9.625 5.24992 8.96667 5.52492 8.36667V5.96667H2.36659C1.67492 7.36667 1.29159 8.90833 1.29159 10.3C1.29159 11.6917 1.67492 13.2333 2.36659 14.6333L5.52492 12.2333Z" fill="#FBBC05" />
                    <path d="M10.5916 4.69167C12.3916 4.69167 13.7666 5.35834 14.6249 6.15834L17.3749 3.44167C15.0916 1.38334 12.0416 0.708336 9.09159 1.60834C6.49992 2.41667 4.36659 4.60834 3.52492 7.375L6.68325 9.775C7.42492 7.63334 8.26659 6.19167 10.5916 4.69167Z" fill="#EA4335" />
                  </svg>
                </span>
                Log in with Google
              </button>
            </div>
            <div className="text-gray-600 text-sm flex gap-1 mt-4 justify-center">
            Already have an account?
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

export default RegisterPage;
