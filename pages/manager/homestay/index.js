import React, { useState } from 'react';
import ManagerLayout from '../layout';
import { useQuery } from '@tanstack/react-query';
import { getAllHomeStay } from 'api/homestay/getAllHomeStay';
import { Button } from '@/components/components/ui/button';
import { getHomeStayDetail } from 'api/homestay/getHomeStayDetail';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/components/ui/dialog';
import Image from 'next/image';

const useHomeStayDetail = (homeStayID) => {
	return useQuery({
		queryKey: ['homeStayDetail', homeStayID],
		queryFn: () => getHomeStayDetail(homeStayID),
		enabled: !!homeStayID, // Only run the query if homeStayID is provided
	});
};

const Homestay = () => {
	const filters = {};

	const { data, isLoading, error } = useQuery({
		queryKey: ['homeStays', filters],
		queryFn: () => getAllHomeStay(filters),
	});

	const [selectedHomeStayID, setSelectedHomeStayID] = useState(null); // To store selected home stay ID
	const [isDialogOpen, setIsDialogOpen] = useState(false); // To control the dialog visibility

	// Fetch the details of the selected home stay
	const {
		data: homeStayDetail,
		isLoading: isDetailLoading,
		error: detailError,
	} = useHomeStayDetail(selectedHomeStayID);

	const handleViewDetail = (homeStayID) => {
		setSelectedHomeStayID(homeStayID); // Set the ID to fetch the detail
		setIsDialogOpen(true); // Open the dialog
	};

	if (isLoading) return <ManagerLayout>Loading...</ManagerLayout>;
	if (error) return <ManagerLayout>Error: {error.message}</ManagerLayout>;

	const homestay = data.Data;
	const homestayDetail = homeStayDetail?.Data;

	const currentDate = new Date().toISOString().slice(0, 10);

	const getPriceForToday = (calendar) => {
		const todayPrice = calendar?.find((item) => item.date.slice(0, 10) === currentDate);
		return todayPrice ? todayPrice.price : null;
	};

	return (
		<ManagerLayout>
			<h1 className='mb-4 text-2xl font-bold'>Homestay List</h1>
			<div className='grid grid-cols-1 gap-6 overflow-x-hidden sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
				{homestay?.map((homeStay) => {
					const priceForToday = getPriceForToday(homeStay.calendar);

					return (
						<div
							key={homeStay.id}
							className='group [perspective:1000px] w-full h-[350px] overflow-y-hidden overflow-x-hidden'
						>
							<div className='relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]'>
								<div className='absolute w-full h-full backface-hidden [backface-visibility:hidden]'>
									<img
										src={homeStay?.mainImage}
										className='object-cover w-full h-full rounded-lg shadow-lg cursor-pointer'
									/>
									<div className='absolute top-3 right-3'>
										<span className='text-[1.2rem] [text-shadow:2px_2px_4px_rgba(0,0,0,0.9)] font-bold text-white'>
											{homeStay?.openIn}
										</span>
									</div>
									<div className='text-[1.5rem] [text-shadow:2px_2px_4px_rgba(0,0,0,0.9)] font-bold text-white absolute bottom-5 left-5 flex justify-center items-center flex-col'>
										<h2 className='text-[1.5rem] [text-shadow:2px_2px_4px_rgba(0,0,0,0.9)] font-bold text-white '>
											{homeStay.name}
										</h2>
										<p className='flex items-center'>
											{[...Array(5)].map((_, index) => (
												<svg
													key={index}
													className={`w-5 h-5 ${
														homeStay.standar > index ? 'text-yellow-500' : 'text-gray-300'
													}`}
													fill='currentColor'
													xmlns='http://www.w3.org/2000/svg'
													viewBox='0 0 20 20'
												>
													<path d='M10 15l-5.09 3.09 1.64-6.88L0 6.91l6.91-.59L10 0l2.09 6.32 6.91.59-4.55 4.3 1.64 6.88L10 15z' />
												</svg>
											))}
										</p>
									</div>
								</div>

								<div className='absolute w-full h-full bg-white rounded-lg shadow-lg [transform:rotateY(180deg)] [backface-visibility:hidden] p-4 flex flex-col gap-2'>
									<h2 className='text-[1.2rem] font-semibold text-gray-800'>{homeStay.name}</h2>
									<p className='text-gray-600 line-clamp-1'>
										{homeStay.address}, {homeStay.city}
									</p>
									<p className='text-gray-600'>
										<strong>Check-In:</strong> {homeStay.checkInTime}
									</p>
									<p className='text-gray-600'>
										<strong>Check-Out:</strong> {homeStay.checkOutTime}
									</p>
									<div>
										<strong>Price for Today:</strong>
										{priceForToday !== null ? (
											<p className='text-xl text-green-600'>${priceForToday}</p>
										) : (
											<p className='text-red-500'>Decommission</p>
										)}
									</div>
									<p className='text-gray-600 line-clamp-2'>
										<strong>Description:</strong> {homeStay?.description}
									</p>
									<Button onClick={() => handleViewDetail(homeStay.id)}>View Detail</Button>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{/* ShadCN UI Dialog for displaying the details */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogTrigger />
				<DialogContent className='h-full overflow-y-auto'>
					{isDetailLoading ? (
						<p className='w-full h-full'>Loading...</p>
					) : detailError ? (
						<p>Error fetching details</p>
					) : (
						<>
							<DialogHeader>
								<DialogTitle>{homestayDetail?.name}</DialogTitle>
								<DialogDescription>{homestayDetail?.description}</DialogDescription>
							</DialogHeader>
							<div>
								<img src={homestayDetail?.mainImage} className='w-full' alt='detail-image' />
							</div>
							<div className='space-y-4'>
								<p>
									<strong>Address:</strong> {homestayDetail?.address}
								</p>
								<p>
									<strong>City:</strong> {homestayDetail?.city}
								</p>
								<p>
									<strong>Check-In:</strong> {homestayDetail?.checkInTime}
								</p>
								<p>
									<strong>Check-Out:</strong> {homestayDetail?.checkOutTime}
								</p>
								<div className='flex items-center gap-1'>
									<strong>Price for Today:</strong>
									{getPriceForToday(homestayDetail?.calendar) !== null ? (
										<p className='text-xl text-green-600'>
											${getPriceForToday(homestayDetail?.calendar)}
										</p>
									) : (
										<p className='text-red-500'>Decommission</p>
									)}
								</div>
							</div>
							<DialogFooter>
								<Button onClick={() => setIsDialogOpen(false)}>Close</Button>
							</DialogFooter>
						</>
					)}
				</DialogContent>
			</Dialog>
		</ManagerLayout>
	);
};

export default Homestay;
