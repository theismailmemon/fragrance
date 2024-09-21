"use client";
import { arvoClassName } from '../../../src/app/layout';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CartLists from '../components/CartLists'; // Adjust the path as needed
import { auth } from '../../../firebaseConfig'; // Adjust the path based on your project structure
import { signOut } from 'firebase/auth';
import EclipseProfileLogo from '../../../public/eclipseProfileLogo.jpeg';

const Header = () => {
  const [cartListOpen, setCartListOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(null);
  const router = useRouter();



  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLogin(!!token);
  }, [router]);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <>
      {/* Desktop Header */}
      <div className="flex py-2 justify-between shadow-black fixed top-0 left-0 right-0 z-[100] items-center bg-black px-3 sm:h-24 h-20">
        <div className="hidden sm:block"></div>
       
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => router.push('/')}>
          <img src="/eclipseProfileLogo.jpeg" alt="Eclipse Profile Logo" className="h-12 w-12" />
          <h2 className="sm:text-3xl text-xl font-bold text-white tracking-wide ">Eclipse Fragrance</h2>
        </div>
        <div className='flex items-center gap-6'>
          {isLogin ? (
            <button className="flex cursor-pointer hover:opacity-70 transition ease-in-out duration-500 text-white text-lg gap-2 items-center" onClick={handleLogout}>
              <span>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout-2 transition ease-in-out duration-150 hover:opacity-70" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                    <path d="M15 12h-12l3 -3" />
                    <path d="M6 15l-3 -3" />
                  </svg>
                </span>
              </span>
              <span>Logout</span>
            </button>
          ) : (
            <button className="flex cursor-pointer hover:opacity-70 transition ease-in-out duration-500 text-white text-lg gap-2 items-center" onClick={() => router.push('/login')}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </span>
              <span>ACCOUNT</span>
            </button>
          )}
          <button className="flex cursor-pointer hover:opacity-70 transition ease-in-out duration-500 text-white text-lg gap-2 items-center" onClick={() => setCartListOpen(true)}>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </span>
            <span>CART</span>
          </button>
        </div>
      </div>

      {/* CartLists Component */}
      {cartListOpen && (
        <CartLists onClose={() => setCartListOpen(false)} />
      )}
    </>
  );
};

export default Header;
