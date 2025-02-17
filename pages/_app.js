import Head from 'next/head';
import NProgress from 'nprogress';
import Router from 'next/router';
import 'nprogress/nprogress.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from 'context/AuthProvider';
import Provider from 'utils/Provider';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeError', () => NProgress.done());
Router.events.on('routeChangeComplete', () => NProgress.done());

export default function MyApp({ Component, pageProps, session }) {
	return (
		<div className='h-full'>
			<Head>
				<title>Runa: Incredible Places to Stay and Things to Do</title>
				<meta
					name='description'
					content='Find holiday rentals, cabins, beach houses, unique homes and experiences around the world – all made possible by Hosts on Airbnb.'
				/>
				<link rel='icon' href='images/logo.svg' />
			</Head>
			<Provider>
				<AuthProvider dynamic>
					<SessionProvider session={session}>
						<Component {...pageProps} />
						<ToastContainer />
					</SessionProvider>
				</AuthProvider>
			</Provider>
		</div>
	);
}
