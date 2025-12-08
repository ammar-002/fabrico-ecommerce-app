import React from 'react'
import Navbar from '../Shared/Navbar'
import ProductsFilter from './ProductsFilter'
import ProductsDisplay from './ProductsDisplay'
import MobileFilter from './MobileFilter'
import Footer from '../Shared/Footer'
const ProductsMain = () => {
  return (
    <div className='overflow-x-hidden'>
        <Navbar/>
        <div className=' flex mt-[10vh]'>
          <ProductsFilter  />
          <ProductsDisplay/>
          <MobileFilter />
        </div>
        <Footer/>
    </div>
  )
}

export default ProductsMain