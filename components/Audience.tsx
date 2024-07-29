// Audience.tsx

import React from 'react';
import { targetAudience, icons } from '@/constants/constants';

const Audience = () => {
  return (
    <div className='mt-5 bg-[#F2F2F2] lg:p-10'>
        <h1 className='text-center text-3xl font-bold md:text-4xl lg:text-5xl pt-10'>
          Who <span className='border-b-4 border-blue-500'>is AcaData</span> for
        </h1>
        <div className='mt-5 p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mx-6'>
        {targetAudience.map((person) => {
            const IconComponent = icons[person.icon]; 
            return (
                <div key={person.name} className={`flex flex-col items-start text-center p-4 rounded justify-start mt-4`}>
                    <div className={`mb-7 rounded-2xl p-2 ${person.style}`}>
                        <IconComponent size={40} /> 
                    </div>
                    <h2 className='font-semibold text-lg mb-5 tracking-tighter'>{person.name}</h2>
                    <p className='text-sm md:text-base lg:text-lg text-left'>{person.paragraph}</p>
                    
                </div>
            );
        })}
        </div>
    </div>
  );
};

export default Audience;
