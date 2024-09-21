import React from 'react';
import Link from 'next/link';
import Products from '../json/Products.json';

const Footer = () => {
  const ProductsInformation = Products;
  return (
    <footer className="bg-black border-t border-white text-white">
      <div className="max-w-[850px] mx-auto flex justify-between py-14 sm:px-10 px-5">
        <div>
          <h1 className="text-lg font-semibold">Customer Service</h1>
          <div>
            <a href="#" className="block hover:text-gray-400 pt-4">FAQs</a>
            <a href="#" className="block hover:text-gray-400 pt-4">Shipping & Delivery</a>
            <a href="#" className="block hover:text-gray-400 pt-4">Privacy Policy</a>
            <a href="#" className="block hover:text-gray-400 pt-4">Terms of Service</a>
            <a href="#" className="block hover:text-gray-400 pt-4">Return & Refund Policy</a>
            <a href="#" className="block hover:text-gray-400 pt-4">About Us</a>
          </div>
        </div>
        <div>
          <h1 className="text-lg font-semibold">Collections</h1>
          <div>
            <a href="#" className="block hover:text-gray-400 pt-4">All Perfume Products</a>
            <a href="#" className="block hover:text-gray-400 pt-4">Men&apos;s Perfume</a>
            <a href="#" className="block hover:text-gray-400 pt-4">Women&apos;s Perfume</a>
            <a href="#" className="block hover:text-gray-400 pt-4">Eastern Perfume</a>
            <a href="#" className="block hover:text-gray-400 pt-4">Western Perfume</a>
          </div>
        </div>
        <div>
          <h1 className="text-lg font-semibold">Follow Us</h1>
          <a href={`tel:${ProductsInformation.contact_number}`} target="_blank" className="block hover:text-gray-400 pt-4 underline">{ProductsInformation.contact_number}</a>
          <a href={`mailto:${ProductsInformation.contact_gmail}`} target="_blank" className="block hover:text-gray-400 pt-4 underline">Email Us</a>
          <div className="mt-6 pt-2 flex items-center gap-3 border-t border-white">
            <Link href={`https://wa.me/${ProductsInformation.contact_whatsapp_number}`} target="_blank" rel="noopener noreferrer">
              <div className="group hover:bg-white rounded-lg h-10 w-10 cursor-pointer transition ease-in-out duration-300 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-whatsapp w-7 h-7 stroke-white group-hover:stroke-black transition-colors ease-in-out duration-300" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                  <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                </svg>
              </div>
            </Link>

            <Link href={ProductsInformation.contact_instagram} target="_blank" rel="noopener noreferrer">
              <div className="group hover:bg-white rounded-lg h-10 w-10 cursor-pointer transition ease-in-out duration-300 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-instagram w-7 h-7 stroke-white group-hover:stroke-black transition-colors ease-in-out duration-300" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                  <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                  <path d="M16.5 7.5l0 .01" />
                </svg>
              </div>
            </Link>

            <Link href={ProductsInformation.contact_facebook} target="_blank" rel="noopener noreferrer">
              <div className="group hover:bg-white rounded-lg h-10 w-10 cursor-pointer transition ease-in-out duration-300 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-facebook w-7 h-7 stroke-white group-hover:stroke-black transition-colors ease-in-out duration-300" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                </svg>
              </div>
            </Link>

          </div>
        </div>
      </div>
      <div className="text-center text-sm border-t py-10 sm:px-10 px-5">
        <p>&copy; {new Date().getFullYear()} {ProductsInformation.brand_name}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
