import { useState } from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import MasonryGrid from './MasonryGrid.jsx'
import './App.css'


function App() {

  return(
    <>
      <Header/>
      <div className='scroll-smooth overflow-hidden'>
        <div className='w-full md:pt-10 md:pb-20 md:px-20 md:bg-fixed'>
        <MasonryGrid />
        </div>
      </div>
      <Footer/>
    </>
  )
 
}

export default App
