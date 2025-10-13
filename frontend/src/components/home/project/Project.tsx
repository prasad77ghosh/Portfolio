"use client"
import Header from '@/components/global/Header'
import React from 'react'
import { ProjectTab } from './projectTab'

const Project = () => {
  return (
   <div className='max-w-[95rem] mx-auto w-full mb-48'>
    <Header colorText='Projects' normalText='My'/>
    <ProjectTab/>
   </div>
  )
}

export default Project