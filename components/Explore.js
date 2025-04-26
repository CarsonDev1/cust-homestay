import { useQuery } from '@tanstack/react-query';
import { getAllFacility } from 'pages/api/facility/getFacility';
import { Skeleton } from './components/ui/skeleton';
import { MapPin, Coffee, Wifi, Car, ChefHat, Home, Waves, Sofa } from 'lucide-react';
import { useTranslation } from 'next-i18next';

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
	const { t } = useTranslation('common');

	const { data, isLoading, error } = useQuery({
		queryKey: ['facilities'],
		queryFn: getAllFacility,
	});

	const facility = data?.slice(0, 8);

	return (
		<section className='py-16 bg-white'>
			<div className='container-lg'>
				<div className='flex flex-col items-start justify-between mb-8 md:flex-row md:items-center'>
					<div>
						<h2 className='mb-2 text-3xl font-bold'>
							<span className='text-blue-600'>{t('facilities.facilities')}</span>
						</h2>
						<p className='max-w-2xl text-gray-600'>{t('facilities.description')}</p>
					</div>
				</div>

				{isLoading ? (
					<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
						{Array(8)
							.fill(0)
							.map((_, index) => (
								<div key={index} className='p-4 border border-gray-100 shadow-sm rounded-xl'>
									<div className='flex items-center gap-3 mb-3'>
										<Skeleton className='w-10 h-10 rounded-full' />
										<Skeleton className='w-40 h-6' />
									</div>
									<Skeleton className='w-full h-4 mb-2' />
									<Skeleton className='w-3/4 h-4' />
								</div>
							))}
					</div>
				) : error ? (
					<div className='p-6 text-center text-red-600 rounded-lg bg-red-50'>
						{t('facilities.errorLoading')}
					</div>
				) : facility?.length === 0 ? (
					<div className='p-6 text-center text-gray-600 rounded-lg bg-gray-50'>
						{t('facilities.noFacilities')}
					</div>
				) : (
					<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
						{facility?.map((item, index) => (
							<div
								key={index}
								className='flex flex-col p-5 transition-all duration-300 bg-white border border-gray-100 shadow-sm cursor-pointer group rounded-xl hover:shadow-md'
							>
								<div className='flex items-center gap-3 mb-3'>
									<div className='flex items-center justify-center w-10 h-10 transition-colors rounded-full bg-blue-50 group-hover:bg-blue-100'>
										{getFacilityIcon(item.name)}
									</div>
									<h3 className='text-lg font-semibold transition-colors group-hover:text-blue-600'>
										{item.name}
									</h3>
								</div>
								<p className='text-sm text-gray-600 line-clamp-2'>
									{item.description || t('facilities.noDescription')}
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
