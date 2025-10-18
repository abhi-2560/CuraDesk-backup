import React from 'react'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import StatsSection from '../components/StatsSection'
import TestimonialsSection from '../components/TestimonialsSection'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'


const Home = () => {
  return (
    <div>
      {/* there are some of the reshufflings of sections */}
        {/* New Modern Sections */}
        <HeroSection />
        <FeaturesSection />
        <Header/>
        <StatsSection />
        
        {/* Original Sections */}
        <SpecialityMenu/>
        <TopDoctors/>
        {/* <Banner/> */}
        <TestimonialsSection />
        
    </div>
  )
}

export default Home