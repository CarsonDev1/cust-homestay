import Banner from '@/components/Banner';
import Explore from '@/components/Explore';
import Hero from '@/components/Hero';
import MediumCards from '@/components/MediumCards';
import MainLayout from './layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AmenityList from '@/components/AmenityList';
import VoucherCard from '@/components/VoucherCard';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getPaymentReturn } from './api/payment/getPaymentReturn';
import { useEffect } from 'react';
import { useAuth } from 'context/AuthProvider';
import { toast } from 'sonner';

export default function Home() {
	const router = useRouter();
	const { code, id, cancel, status, orderCode } = router.query;

	const hasPaymentParams = !!(code || id || cancel || status || orderCode);

	const { dataProfile, isLoading: isLoadingAuth, isAuthenticated } = useAuth();

	useEffect(() => {
		if (!isLoadingAuth && isAuthenticated && dataProfile) {
			if (dataProfile.role === 'Manager') {
				toast.warning('Bạn đang sử dụng tài khoản quản lý. Đang chuyển hướng đến trang quản lý...');
				router.push('/manager');
			} else if (dataProfile.role === 'Admin') {
				toast.warning('Bạn đang sử dụng tài khoản quản trị. Đang chuyển hướng đến trang quản trị...');
				router.push('/admin');
			}
		}
	}, [isLoadingAuth, isAuthenticated, dataProfile, router]);

	useEffect(() => {
		if (router.isReady && hasPaymentParams) {
			if (status === 'CANCELLED') {
				router.push('/payment-error');
			} else if (status === 'PAID') {
				router.push({
					pathname: '/payment-success',
					query: {
						orderCode: orderCode,
						status: status,
					},
				});
			}
		}
	}, [router.isReady, status, orderCode, hasPaymentParams, router]);

	const { data, isLoading, isError } = useQuery({
		queryKey: ['paymentReturn', code, id, cancel, status, orderCode],
		queryFn: () => getPaymentReturn(code, id, cancel, status, orderCode),
		enabled: hasPaymentParams && router.pathname === '/' && !['CANCELLED', 'PAID'].includes(status),
		refetchOnWindowFocus: false,
		onSuccess: (data) => {
			console.log('Payment return processed successfully:', data);
			// Check the API response status as well (if your API returns a status)
			if (data.status === 'CANCELLED' || cancel === 'true') {
				router.push('/payment-error');
			} else {
				router.push({
					pathname: '/payment-success',
					query: {
						orderCode: orderCode,
						status: data.status || status,
					},
				});
			}
		},
		onError: (error) => {
			console.error('Payment return processing failed:', error);
			router.push('/payment-error');
		},
	});

	if (isLoading && hasPaymentParams) {
		return (
			<MainLayout>
				<div className='flex items-center justify-center min-h-screen'>
					<div className='p-6 text-center bg-white rounded-lg shadow-lg'>
						<div className='w-12 h-12 mx-auto mb-4 border-b-2 rounded-full animate-spin border-primary'></div>
						<p className='text-lg font-medium'>Processing your payment...</p>
						<p className='mt-2 text-sm text-gray-500'>Please don't close this window</p>
					</div>
				</div>
			</MainLayout>
		);
	}

	return (
		<MainLayout>
			<main>
				<Hero />
				<MediumCards />
				<VoucherCard />
				<AmenityList />
				<Explore />
				<Banner />
			</main>
		</MainLayout>
	);
}

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'home'])),
		},
	};
}
