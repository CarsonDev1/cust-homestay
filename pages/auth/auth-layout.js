import Head from 'next/head';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'sonner';

const AuthLayout = ({ children }) => {
	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<Head>
				<title>Airbnb: Incredible Places to Stay and Things to Do</title>
				<meta
					name='description'
					content='Find holiday rentals, cabins, beach houses, unique homes and experiences around the world – all made possible by Hosts on Airbnb.'
				/>
				<link rel='icon' href='images/logo.svg' />
			</Head>
			<div className='w-full mx-auto'>
				{children}
				<Toaster position='top-right' richColors />
				<ToastContainer />
			</div>
		</div>
	);
};

export default AuthLayout;
