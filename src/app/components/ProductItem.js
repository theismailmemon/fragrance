"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';

const SaleItem = ({ item }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isUserMode, setIsUserMode] = useState(false);

  useEffect(() => {
    const checkingUserMode = localStorage.getItem('IsUserMode');
    if (checkingUserMode) {
      setIsUserMode(false);
    }
  }, [])

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleAdd = (event) => {
    event.stopPropagation();
    const cartList = JSON.parse(localStorage.getItem('cartListInformation')) || [];
    cartList.push(item);
    localStorage.setItem('cartListInformation', JSON.stringify(cartList));
    toast.success('Item added to Cart!', { autoClose: 2000 })
  };

  const handleEdit = () => {

  };

  const handleDelete = () => {

  };

  const handleItemClick = () => {
    router.push(`/products/${item.id}`);
  };

  return (
    <div
      className='mt-7 cursor-pointer w-full'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ToastContainer />
      <div onClick={handleItemClick}
        className='bg-black h-96 rounded-t-xl transition-all duration-1000 ease-in-out relative'
        style={{
          backgroundImage: `url('${isHovered ? item.hoverImageUrl : item.imageUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='absolute -top-4 -right-4 space-y-1'>
          <button
            onClick={handleAdd}
            className={`bg-black rounded-full h-9 w-9 flex items-center justify-center text-white transform transition-transform duration-300 ease-in-out hover:scale-110 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-plus"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 5l0 14" />
              <path d="M5 12l14 0" />
            </svg>
          </button>
          {isUserMode === false &&

            <div className='space-y-1'>
              <button
                onClick={handleEdit}
                className={`bg-black rounded-full h-9 w-9 flex items-center justify-center text-white transform transition-transform duration-300 ease-in-out hover:scale-110 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                  }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
              </button>
              <button
                onClick={handleDelete}
                className={`bg-black rounded-full h-9 w-9 flex items-center justify-center text-white transform transition-transform duration-300 ease-in-out hover:scale-110 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                  }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
              </button>

            </div>
          }
        </div>

        <button className='bg-black px-3 py-1 absolute bottom-0 left-0 text-white text-xs font-normal'>
          SALE
        </button>
      </div>
      <div className='bg-gray-100 rounded-b-xl py-4 px-4'>
        <h2 className='text-lg'>{item.name}</h2>
        <p className='text-gray-700'>{item.description}</p>
        <button className='text-red-600 mt-3 font-semibold'>
          <span className='pr-2 text-base'>from</span>
          <span className='pr-2 text-lg'>{item.price}</span>
          <strike className='text-[17px]'>{item.originalPrice}</strike>
        </button>
      </div>
    </div>
  );
};

export default SaleItem;
