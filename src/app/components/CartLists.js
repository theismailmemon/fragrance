"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartModal = ({ onClose }) => {
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

  const updateCartList = (updatedCartList) => {
    setCartList(updatedCartList);
    localStorage.setItem('cartListInformation', JSON.stringify(updatedCartList));
  };

  const handlePlus = (index) => {
    const updatedCartList = cartList.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCartList(updatedCartList);
  };

  const handleMinus = (index) => {
    const updatedCartList = cartList.map((item, i) =>
      i === index && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    updateCartList(updatedCartList);
  };

  const handleDelete = (index, item) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm(`Are you sure you want to remove ${item.name} from the cart?`);

    // If user confirms, proceed with deletion
    if (isConfirmed) {
      const updatedCartList = cartList.filter((_, i) => i !== index);
      updateCartList(updatedCartList);
      toast.info(`${item.name} removed from cart`, { autoClose: 2000 });
    }
  };

  const handleClearCart = () => {
    // Show confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to clear all items from the cart?");

    // If user confirms, proceed with clearing the cart
    if (isConfirmed) {
      setCartList([]);
      localStorage.removeItem('cartListInformation');
      toast.info("Cart has been cleared"), { autoClose: 2000 };
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
    <section className="flex z-[1000] justify-end fixed w-full overflow-hidden inset-y-0 right-0 left-0">
      <div
        onClick={onClose}
        className="fixed w-full overflow-hidden min-h-screen bg-black bg-opacity-50 transition-opacity cursor-pointer"
      ></div>
      <div className="w-screen max-w-md h-full z-50 static">
        <div className="mx-auto h-full flex flex-col mr-4 sm:mr-0 sm:rounded-l-3xl bg-gray-50 overflow-y-auto">
          <div className="flex-1 relative">
            {cartList.length === 0 ? (
              <div className="flex justify-center items-center h-screen">
                <div data-aos="fade-right">
                  <div className="flex justify-center items-center black">
                    <svg id="Layer_1" data-name="Layer 1" className="black" xmlns="http://www.w3.org/2000/svg"
                      width="8rem" fill="var(--background-color)" viewBox="0 0 227.52 308.16">
                      <path className="cls-1 black" d="M114.94,273.77h0Z"></path>
                      <path
                        d="M216.57,280.58c-1.32-9.7-2.75-19.39-4.07-29.1q-8-58.71-16-117.44-4.29-31.57-8.52-63.17c-1.35-9.93-5.57-13.68-15.49-13.63-6.82,0-13.64.06-20.44.4-4.22.22-5.56-1.46-5.37-5.52.22-4.47-.14-9-.23-13.45a22.69,22.69,0,0,0-22-22q-10.23-.2-20.46,0A22.43,22.43,0,0,0,82.33,37.35a135.58,135.58,0,0,0-.16,14.95c.19,4.22-1.4,5.46-5.55,5.26-8-.38-15.94-.44-23.9-.24-7.4.18-11.24,3.81-12.35,11.09-1.73,11.32-3.5,22.63-5,34q-5.1,37.71-10,75.45-6.62,51.38-13,102.78c-1.16,9.21,3.81,14.53,13.07,14.52q44.4-.06,88.78,0v0H204C212.65,295.18,217.76,289.33,216.57,280.58ZM87.31,53.54c.25-4.63-.08-9.29.06-13.94.33-10.34,7.47-17.36,17.77-17.51,6.14-.09,12.29-.14,18.43,0,10.19.2,17.42,7.44,17.73,17.64.13,4.64,0,9.29.25,13.93.15,3-.88,4.1-4,4-7.8-.19-15.61-.06-23.41-.06-7.47,0-15-.09-22.41,0C88.71,57.71,87.12,57,87.31,53.54Zm-42.69,20C46,64.06,47.42,62.6,57,62.61H171.19c9.41,0,13.76,5.24,12.05,14.37-.44,2.34-2.19,1.65-3.5,1.66-9.48.07-19,0-28.43,0H113.39c-21.29,0-42.57-.11-63.86.09C45.37,78.8,44,77.79,44.62,73.51ZM19.89,260.66c2-10.77,3.07-21.71,4.48-32.58,1.51-11.7,2.89-23.41,4.44-35.1q5.48-41.07,11-82.13c1-7.24,2-14.49,2.66-21.76.32-3.33,1.15-5,5-5q66.39.19,132.78,0c3.21,0,4.22,1.12,4.63,4.17q5.67,42.71,11.61,85.39c3.09,22.37,6.3,44.72,9.38,67.09,1.09,7.89,1.78,15.85,3,23.72.56,3.5-.85,3.86-3.68,3.84-14.14-.08-28.28,0-42.43,0H25.58C18.34,268.29,18.56,267.91,19.89,260.66Zm185.75,29a39.56,39.56,0,0,1-6,.17q-86.1,0-172.18,0c-9.38,0-13.18-6.11-9.15-14.54,1.13-2.36,3.14-1.47,4.77-1.48q37.68-.09,75.36,0h106.3c6,0,6,0,6.63,7.58C211.8,286.21,210,289,205.64,289.7Z">
                      </path>
                      <path className="cls-2 black"
                        d="M135.18,197.06c-.81,1.49-2.25,1.13-3.52,1.13-11.87,0-23.74,0-35.61,0a10.11,10.11,0,0,1-2.17-.18,3.06,3.06,0,0,1-1-.4,1.57,1.57,0,0,1-.55-1.87,2.77,2.77,0,0,1,.09-.33c0-.12.09-.25.14-.38s.2-.43.32-.67l.21-.37a2.06,2.06,0,0,1,.25-.26,1.86,1.86,0,0,1,.55-.36,1.45,1.45,0,0,1,.29-.11l.3-.08h0l.3,0a14.58,14.58,0,0,1,1.48,0h35.56C134.51,193.12,136.63,193.56,135.18,197.06Z">
                      </path>
                      <path className="cls-2 black"
                        d="M92.37,162.54c.31-3.39,2.51-5.53,6.38-5.65s6.37,3,6.14,6.9c-.24,4.14-2.93,6.08-6.58,5.91S92.29,167.15,92.37,162.54Z">
                      </path>
                      <path className="cls-2 black"
                        d="M123.64,163.48a6.23,6.23,0,0,1,6.45-6.59c4,.08,5.83,2.84,6.2,6.24.43,4-2.32,6.08-5.87,6.65S123.73,167.11,123.64,163.48Z">
                      </path>
                    </svg>
                  </div>
                  <h1 className="text-center font-semibold black">Your cart is empty</h1>
                  <h1 className="text-center text-gray-600">Add some items to your cart to see them here.</h1>
                </div>
              </div>
            ) : (
              <div className="px-5 py-6">
                <div className="flex justify-between">
                  <h1 className="font-medium text-black text-[22px]">Your Cart</h1>
                  <div className="flex items-center">
                    <button
                      onClick={handleClearCart}
                      className="mx-2 bg-black text-base text-white font-medium rounded-full h-7 px-3 flex items-center"
                    >
                      Clear Cart
                    </button>
                    <div
                      onClick={onClose}
                      className="rounded-full p-1 bg-gray-300 font-semibold text-white transition ease-in-out duration-150 hover:bg-red-700 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                </div>

                {cartList.map((item, index) => (
                  <div key={index} className="flex mt-10 justify-between items-center border-b pb-10">

                    <div className="flex items-center">
                      <img
                        src={item.imageUrl || "/defaultImage.jpg"} // Adjust the default image path
                        alt={item.name}
                        className="border-slate-200 rounded h-16 object-cover p-1 w-[70px] border"
                      />
                      <div>
                        <h1 className="px-4 text-black font-medium text-base sm:text-xl">{item.name}</h1>
                        <h1 className="px-4 text-gray-600 text-sm pt-1">{item.description}</h1>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-black">  Rs. {calculateItemPrice(item)}</h1>

                      <div className="flex items-center">
                        <span onClick={() => handleDelete(index, item)} v-if="item.number == 1"
                          className={`bg-gray-200 cursor-pointer rounded-full px-[3px] py-[3px] ${item.quantity === 1 ? "" : "hidden"}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                            stroke="currentColor" className="w-4 h-4 text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </span>
                        <span
                          onClick={() => handleMinus(index)}
                          className={`bg-gray-200 cursor-pointer rounded-full px-[3px] py-[3px] ${item.quantity === 1 ? "hidden" : ""}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12" />
                          </svg>
                        </span>
                        <span className="px-3 text-black font-medium">{item.quantity}</span>
                        <span
                          onClick={() => handlePlus(index)}
                          className="bg-gray-200 cursor-pointer rounded-full px-[3px] py-[3px]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12M6 12h12" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-5">
                  <h1 className="flex justify-between items-center">
                    <span>Total</span>
                    <span className="text-[18px]">Rs. {totalPrice}</span>
                  </h1>
                  <h1 className="flex justify-between items-center text-yellow-500">
                    <span className="font-bold text-lg">Discount</span>
                    <span>Rs. {discount}</span>
                  </h1>
                  <h1 className="flex justify-between items-center">
                    <span className="font-semibold text-lg">Grand Total</span>
                    <span className="font-semibold text-lg text-black">Rs. {grandTotalPrice}</span>
                  </h1>
                </div>
                <div className="mt-10">
                  <button
                    onClick={() => {router.push('/checkout')}}
                    className="bg-black text-lg px-4 flex items-center justify-between font-medium text-white hover:opacity-90 transition ease-in-out duration-150 rounded-lg w-full h-12"
                  >
                  <h1></h1>
                  <h1>Checkout</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-arrow-right-filled" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#597e8d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 2l.324 .005a10 10 0 1 1 -.648 0l.324 -.005zm.613 5.21a1 1 0 0 0 -1.32 1.497l2.291 2.293h-5.584l-.117 .007a1 1 0 0 0 .117 1.993h5.584l-2.291 2.293l-.083 .094a1 1 0 0 0 1.497 1.32l4 -4l.073 -.082l.064 -.089l.062 -.113l.044 -.11l.03 -.112l.017 -.126l.003 -.075l-.007 -.118l-.029 -.148l-.035 -.105l-.054 -.113l-.071 -.111a1.008 1.008 0 0 0 -.097 -.112l-4 -4z" strokeWidth="0" fill="currentColor" />
                    </svg>
                  </button>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartModal;
