import Link from 'next/link';
import React from 'react'


const UserHomePage = () => {
    
  return (
    <div style={{height: '300px', color:'black', paddingTop: '100px'}}>User Home Page <Link href='/employees'>Employee List</Link></div>
  )
}

export default UserHomePage;