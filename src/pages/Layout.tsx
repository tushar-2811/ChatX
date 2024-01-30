
import Header from '@/components/Header'
import React from 'react'

const Layout = ({children} : {children : React.JSX.Element}) => {
  return (
    <div className='h-full' >
       <Header/>
       {children}
    
    </div>
  )
}

export default Layout
