import React from 'react'
import Navbar from '../Navbar/navbar'
import HeroSection from '../hero/hero'
import FAQSection from '../faq/faq'
import Footer from '../footer/footer'

const home = () => {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <FAQSection/>
    <Footer/>
    </>
  )
}

export default home