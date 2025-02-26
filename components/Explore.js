import { useQuery } from '@tanstack/react-query';
import { getAllFacility } from 'pages/api/facility/getFacility';

const Explore = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['facilities'],
		queryFn: getAllFacility,
	});

	const facility = data?.slice(0, 8);

	return (
		<section className='sec-com'>
			<div className='container-lg'>
				<h2 className='text-2xl font-bold mb-4'>Facility nearby</h2>
				<div className='grid grid-cols-4 gap-4'>
					{facility?.map((item, index) => (
						<div
							key={index}
							className='flex items-center rounded-xl cursor-pointer transition-all hover:bg-white hover:shadow-md'
						>
							<div className='p-3 border shadow-md rounded-md'>
								<h3 className='text-lg font-semibold'>{item.name}</h3>
								<p className='text-gray-500 line-clamp-1'>{item.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Explore;
