import { Badge } from '@/components/components/ui/badge';
import { Button } from '@/components/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Bath, Bed, Car, ChefHat, Cigarette, MapPin, Wifi } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { getHomeStayDetail } from 'pages/api/homestay/getHomeStayDetail';
import MainLayout from 'pages/layout';
import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const homeStayDetail = () => {
	const { id } = useParams() ?? {};

	const { data, isLoading, error } = useQuery({
		queryKey: ['homeStayDetail', id],
		queryFn: () => getHomeStayDetail(id),
		enabled: !!id,
	});

	const homestay = data || [];

	if (isLoading) {
		return (
			<MainLayout>
				<div className='container-lg p-4'>
					<div className='space-y-4'>
						<Skeleton height={300} className='rounded-lg' />

						<div className='space-y-2'>
							<Skeleton width={250} height={30} />
							<div className='flex items-center'>
								<MapPin className='w-4 h-4 mr-1 text-gray-400' />
								<Skeleton width={200} height={20} />
							</div>
						</div>

						<div className='flex justify-between'>
							<Skeleton width={150} height={30} />
							<Skeleton width={80} height={30} />
						</div>

						<div className='space-y-2'>
							<Skeleton width={150} height={25} />
							<div className='grid grid-cols-4 gap-4'>
								{Array(4)
									.fill(null)
									.map((_, i) => (
										<Skeleton key={i} height={20} />
									))}
							</div>
						</div>

						<div className='space-y-2'>
							<Skeleton width={200} height={25} />
							<Skeleton count={3} />
						</div>

						<Skeleton height={40} className='rounded-lg' />
					</div>
				</div>
			</MainLayout>
		);
	}

	const getPriceForToday = (calendar) => {
		const todayPrice = calendar?.find((item) => item.date.slice(0, 10) === currentDate);
		return todayPrice ? todayPrice.price : null;
	};

	const priceForToday = getPriceForToday(homestay.calendar);

	return (
		<MainLayout>
			<div className='sec-com'>
				<div className='container-lg'>
					<div className='relative'>
						<div className='relative'>
							<div className='flex flex-col space-y-4'>
								<PhotoProvider>
									<div className='flex flex-col h-full gap-2'>
										<div className='relative overflow-hidden rounded-lg'>
											<PhotoView src={homestay?.mainImage}>
												<Image
													src={homestay.mainImage}
													alt='Star Sun Hotel exterior'
													className='object-cover w-full'
													width={1000}
													height={800}
												/>
											</PhotoView>
										</div>

										<div className='md:hidden'>
											<Swiper
												spaceBetween={10}
												slidesPerView={3}
												navigation
												modules={[Navigation]}
											>
												{homestay?.homeStayImage?.map((img, index) => (
													<SwiperSlide key={index}>
														<PhotoView src={img.image}>
															<div className='relative rounded-lg flex justify-center h-full border p-3'>
																<Image
																	src={img.image}
																	alt='Hotel room'
																	width={100}
																	height={100}
																	className='object-cover rounded-lg'
																/>
															</div>
														</PhotoView>
													</SwiperSlide>
												))}
											</Swiper>
										</div>

										<div className='hidden md:grid grid-cols-4 lg:grid-cols-8 justify-items-center'>
											{homestay?.homeStayImage?.map((img, index) => (
												<PhotoView key={index} src={img.image}>
													<div className='relative rounded-lg h-full border p-3'>
														<Image
															src={img.image}
															alt='Hotel room'
															width={100}
															height={100}
															className='object-cover rounded-lg'
														/>
													</div>
												</PhotoView>
											))}
										</div>
									</div>
								</PhotoProvider>
								<div className='flex justify-between flex-col md:flex-row'>
									<div className='flex flex-col gap-2'>
										{/* <Badge className='bg-blue-100 text-blue-800 hover:bg-blue-100 w-fit'>
											Apartment
										</Badge> */}
										<h1 className='text-xl md:text-2xl font-bold'>{homestay.name}</h1>
										<div className='flex items-center text-gray-500 text-sm md:text-base'>
											<MapPin className='w-4 h-4 mr-1' />
											<span>
												{homestay.address}, {homestay.city}
											</span>
										</div>
									</div>
									<div className='flex flex-col gap-2'>
										<div className='flex items-center'>
											{[...Array(homestay.standar)].map((_, i) => (
												<svg
													key={i}
													className='w-5 h-5 text-yellow-400'
													fill='currentColor'
													viewBox='0 0 20 20'
												>
													<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
												</svg>
											))}
										</div>
										<h2 className='text-base md:text-lg font-semibold'>Price</h2>
										<div className='flex items-baseline'>
											<span className='text-xl md:text-2xl font-bold text-blue-600'>
												{priceForToday !== null ? (
													<p className='text-xl text-green-600'>${priceForToday}</p>
												) : (
													<p>Decommission</p>
												)}
											</span>
										</div>
									</div>
								</div>

								<div className='flex flex-col gap-2'>
									<h2 className='text-base md:text-lg font-semibold'>Facility</h2>
									{homestay.facility?.length > 0 ? (
										<div className='grid grid-cols-4 gap-4'>
											{homestay.facility.map((facility, index) => (
												<span key={index}>{facility}</span>
											))}
										</div>
									) : (
										<span>No facilities</span>
									)}
								</div>

								<div className='flex flex-col gap-2'>
									<h2 className='text-base md:text-lg font-semibold'>Description</h2>
									<p className='text-gray-600 text-sm md:text-base'>{homestay.description}</p>
								</div>
								<Button className='w-full bg-blue-600 hover:bg-blue-700 text-white'>Book Now</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default homeStayDetail;
