import { useQuery } from '@tanstack/react-query';
import { getAllFacility } from 'pages/api/facility/getFacility';
import { Skeleton } from './components/ui/skeleton';
import { MapPin, Coffee, Wifi, Car, ChefHat, Home, Waves, Sofa } from 'lucide-react';

// Helper function to get appropriate icon for facility
const getFacilityIcon = (name) => {
	const lowercaseName = (name || '').toLowerCase();

	if (lowercaseName.includes('wifi')) return <Wifi className='w-5 h-5 text-blue-500' />;
	if (lowercaseName.includes('coffee') || lowercaseName.includes('cafe'))
		return <Coffee className='w-5 h-5 text-blue-500' />;
	if (lowercaseName.includes('parking') || lowercaseName.includes('car'))
		return <Car className='w-5 h-5 text-blue-500' />;
	if (lowercaseName.includes('restaurant') || lowercaseName.includes('dining'))
		return <ChefHat className='w-5 h-5 text-blue-500' />;
	if (lowercaseName.includes('sofa') || lowercaseName.includes('sofa'))
		return <Sofa className='w-5 h-5 text-blue-500' />;
	if (lowercaseName.includes('pool') || lowercaseName.includes('swim'))
		return <Waves className='w-5 h-5 text-blue-500' />;

	// Default icon
	return <Home className='w-5 h-5 text-blue-500' />;
};

const Explore = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['facilities'],
		queryFn: getAllFacility,
	});

	const facility = data?.slice(0, 8);

	return (
		<section className='py-16 bg-white'>
			<div className='container-lg'>
				<div className='mb-8 flex flex-col md:flex-row justify-between items-start md:items-center'>
					<div>
						<h2 className='text-3xl font-bold mb-2'>
							Nearby <span className='text-blue-600'>Facilities</span>
						</h2>
						<p className='text-gray-600 max-w-2xl'>
							Discover convenient amenities and attractions close to our homestays
						</p>
					</div>
				</div>

				{isLoading ? (
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
						{Array(8)
							.fill(0)
							.map((_, index) => (
								<div key={index} className='rounded-xl p-4 border border-gray-100 shadow-sm'>
									<div className='flex items-center gap-3 mb-3'>
										<Skeleton className='h-10 w-10 rounded-full' />
										<Skeleton className='h-6 w-40' />
									</div>
									<Skeleton className='h-4 w-full mb-2' />
									<Skeleton className='h-4 w-3/4' />
								</div>
							))}
					</div>
				) : error ? (
					<div className='text-center p-6 bg-red-50 rounded-lg text-red-600'>
						Something went wrong while loading facilities. Please try again.
					</div>
				) : facility?.length === 0 ? (
					<div className='text-center p-6 bg-gray-50 rounded-lg text-gray-600'>
						No facilities available at this time.
					</div>
				) : (
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
						{facility?.map((item, index) => (
							<div
								key={index}
								className='group flex flex-col p-5 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer'
							>
								<div className='flex items-center gap-3 mb-3'>
									<div className='flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors'>
										{getFacilityIcon(item.name)}
									</div>
									<h3 className='text-lg font-semibold group-hover:text-blue-600 transition-colors'>
										{item.name}
									</h3>
								</div>
								<p className='text-gray-600 text-sm line-clamp-2'>
									{item.description || 'No description available'}
								</p>
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default Explore;
