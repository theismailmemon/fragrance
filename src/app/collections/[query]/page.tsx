"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import Header from '../../components/Header';
import ProductItem from '../../components/ProductItem';
import Products from '../../json/Products.json';

interface SaleItemType {
  id: number;
  quantity: number;
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  imageUrl: string;
  hoverImageUrl: string;
  category: string;
  status: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

const ProductPage: React.FC = () => {
  const params = useParams();
  const SaleItems = Products.products as SaleItemType[]; // Ensure correct typing
  const query = params.query as string;

  // Mapping for filtering items based on query parameter
  const filterMapping: Record<string, (item: SaleItemType) => boolean> = {
    'best-seller': (item) => item.isBestSeller,
    'new-arrival': (item) => item.isNewArrival,
    'perfumes-for-men': (item) => item.category === 'men',
    'perfumes-for-women': (item) => item.category === 'women',
    'perfumes-for-eastren': (item) => item.category === 'eastern',
    'perfumes-for-westren': (item) => item.category === 'western',
  };

  // Function to filter items based on query parameter
  const filterItems = (query: string) => {
    const approvedItems = SaleItems.filter(item => item.status === 'Approved'); // Filter by approved status
    return filterMapping[query] ? approvedItems.filter(filterMapping[query]) : approvedItems;
  };

  const filteredItems = filterItems(query);

  // Image and title mappings for dynamic rendering
  const imageMapping: Record<string, string> = {
    'best-seller': 'https://example.com/best-seller.jpg',
    'new-arrival': 'https://example.com/new-arrival.jpg',
    'perfumes-for-men': 'https://example.com/perfumes-for-men.jpg',
    'perfumes-for-women': 'https://example.com/perfumes-for-women.jpg',
    'perfumes-for-eastren': 'https://example.com/perfumes-for-eastern.jpg',
    'perfumes-for-westren': 'https://example.com/perfumes-for-western.jpg',
    'all-products': 'https://example.com/all-products.jpg',
  };

  const titleMapping: Record<string, string> = {
    'best-seller': 'Best Seller Products',
    'new-arrival': 'New Arrival Products',
    'perfumes-for-men': 'Best Branded Perfumes for Men 2024',
    'perfumes-for-women': 'Best Branded Perfumes for Women 2024',
    'perfumes-for-eastren': 'Eastern Perfumes Collection',
    'perfumes-for-westren': 'Western Perfumes Collection',
    'all-products': 'Eclipse Fragrance All Products',
  };

  const getImageUrl = imageMapping[query] || imageMapping['all-products'];
  const pageTitle = titleMapping[query] || 'Eclipse Fragrance All Products';

  return (
    <div>
      <Header />
      <div className='mt-[96px]'>
        {getImageUrl && (
          <img
            src={getImageUrl}
            alt={query.replace('-', ' ')}
            className='w-full sm:h-[700px] h-[500px]'
          />
        )}
      </div>

      <div className='my-12'>
        <div className='max-w-[1500px] mx-auto sm:px-10 px-4'>
          <h2 className='text-4xl font-bold sm:text-start text-center'>
            {pageTitle}
          </h2>
        </div>
        <div className='my-10 border-t w-full'></div>
        <div className='max-w-[1500px] mx-auto sm:px-10 px-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg text-gray-950'>{filteredItems.length} Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredItems.map((item) => (
              <ProductItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
