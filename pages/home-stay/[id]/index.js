import { Badge } from '@/components/components/ui/badge';
import { Button } from '@/components/components/ui/button';
import { ArrowLeft, Bath, Bed, Car, ChefHat, Cigarette, MapPin, Wifi } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import MainLayout from 'pages/layout';
import React from 'react';

const homeStayDetail = () => {
	const { id } = useParams() ?? {};

	return (
		<MainLayout>
			<div className='sec-com'>
				<div className='container-lg'>
					<div className='flex gap-4 relative'>
						<div className='w-3/4 relative'>
							<div className='flex flex-col space-y-4'>
								<div className='flex h-full'>
									<div className='relative w-2/3 overflow-hidden rounded-lg'>
										<Image
											src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9X7Nw8oikJuzewviUM28Mvx7OF41o7.png'
											alt='Star Sun Hotel exterior'
											className='object-cover'
											width={800}
											height={300}
										/>
									</div>
									<div className='flex flex-col justify-between w-1/3 gap-3'>
										<div className='relative rounded-lg h-full'>
											<Image
												src='/placeholder.svg?height=200&width=300'
												alt='Hotel room'
												width={100}
												height={100}
												className='object-cover'
											/>
										</div>
										<div className='relative rounded-lg h-full'>
											<div className='absolute inset-0 bg-black/60 flex items-center justify-center z-10 rounded-lg'>
												<span className='text-white text-xl font-semibold'>+10</span>
											</div>
											<Image
												src='/placeholder.svg?height=200&width=300'
												alt='More hotel images'
												className='object-cover'
												width={100}
												height={100}
											/>
										</div>
									</div>
								</div>
								<div className='flex justify-between'>
									<div>
										<Badge className='mb-2 bg-blue-100 text-blue-800 hover:bg-blue-100'>
											Apartment
										</Badge>
										<h1 className='text-2xl font-bold mb-2'>Star Sun Hotel & Apartment</h1>
										<div className='flex items-center text-gray-500 mb-2'>
											<MapPin className='w-4 h-4 mr-1' />
											<span>North Carolina, USA</span>
										</div>
									</div>
									<div className='flex flex-col gap-2'>
										<div className='flex items-center'>
											{[...Array(5)].map((_, i) => (
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
										<h2 className='text-lg font-semibold'>Price</h2>
										<div className='flex items-baseline'>
											<span className='text-3xl font-bold text-blue-600'>$80</span>
											<span className='text-gray-600 text-sm ml-2'>For One Day</span>
										</div>
									</div>
								</div>

								<div className='flex flex-col gap-2'>
									<h2 className='text-lg font-semibold'>Facility</h2>
									<div className='grid grid-cols-4 gap-4'>
										<div className='flex items-center gap-2'>
											<Bed className='w-5 h-5 text-gray-500' />
											<span>4 Beds</span>
										</div>
										<div className='flex items-center gap-2'>
											<Bath className='w-5 h-5 text-gray-500' />
											<span>Baths</span>
										</div>
										<div className='flex items-center gap-2'>
											<svg
												className='w-5 h-5 text-gray-500'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
												/>
											</svg>
											<span>28M Area</span>
										</div>
										<div className='flex items-center gap-2'>
											<Cigarette className='w-5 h-5 text-gray-500' />
											<span>Smooking Area</span>
										</div>
										<div className='flex items-center gap-2'>
											<ChefHat className='w-5 h-5 text-gray-500' />
											<span>Kitchen</span>
										</div>
										<div className='flex items-center gap-2'>
											<svg
												className='w-5 h-5 text-gray-500'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
												/>
											</svg>
											<span>Balcony</span>
										</div>
										<div className='flex items-center gap-2'>
											<Wifi className='w-5 h-5 text-gray-500' />
											<span>Wifi</span>
										</div>
										<div className='flex items-center gap-2'>
											<Car className='w-5 h-5 text-gray-500' />
											<span>Parking Area</span>
										</div>
									</div>
								</div>

								<div className='flex flex-col gap-2'>
									<h2 className='text-lg font-semibold'>Description</h2>
									<p className='text-gray-600 text-sm'>
										Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem
										Ipsum has been the industry's standard dummy text ever since the 1500s, when an
										unknown printer took a galley of type and scrambled it to make a type specimen
										book. It has survived not only five centuries, but also the leap into electronic
										typesetting, remaining essentially unchanged.
									</p>
								</div>
							</div>
						</div>

						<div className='w-1/4 h-fit sticky top-20'>
							<div className=''>
								<div className='bg-white rounded-lg shadow flex flex-col items-center p-4'>
									<div className='flex items-center gap-4 mb-4'>
										<div className='relative'>
											<Image
												src='/placeholder.svg?height=64&width=64'
												alt='Agent profile'
												className='rounded-full object-cover'
												width={64}
												height={64}
											/>
										</div>
									</div>
									<div className='text-center'>
										<h3 className='font-semibold'>Hussain Ahmed</h3>
										<p className='text-sm text-gray-500'>Agent</p>
										<p className='text-sm text-gray-500'>
											<MapPin className='w-4 h-4 inline mr-1' />
											North Carolina, USA
										</p>
										<p className='text-sm text-gray-500'>10 Properties</p>
									</div>
									<div className='space-y-2 w-full mt-4'>
										<Button className='w-full bg-blue-600 text-white hover:bg-blue-700'>
											Message
										</Button>
										<Button className='w-full border-blue-600 text-blue-600 hover:bg-blue-50'>
											Call
										</Button>
									</div>
								</div>

								<div className='relative'>
									<Image
										src='/placeholder.svg?height=300&width=400'
										alt='Map'
										width={300}
										height={300}
										className='rounded-lg object-cover'
									/>
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
