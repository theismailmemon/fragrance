"use client";
import React from 'react';
import SaleItem from './ProductItem';
import { useRouter } from "next/navigation";
import ItemOptions from '../components/ItemOptions';
import SearchInput from './SearchInput';
import Products from '../json/Products.json';

const Content = () => {
  const router = useRouter();

  // Filter SaleItemData to only include approved items
  const SaleItemData = Products.products.filter(item => item.status === 'Approved');

  const handleView = (category) => {
    router.push(`/collections/${category}`);
  };

  // Filter Best Sellers
  const bestSellers = SaleItemData.filter(item => item.isBestSeller);
  const bestSellersToShow = bestSellers.slice(0, 5);

  // Filter New Arrivals
  const newArrivals = SaleItemData.filter(item => item.isNewArrival);
  const newArrivalsToShow = newArrivals.slice(0, 5);

  return (
    <div>
      <div
        className="relative bg-cover bg-center w-full sm:h-[800px] h-[600px]"
        style={{ backgroundImage: "url('https://sprays-workdo.myshopify.com/cdn/shop/files/home-bg.png?v=1700128841')" }}
      >
        <div className="flex flex-col items-center justify-center h-full sm:px-10 px-4 max-w-[1500px] mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white bg-black bg-opacity-50 p-6 rounded mb-4">
            {Products.brand_name}
          </h1>
          <h2 className="text-xl md:text-3xl font-semibold text-white bg-black bg-opacity-50 p-4 rounded mb-4 text-center">
            {Products.brand_meaning}
          </h2>
          <p className="text-lg md:text-xl text-white bg-black bg-opacity-50 p-6 rounded text-center">
            {Products.brand_description}
          </p>
        </div>
      </div>
      <div className='max-w-[1500px] mx-auto my-10 sm:px-10 px-4'>
        <SearchInput />
        <div>
          <div className='sm:mt-20 mt-10'>
            <div className='flex items-center justify-between'>
              <h1 className="text-3xl font-bold sm:text-start text-center">
                Summer Deals
              </h1>
              {SaleItemData.length > 5 && (
                <h1 onClick={() => { handleView('all-products') }} className="text-black cursor-pointer font-medium header-effect text-lg mt-4">
                  View All
                </h1>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {SaleItemData.slice(0, 5).map(item => (
                <SaleItem
                  key={item.id}
                  item={item}
                />
              ))}
            </div>
          </div>

          <div className='mt-20'>
            <ItemOptions />
          </div>

          {/* Our Best Seller Section */}
          <div className='sm:mt-20 mt-10'>
            <div className='flex items-center justify-between'>
              <h1 className="text-3xl font-bold sm:text-start text-center">
                Our Best Seller
              </h1>
              {bestSellers.length > 5 && (
                <h1 onClick={() => { handleView('best-seller') }} className="text-black cursor-pointer font-medium header-effect text-lg mt-4">
                  View All
                </h1>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {bestSellersToShow.map(item => (
                <SaleItem
                  key={item.id}
                  item={item}
                />
              ))}
            </div>
          </div>

          {/* New Arrival Section */}
          <div className='sm:mt-20 mt-10'>
            <div className='flex items-center justify-between'>
              <h1 className="text-3xl font-bold sm:text-start text-center">
                New Arrival
              </h1>
              {newArrivals.length > 5 && (
                <h1 onClick={() => { handleView('new-arrival') }} className="text-black cursor-pointer font-medium header-effect text-lg mt-4">
                  View All
                </h1>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {newArrivalsToShow.map(item => (
                <SaleItem
                  key={item.id}
                  item={item}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
