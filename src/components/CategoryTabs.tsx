import React, { useRef } from 'react';
import clsx from 'clsx';
import { categories } from '../data/tabs';

interface Props {
  active: number;
  onChange: (idx: number) => void;
}

const CategoryTabs = ({ active, onChange }: Props) => {
  return (
    <div className="h-[54px] flex overflow-x-none px-2 py-2 border-b border-gray-200 sm:justify-center ">
      {categories.map((label, idx) => (
     <button
     key={idx}
     className={clsx(
       'whitespace-nowrap px-4 py-2 text-base rounded-full transition',
       active === idx
         ? 'text-white font-black '
         : 'text-black font-bold',
       'focus:outline-none active:outline-none'
     )}
     tabIndex={0}
     onClick={(e) => {
       onChange(idx);
       (e.currentTarget as HTMLButtonElement).blur();
     }}
   >
          {label}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
