"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast, ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

const InformationModal = () => {
  const router = useRouter();
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem('cartListInformation');
    if (savedData) {
      try {
        setCartList(JSON.parse(savedData));
      } catch (error) {
        console.error("Error parsing JSON:", error);
        setCartList([]);
      }
    }
  }, []);

  const [formData, setFormData] = useState({
    title: 'Mr',
    fullName: '',
    mobileNumber: '',
    alternateNumber: '',
    deliveryAddress: '',
    nearestLandmark: '',
    emailAddress: '',
    deliveryInstructions: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePlaceOrder = () => {
    const { title, fullName, mobileNumber, deliveryAddress, emailAddress } = formData;
  
    if (title && fullName && mobileNumber && deliveryAddress && validateEmail(emailAddress)) {
      // Calculate total price
      const calculateItemPrice = (item) => {
        const price = parseFloat(item.price.replace('Rs.', '').replace(',', ''));
        return price * item.quantity;
      };
  
      const totalPrice = cartList.reduce((total, item) => total + calculateItemPrice(item), 0);
      const discount = totalPrice * 0.10;
      const grandTotalPrice = totalPrice - discount;
  
      // Create item details
      const itemsDetails = cartList.map(item => `
        *Item:* ${item.name}\n
        *Quantity:* ${item.quantity}\n
      `).join('\n');
  
      // Create the message
      const message = `
        *Order Details*\n
        *Name:* ${fullName}\n
        *Mobile Number:* ${mobileNumber}\n
        *Alternate Number:* ${formData.alternateNumber}\n
        *Delivery Address:* ${deliveryAddress}\n
        *Nearest Landmark:* ${formData.nearestLandmark}\n
        *Email Address:* ${emailAddress}\n
        *Delivery Instructions:* ${formData.deliveryInstructions}\n
        *Grand Total Price:* Rs. ${grandTotalPrice}\n
      `;
  
      // Encode the message for URL
      const encodedMessage = encodeURIComponent(message);
      const whatsappNumber = "+923141289234"; // Replace with your WhatsApp number
  
      // Open WhatsApp with the pre-filled message
      window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  
      // Clear form or perform additional actions
      setFormData({
        title: '',
        fullName: '',
        mobileNumber: '',
        alternateNumber: '',
        deliveryAddress: '',
        nearestLandmark: '',
        emailAddress: '',
        deliveryInstructions: '',
      });
    } else {
      // Display error toast
      if (!validateEmail(emailAddress)) {
        toast.error('Please enter a valid email address.', { autoClose: 2000 });
      } else {
        toast.error('Please fill in all required fields.', { autoClose: 2000 });
      }
    }
  };
  

  const calculateItemPrice = (item) => {
    const price = parseFloat(item.price.replace('Rs.', '').replace(',', ''));
    return price * item.quantity;
  };

  const totalPrice = cartList.reduce((total, item) => total + calculateItemPrice(item), 0);
  const discount = totalPrice * 0.10;
  const grandTotalPrice = totalPrice - discount;

  return (
    <div className="">
         <ToastContainer />
      <div className="">
        <div className="mx-auto h-full flex flex-col bg-white overflow-y-auto">
          <div className="flex-1 relative">
            <div className="flex w-full h-full">
              <div className="mx-auto">
                <div className="sm:w-[1250px] w-[360px] py-10">
                  <div>
                    <Link href="/">
                      <h2 className="sm:text-3xl text-xl font-bold text-center text-black tracking-wide">Eclipse Fragrance {formData.title}</h2>
                    </Link>
                    <div className="sm:flex mt-14 sm:gap-4">

                      <div className="sm:w-7/12 bg-gray-50 rounded-2xl sm:p-10 p-5">
                        <h1 className="text-black text-sm sm:text-base">
                          <span>This is a </span>
                          <span className="font-bold">DELIVERY ORDER</span>
                        </h1>
                        <h1 className="text-black text-sm sm:text-base">
                          Just a last step, please enter your details:
                        </h1>
                        <div>
                          <div className="sm:flex pt-5 gap-4">
                            <div>
                              <label htmlFor="title" className="block text-black text-[15px] font-normal sm:text-base">Title</label>
                              <select
                                name="title"
                                id="title"
                                onChange={handleInputChange}
                                value={formData.title}
                                className="mt-1 sm:h-[52px] h-[48px] rounded-md px-1 focus:outline-none focus-within:bg-gray-50 shadow w-full sm:w-16"
                              >
                                <option value="Mr">Mr</option>
                                <option value="Miss">Miss</option>
                                <option value="Mrs">Mrs</option>
                              </select>
                            </div>
                            <div className="w-full sm:pt-0 pt-3">
                              <label htmlFor="fullName" className="block text-black text-[15px] font-normal sm:text-base">Full Name</label>
                              <input
                                onChange={handleInputChange}
                                value={formData.fullName}
                                name="fullName"
                                type="text"
                                placeholder="Enter Your Full Name"
                                className="text-gray-500 text-base placeholder:text-gray-500 mt-1 sm:h-[52px] h-[48px] rounded-md px-3 focus:outline-none focus-within:bg-gray-50 shadow w-full"
                              />
                            </div>
                          </div>
                          <div className="sm:flex sm:pt-5 gap-4">
                            <div className="w-full sm:pt-0 pt-3">
                              <label htmlFor="mobileNumber" className="block text-black text-[15px] font-normal sm:text-base">Mobile Number</label>
                              <input
                                onChange={handleInputChange}
                                value={formData.mobileNumber}
                                name="mobileNumber"
                                type="text"
                                placeholder="03xx-xxxxxxxx"
                                className="mt-1 sm:h-[52px] h-[48px] rounded-md px-4 text-gray-500 text-base placeholder:text-gray-500 focus:outline-none focus-within:bg-gray-50 shadow w-full"
                              />
                            </div>
                            <div className="w-full sm:pt-0 pt-3">
                              <label htmlFor="alternateNumber" className="block text-black text-[15px] font-normal sm:text-base">Alternate Number</label>
                              <input
                                onChange={handleInputChange}
                                value={formData.alternateNumber}
                                name="alternateNumber"
                                type="text"
                                placeholder="03xx-xxxxxxxx"
                                className="mt-1 sm:h-[52px] h-[48px] rounded-md px-4 text-gray-500 text-base placeholder:text-gray-500 focus:outline-none focus-within:bg-gray-50 shadow w-full"
                              />
                            </div>
                          </div>
                          <div className="sm:flex sm:pt-5">
                            <div className="w-full sm:pt-0 pt-3">
                              <label htmlFor="deliveryAddress" className="block text-black text-[15px] font-normal sm:text-base">Delivery Address</label>
                              <input
                                type="text"
                                name="deliveryAddress"
                                onChange={handleInputChange}
                                value={formData.deliveryAddress}
                                placeholder="Enter your complete address"
                                className="mt-1 sm:h-[52px] h-[48px] rounded-md px-4 text-gray-500 text-base placeholder:text-gray-500 focus:outline-none focus-within:bg-gray-100 shadow w-full"
                              />
                            </div>
                          </div>
                          <div className="sm:flex items-center sm:pt-5 gap-4">
                            <div className="w-full sm:pt-0 pt-3">
                              <label htmlFor="nearestLandmark" className="block text-black text-[15px] font-normal sm:text-base">Nearest Landmark</label>
                              <input
                                onChange={handleInputChange}
                                value={formData.nearestLandmark}
                                name="nearestLandmark"
                                type="text"
                                placeholder="Any famous place nearby"
                                className="mt-1 sm:h-[52px] h-[48px] rounded-md px-4 text-gray-500 text-base placeholder:text-gray-500 focus:outline-none focus-within:bg-gray-50 shadow w-full"
                              />
                            </div>
                            <div className="w-full sm:pt-0 pt-3">
                              <label htmlFor="emailAddress" className="block text-black text-[15px] font-normal sm:text-base">Email Address</label>
                              <input
                                onChange={handleInputChange}
                                value={formData.emailAddress}
                                name="emailAddress"
                                type="text"
                                placeholder="Please enter your email address"
                                className="mt-1 sm:h-[52px] h-[48px] rounded-md px-4 text-gray-500 text-base placeholder:text-gray-500 focus:outline-none focus-within:bg-gray-50 shadow w-full"
                              />
                            </div>
                          </div>
                          <div className="sm:flex sm:pt-5 gap-4">
                            <div className="w-full sm:pt-0 pt-3">
                              <label htmlFor="deliveryInstructions" className="block text-black text-[15px] font-normal sm:text-base">Delivery Instructions</label>
                              <input
                                onChange={handleInputChange}
                                value={formData.deliveryInstructions}
                                name="deliveryInstructions"
                                type="text"
                                placeholder="Enter any instructions or note to rider"
                                className="mt-1 sm:h-[52px] h-[48px] rounded-md px-4 text-gray-500 text-base placeholder:text-gray-500 focus:outline-none focus-within:bg-gray-50 shadow w-full"
                              />
                            </div>
                          </div>
                          <div className="mt-10">
                            <label htmlFor="" className="block text-black sm:text-lg text-base font-medium">Payment Information</label>
                            <div className="border border-green-500 flex shadow justify-center items-center rounded-md h-24 sm:w-52 mt-5">
                              <div className="mt-3">
                                <label htmlFor="" className="block text-gray-700 font-normal text-lg">Cash</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="sm:w-5/12 bg-gray-50 rounded-2xl sm:p-10 p-5 sm:mt-0 mt-4">
                        {cartList.map((item, index) => (
                          <div key={index}>
                            <div className="flex items-center">
                              <h1 className="text-black text-lg sm:text-xl font-medium">1 x {item.name}</h1>
                            </div>
                            <div className="my-7">
                              <hr />
                            </div>
                          </div>
                        ))}
                        <div>
                          <h1 className="flex justify-between items-center">
                            <span className="sm:text-lg text-[16px]">Total</span>
                            <span className="sm:text-[18px] text-[15px]">Rs. {totalPrice.toFixed(2)}</span>
                          </h1>
                          <h1 className="flex justify-between items-center text-yellow-500">
                            <span className="font-bold sm:text-lg text-[15px]">Discount</span>
                            <span className="sm:text-lg text-[16px]">Rs. {discount.toFixed(2)}</span>
                          </h1>
                          <h1 className="flex justify-between items-center">
                            <span className="font-semibold sm:text-lg text-[16px]">Grand Total</span>
                            <span className="font-semibold sm:text-lg text-[15px] text-black">Rs. {grandTotalPrice.toFixed(2)}</span>
                          </h1>
                        </div>
                        <button
                          onClick={handlePlaceOrder}
                          className="mt-14 bg-black text-lg sm:font-medium font-normal text-white hover:opacity-90 transition ease-in-out duration-150 rounded-lg w-full h-12"
                        >
                          Place Order
                        </button>
                        <div className="flex items-center justify-center" onClick={() => router.push('/')}>
                          <h6 className="text-center text-sm sm:text-base pt-5 flex text-blue-500 cursor-pointer hover:opacity-70 transition ease-in-out duration-150">
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-arrow-narrow-left"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M5 12l14 0" />
                                <path d="M5 12l4 4" />
                                <path d="M5 12l4 -4" />
                              </svg>
                            </span>
                            <span className="px-1">continue to add more items</span>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationModal;
