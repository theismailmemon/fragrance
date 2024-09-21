import React from 'react';
import ItemOptionsData from '../json/itemOptionsFirst.json';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();

    const handleItemClick = (query) => {
        router.push(`/collections/${query}`);
    };

    return (
        <div className='grid grid-cols-4 gap-4'>
            {ItemOptionsData.map((item, index) => (
                <div
                    key={index}
                    className='cursor-pointer'
                    onClick={() => handleItemClick(item.query)}
                >
                    <img
                        src={item.src}
                        alt={item.alt}
                        className='rounded-full hover:shadow-lg w-full mt-6 sm:mt-0 transition-transform duration-300 ease-in-out transform hover:translate-y-[-1%]'
                    />
                    <h2 className='text-center pt-2 text-lg font-semibold'>{item.text}</h2>
                </div>
            ))}
        </div>
    );
};

export default Page;
