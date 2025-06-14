import React from 'react';
import Navbar from '../Share Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Share Components/Footer';
import ScrollToTop from '../Share Components/ScrollToTop';

const MainLayout = () => {
    return (
        <div className='max-w-6xl mx-auto px-2'>
        <ScrollToTop></ScrollToTop>
        <Navbar></Navbar>
        <main className=''>
        <Outlet></Outlet>
        </main>
        <Footer></Footer>
        </div>
    );
};

export default MainLayout;