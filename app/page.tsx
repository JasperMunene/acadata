'use client'
import React, { useEffect } from 'react'
import { Topbar } from '@/components/topbar'
import Hero from '@/components/Hero'
import Audience from '@/components/Audience'

const page = () => {
  return (
    <div>
      <Topbar />
      <Hero />
      <Audience />
      </div>
  )
}

export default page