import Image from 'next/image';
import React from 'react';
import miroodles from '@/public/Miroodles Color Composition.png';

const Hero = () => {
  return (
    <section className='mt-16 flex justify-center'>
      <div className='flex flex-col md:flex-row items-center max-w-7xl w-full px-4 py-5 md:px-8'>
        <div className='p-5 md:w-1/2'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-snug mb-4 md:mb-6'>
            Transform Learning with Data-Driven Insights
          </h1>
          <p className='text-lg md:text-xl lg:text-2xl font-medium tracking-tight mb-4 md:mb-6'>
            Empower teachers and students with actionable insights from performance data. Our app analyzes exam results to highlight strengths and areas for improvement, making education more effective and personalized.
          </p>
          <div className='flex justify-center md:justify-start my-5'>
            <div className='text-sm md:text-base border border-gray-300 px-4 py-2 rounded-lg tracking-tight'>
              Coming Soon!
            </div>
          </div>
        </div>
        <div className='p-5 md:w-1/2 flex justify-center'>
          <Image src={miroodles} alt='doodle' className='mx-auto' height={600} width={600} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
