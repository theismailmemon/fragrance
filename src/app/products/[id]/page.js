"use client";
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter, useParams } from 'next/navigation';
import Header from '../../components/Header';
import Products from '../../json/Products.json'; 

const ProductPage = () => {
    const params = useParams();
    const router = useRouter();
    const id = params.id; 
    const itemJson = Products.products; 
    const [productInformation, setProductInformation] = useState(null);
    const [currentImage, setCurrentImage] = useState(0);
  
    useEffect(() => {
      const product = itemJson.find((item) => item.id === Number(id)); 
      if (product) {
        setProductInformation(product); 
      } else {
        setProductInformation(null); 
     
      }
    }, [id, itemJson]); 

    const handleQuantityChange = (e) => {
        const newQuantity = e.target.value;
        // Validate and update the quantity
        if (newQuantity >= 0) {
            setProductInformation((prev) => ({
                ...prev,
                quantity: Number(newQuantity),
            }));
            localStorage.setItem('productInformation', JSON.stringify({
                ...productInformation,
                quantity: Number(newQuantity),
            }));
        }
    };

    const handleDecrease = () => {
        setProductInformation((prev) => {
            const newQuantity = Math.max(1, prev.quantity - 1); // Prevent quantity from going below 1
            localStorage.setItem('productInformation', JSON.stringify({
                ...prev,
                quantity: newQuantity,
            }));
            return {
                ...prev,
                quantity: newQuantity,
            };
        });
    };

    const handleIncrease = () => {
        setProductInformation((prev) => {
            const newQuantity = prev.quantity + 1; // Increment quantity
            localStorage.setItem('productInformation', JSON.stringify({
                ...prev,
                quantity: newQuantity,
            }));
            return {
                ...prev,
                quantity: newQuantity,
            };
        });
    };

    const images = [
        productInformation?.imageUrl,
        productInformation?.hoverImageUrl,
    ];

    const handleImageClick = (index) => {
        setCurrentImage(index);
    };

    const handleScroll = (direction) => {
        if (direction === 'left') {
            setCurrentImage((prevImage) => (prevImage === 0 ? images.length - 1 : prevImage - 1));
        } else {
            setCurrentImage((prevImage) => (prevImage === images.length - 1 ? 0 : prevImage + 1));
        }
    };

    const handleAddCart = () => {
        // Retrieve and parse cartList from localStorage
        let cartList = JSON.parse(localStorage.getItem('cartListInformation'));

        // Initialize cartList as an array if it's null or undefined
        if (!Array.isArray(cartList)) {
            cartList = [];
        }

        // Add the productInformation to cartList
        cartList.push(productInformation);

        // Store the updated cartList back in localStorage
        localStorage.setItem('cartListInformation', JSON.stringify(cartList));

        // Notify user of successful addition to cart
        toast.success('Item added to Cart!', { autoClose: 2000 });
    };

    return (
        <div>
            <ToastContainer />
            <Header />
            <div className='max-w-[1500px] mx-auto mt-36'>
                <div className='flex'>
                    <div className='w-[50%] px-8 py-3 flex gap-5'>
                        <div className='flex flex-col'>
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    onClick={() => handleImageClick(index)}
                                    className={`h-24 w-24 m-2 cursor-pointer shadow ${currentImage === index ? 'border-2 border-black' : ''}`}
                                    alt={`Thumbnail ${index}`}
                                />
                            ))}
                        </div>
                        <div className='relative w-full'>
                            <div className='absolute top-1/2 left-0 transform -translate-y-1/2 flex flex-col gap-4'>
                                <button onClick={() => handleScroll('left')} className='bg-white p-1 border rounded shadow'>
                                    ◀
                                </button>
                            </div>
                            <img
                                src={images[currentImage]}
                                className='w-full h-auto max-h-[calc(100vh-32px)] object-contain shadow'
                                alt="Full Image"
                            />
                            <div className='absolute top-1/2 right-0 transform -translate-y-1/2 flex flex-col gap-4'>
                                <button onClick={() => handleScroll('right')} className='bg-white p-1 border rounded shadow'>
                                    ▶
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='w-[50%] px-8 py-3 mt-10'>
                        <h1 className="text-3xl font-bold">{productInformation?.name}</h1>
                        <div className='flex items-center mt-6 gap-5'>
                            <div className='flex items-center gap-2'>
                                <svg width="20" height="19" viewBox="0 0 20 19"><path d="M9.94463 0.385742L12.4134 6.98807L19.4555 7.29578L13.9392 11.6839L15.8227 18.4764L9.94463 14.5862L4.06661 18.4764L5.95008 11.6839L0.433785 7.29578L7.47586 6.98807L9.94463 0.385742Z" fill="#312727"></path></svg>
                                <svg width="20" height="19" viewBox="0 0 20 19"><path d="M9.94463 0.385742L12.4134 6.98807L19.4555 7.29578L13.9392 11.6839L15.8227 18.4764L9.94463 14.5862L4.06661 18.4764L5.95008 11.6839L0.433785 7.29578L7.47586 6.98807L9.94463 0.385742Z" fill="#312727"></path></svg>
                                <svg width="20" height="19" viewBox="0 0 20 19"><path d="M9.94463 0.385742L12.4134 6.98807L19.4555 7.29578L13.9392 11.6839L15.8227 18.4764L9.94463 14.5862L4.06661 18.4764L5.95008 11.6839L0.433785 7.29578L7.47586 6.98807L9.94463 0.385742Z" fill="#312727"></path></svg>
                                <svg width="20" height="19" viewBox="0 0 20 19"><path d="M9.94463 0.385742L12.4134 6.98807L19.4555 7.29578L13.9392 11.6839L15.8227 18.4764L9.94463 14.5862L4.06661 18.4764L5.95008 11.6839L0.433785 7.29578L7.47586 6.98807L9.94463 0.385742Z" fill="#312727"></path></svg>
                                <svg width="20" height="19" viewBox="0 0 20 19"><path d="M9.94463 0.385742L12.4134 6.98807L19.4555 7.29578L13.9392 11.6839L15.8227 18.4764L9.94463 14.5862L4.06661 18.4764L5.95008 11.6839L0.433785 7.29578L7.47586 6.98807L9.94463 0.385742Z" fill="#312727"></path></svg>
                            </div>
                            <div>
                                <h5 className='font-medium'>100 Reviews</h5>
                            </div>
                        </div>
                        <p className='pt-4 text-lg text-gray-800'>{productInformation?.description}</p>
                        <div className='mt-12'>
                            <h2 className='text-black font-semibold text-lg'>Price:</h2>
                            <h1 className='text-2xl text-red-600 flex items-center gap-2 pt-3'> <strike>{productInformation?.price}</strike> {productInformation?.originalPrice}</h1>
                        </div>
                        <div className='mt-8'>
                            <h1 className="text-lg font-semibold">Quantity</h1>
                            <div className='mt-3 flex items-center w-20 border h-10'>
                                <div
                                    className='w-[33.3%] h-full cursor-pointer hover:bg-gray-200 flex items-center justify-center'
                                    onClick={handleDecrease}
                                >
                                    <svg width="10" height="2" viewBox="0 0 10 2" fill="none"><path d="M0 0H10V2H0V0Z" fill="#6B7280"></path></svg>
                                </div>
                                <input
                                    type='text'
                                    value={productInformation?.quantity || 0}
                                    onChange={handleQuantityChange}
                                    className='w-[33.3%] text-center border-0 outline-none'
                                />
                                <div
                                    className='w-[33.3%] h-full cursor-pointer hover:bg-gray-200 flex items-center justify-center'
                                    onClick={handleIncrease}
                                >
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M0 4.5H10V5.5H0V4.5Z" fill="#6B7280"></path><path d="M5 0V10H6V0H5Z" fill="#6B7280"></path></svg>
                                </div>
                            </div>
                        </div>
                      <div className='mt-12'>
                      <button
                            onClick={handleAddCart}   style={{ border: '1px solid #d1d5db' }}
                            className='bg-white text-black font-semibold py-2 w-full text-lg px-6 rounded-full hover:opacity-85'
                        >
                            Add to Cart
                        </button>
                      <button
                            onClick={handleAddCart}
                            className='bg-red-600 text-white font-semibold py-2 w-full text-lg px-6 rounded-full hover:opacity-85 mt-4'
                        >
                          Buy it now
                        </button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
