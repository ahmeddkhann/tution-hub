"use client"

import React from 'react'
import { details } from './data'

const Page = () => {
  return (
    <div className="bg-gray-900 text-gray-300 h-screen flex pt-16 justify-center">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          {details.title}
        </h1>
        <h2 className="text-2xl md:text-3xl lg:text-4xl mb-2">
          {details.subtitle}
        </h2>
      </div>
     
    </div>
  )
}

export default Page
