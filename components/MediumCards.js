import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { getAllHomeStay } from 'pages/api/homestay/getAllHomeStay';
import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { Skeleton } from './components/ui/skeleton';

const MediumCards = () => {
	const [filters, setFilters] = useState({
		amenityNames: [],
		priceRange: [0, 1000],
		standard: [],
	});

	const { data, isLoading, error } = useQuery({
		queryKey: ['homeStays', filters],
		queryFn: () => getAllHomeStay(filters),
	});

	const dataHot = data?.filter((item) => item.standar === 5).slice(0, 4);

	// Function to truncate text with ellipsis
	const truncateText = (text, maxLength) => {
		if (!text) return 'No description available.';
		return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
	};

	return (
		<section className='sec-com bg-gray-50'>
			<div className='container-lg'>
				<div className='mb-10 text-center md:text-left'>
					<h2 className='text-3xl font-bold mb-3'>
						Top-Rated <span className='text-blue-600'>HomeStays</span>
					</h2>
					<p className='text-gray-600 max-w-2xl'>
						Discover our highest-rated accommodations with exceptional amenities and stunning locations.
					</p>
				</div>

				{isLoading ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
						{[1, 2, 3, 4].map((item) => (
							<div key={item} className='rounded-xl overflow-hidden shadow'>
								<Skeleton className='h-64 w-full' />
								<div className='p-4'>
									<Skeleton className='h-6 w-3/4 mb-2' />
									<Skeleton className='h-4 w-1/2 mb-4' />
									<Skeleton className='h-4 w-full mb-2' />
									<Skeleton className='h-4 w-full mb-2' />
									<Skeleton className='h-10 w-1/2 mt-4' />
								</div>
							</div>
						))}
					</div>
				) : error ? (
					<div className='text-center p-6 bg-red-50 rounded-lg text-red-600'>
						Something went wrong. Please try again later.
					</div>
				) : dataHot?.length === 0 ? (
					<div className='text-center p-6 bg-gray-100 rounded-lg text-gray-600'>
						No featured homestays available at this time.
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
						{dataHot?.map((item) => (
							<div
								key={item.id}
								className='group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col'
							>
								<div className='relative h-64 w-full overflow-hidden flex-shrink-0'>
									<Image
										src={item?.mainImage || '/images/placeholder.jpg'}
										alt={item.name}
										fill
										sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
										className={`object-cover transition-transform duration-700 ${
											!item.isBooked ? 'group-hover:scale-110' : ''
										}`}
									/>

									{/* Overlay gradient */}
									<div className='absolute inset-0 bg-gradient-to-b from-black/10 to-black/60 opacity-60 group-hover:opacity-80 transition-opacity'></div>

									{/* City badge */}
									{item.city && (
										<div className='absolute top-3 left-3'>
											<Badge className='bg-white/90 backdrop-blur-sm text-blue-600 border-0 shadow-sm'>
												<MapPin className='w-3 h-3 mr-1' />
												{item.city}
											</Badge>
										</div>
									)}

									{/* Booked status */}
									{item.isBooked && (
										<div className='absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-md font-bold z-10 shadow-md'>
											Booked
										</div>
									)}

									{/* Star rating */}
									<div className='absolute bottom-3 left-3 flex items-center'>
										{[...Array(5)].map((_, index) => (
											<Star
												key={index}
												className={`w-5 h-5 ${
													item.standar > index
														? 'text-yellow-400 fill-yellow-400'
														: 'text-gray-400'
												}`}
											/>
										))}
									</div>
								</div>

								<div className='p-5 flex flex-col flex-grow'>
									<h3 className='text-xl font-bold mb-2 text-gray-800'>
										{item?.name || 'HomeStay Name'}
									</h3>

									<p className='text-gray-600 text-sm mb-4 flex-grow'>
										{truncateText(item?.description, 100)}
									</p>

									{!item.isBooked ? (
										<Button
											asChild
											className='mt-auto bg-blue-600 hover:bg-blue-700 transition-all duration-300 w-full justify-center'
										>
											<Link href={`/home-stay/${item.id}`}>
												Book Now
												<ArrowRight className='ml-2 h-4 w-4' />
											</Link>
										</Button>
									) : (
										<Button disabled className='mt-auto w-full cursor-not-allowed'>
											Not Available
										</Button>
									)}
								</div>
							</div>
						))}
					</div>
				)}

				<div className='mt-10 text-center'>
					<Button asChild variant='outline' className='border-blue-200 text-blue-600 hover:bg-blue-50'>
						<Link href='/home-stay'>
							View All HomeStays
							<ArrowRight className='ml-2 h-4 w-4' />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
};

export default MediumCards;
