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

	// Role-based redirection
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

	// Payment status handling
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['paymentReturn', code, id, cancel, status, orderCode],
		queryFn: () => {
			console.log('Payment Return Query Params:', { code, id, cancel, status, orderCode });
			return getPaymentReturn(code, id, cancel, status, orderCode);
		},
		enabled: hasPaymentParams && router.pathname === '/',
		refetchOnWindowFocus: false,
		retry: 1,
	});

	// Side effect for handling payment return
	useEffect(() => {
		const handlePaymentReturn = async () => {
			try {
				console.log('Payment Return Data:', data);
				console.log('Payment Return Error:', error);

				// Direct query param handling
				if (status === 'CANCELLED') {
					router.push({
						pathname: '/payment-error',
						query: { orderCode, status },
					});
					return;
				}

				if (status === 'PAID') {
					router.push({
						pathname: '/payment-success',
						query: { orderCode, status },
					});
					return;
				}

				// Handle data from API response
				if (data) {
					if (data.status === 'CANCELLED' || cancel === 'true') {
						router.push({
							pathname: '/payment-error',
							query: {
								orderCode: orderCode || data.orderCode,
								status: data.status || status,
							},
						});
					} else if (data.status === 'PAID') {
						router.push({
							pathname: '/payment-success',
							query: {
								orderCode: orderCode || data.orderCode,
								status: data.status || status,
							},
						});
					}
				}
			} catch (processingError) {
				console.error('Payment processing error:', processingError);
				router.push({
					pathname: '/payment-error',
					query: {
						orderCode,
						status: 'ERROR',
						message: processingError.message,
					},
				});
			}
		};

		if (router.isReady && hasPaymentParams) {
			handlePaymentReturn();
		}
	}, [router.isReady, status, orderCode, hasPaymentParams, router, data, error]);

	// Loading state for payment processing
	if (isLoading && hasPaymentParams) {
		return (
			<MainLayout>
				<div className='flex items-center justify-center min-h-screen'>
					<div className='p-6 text-center bg-white rounded-lg shadow-lg'>
						<div className='w-12 h-12 mx-auto mb-4 border-b-2 rounded-full animate-spin border-primary'></div>
						<p className='text-lg font-medium'>Đang xử lý thanh toán...</p>
						<p className='mt-2 text-sm text-gray-500'>Vui lòng không đóng cửa sổ này</p>
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
