import Head from 'next/head';
import React from 'react';

const AuthLayout = ({ children }) => {
	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<Head>
				<title>Airbnb: Incredible Places to Stay and Things to Do</title>
				<meta
					name='description'
					content='Find holiday rentals, cabins, beach houses, unique homes and experiences around the world – all made possible by Hosts on Airbnb.'
				/>
				<link rel='icon' href='images/logo.svg' />
			</Head>
			<div className='bg-white p-8 rounded-xl shadow-xl w-full max-w-md'>{children}</div>
		</div>
	);
};

export default AuthLayout;
