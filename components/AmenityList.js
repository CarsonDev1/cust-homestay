import { useQuery } from '@tanstack/react-query';
import { getAllAmenity } from 'pages/api/amenity/getAmenity';
import React from 'react';
import { Wifi, Waves, Wind, Coffee, Check } from 'lucide-react';
import { Skeleton } from './components/ui/skeleton';
import { Button } from './components/ui/button';
import { useTranslation } from 'next-i18next';

// Helper function to get appropriate icon for amenity
const getAmenityIcon = (name) => {
	const lowercaseName = (name || '').toLowerCase();

	if (lowercaseName.includes('wifi')) return <Wifi className='w-6 h-6 text-blue-500 lg:w-8 lg:h-8' />;

	if (lowercaseName.includes('pool') || lowercaseName.includes('swim'))
		return <Waves className='w-6 h-6 text-blue-500 lg:w-8 lg:h-8' />;

	if (lowercaseName.includes('air') || lowercaseName.includes('condition'))
		return <Wind className='w-6 h-6 text-blue-500 lg:w-8 lg:h-8' />;

	if (lowercaseName.includes('breakfast') || lowercaseName.includes('coffee'))
		return <Coffee className='w-6 h-6 text-blue-500 lg:w-8 lg:h-8' />;

	// Default icon
	return <Check className='w-6 h-6 text-blue-500 lg:w-8 lg:h-8' />;
};

// Helper function to get gradient colors based on amenity name
const getGradientColors = (name) => {
	const lowercaseName = (name || '').toLowerCase();

	if (lowercaseName.includes('wifi'))
		return 'from-blue-50 to-indigo-50 group-hover:from-blue-100 group-hover:to-indigo-100';

	if (lowercaseName.includes('pool') || lowercaseName.includes('swim'))
		return 'from-cyan-50 to-blue-50 group-hover:from-cyan-100 group-hover:to-blue-100';

	if (lowercaseName.includes('air') || lowercaseName.includes('condition'))
		return 'from-sky-50 to-blue-50 group-hover:from-sky-100 group-hover:to-blue-100';

	if (lowercaseName.includes('breakfast') || lowercaseName.includes('coffee'))
		return 'from-amber-50 to-orange-50 group-hover:from-amber-100 group-hover:to-orange-100';

	if (lowercaseName.includes('free'))
		return 'from-emerald-50 to-teal-50 group-hover:from-emerald-100 group-hover:to-teal-100';

	// Default gradient
	return 'from-gray-50 to-slate-50 group-hover:from-gray-100 group-hover:to-slate-100';
};

const AmenityList = () => {
	const { t } = useTranslation('common');

	const { data, isLoading, error } = useQuery({
		queryKey: ['amenity'],
		queryFn: getAllAmenity,
	});

	return (
		<section className='bg-white sec-com'>
			<div className='container-lg'>
				<div className='mb-8 text-center'>
					<h2 className='mb-2 text-3xl font-bold'>
						{t('amenities.popular')} <span className='text-blue-600'>{t('amenities.amenities')}</span>
					</h2>
					<p className='max-w-2xl mx-auto text-gray-600'>{t('amenities.description')}</p>
				</div>

				{isLoading ? (
					<div className='grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5'>
						{[1, 2, 3, 4, 5].map((item) => (
							<div key={item} className='flex flex-col items-center'>
								<Skeleton className='w-24 h-24 mb-4 rounded-full md:h-32 md:w-32' />
								<Skeleton className='w-32 h-6 mb-2' />
								<Skeleton className='w-24 h-4' />
							</div>
						))}
					</div>
				) : error ? (
					<div className='p-6 text-center text-red-600 rounded-lg bg-red-50'>
						{t('amenities.errorLoading')}
					</div>
				) : !data?.length ? (
					<div className='p-6 text-center text-gray-600 rounded-lg bg-gray-50'>
						{t('amenities.noAmenities')}
					</div>
				) : (
					<div className='grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5 lg:gap-8'>
						{data.map((amenity) => (
							<div
								key={amenity.id}
								className='flex flex-col items-center text-center cursor-pointer group'
							>
								<div
									className={`w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${getGradientColors(
										amenity.name
									)} flex items-center justify-center mb-4 shadow-sm group-hover:shadow transition-all duration-300`}
								>
									{getAmenityIcon(amenity.name)}
								</div>
								<h3 className='mb-1 text-lg font-semibold transition-colors group-hover:text-blue-600'>
									{amenity.name}
								</h3>
								<p className='text-sm text-gray-500'>{t('amenities.availableIn')}</p>
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default AmenityList;
