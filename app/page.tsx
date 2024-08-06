'use client'
import React, { useEffect } from 'react'
import { Topbar } from '@/components/topbar'
import Hero from '@/components/Hero'
import Audience from '@/components/Audience'
import Features from '@/components/Features'


const page = () => {
  return (
    <div>
      <Topbar />
      <Hero />
      <Audience />
      <Features />
      </div>
  )
}

export default page