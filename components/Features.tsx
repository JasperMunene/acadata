import React from 'react';
import Image from 'next/image';

const Features: React.FC = () => {
  const images = [
    '/card1.png',
    '/card2.png',
    '/card3.png',
  ];

  return (
    <div className='mt-5 container mx-auto p-5'>
      <h1 className='text-center text-xl font-bold md:text-4xl lg:text-5xl pt-10'>
        Amazing <span className='border-b-4 border-blue-500'>things are</span> happening
      </h1>
      <div className="flex overflow-x-auto space-x-5 py-8">
        {images.map((src, index) => (
          <Image key={index} src={src} width={500} height={250} alt={`card${index + 1}`} className="flex-shrink-0" />
        ))}
      </div>
    </div>
  );
};

export default Features;
