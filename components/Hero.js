import React from 'react';
import Link from 'next/link';
import { Button } from './components/ui/button';
import SearchForm from './SearchForm';
import { useAuth } from 'context/AuthProvider';
import { useTranslation } from 'next-i18next';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
	const { dataProfile } = useAuth();
	const { t } = useTranslation('common');

	return (
		<section
			className='relative min-h-[600px] flex flex-col justify-center overflow-hidden bg-cover bg-center'
			style={{
				backgroundImage:
					"linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('/images/hero.jpg')",
				backgroundPosition: 'center 30%',
			}}
		>
			<div className='absolute inset-0 bg-blue-900/20 mix-blend-multiply'></div>

			<div className='z-10 flex flex-col gap-10 py-16 container-lg'>
				<div className='flex flex-col max-w-3xl gap-5 text-white'>
					<h1 className='font-extrabold text-[clamp(2.5rem,6vw,3rem)] leading-tight tracking-tight'>
						{t('hero.title')}
						<span className='block text-blue-300'>HomeStays</span>
					</h1>
					<p className='max-w-lg text-lg font-light text-gray-100'>{t('hero.subtitle')}</p>

					{!dataProfile && (
						<div className='flex flex-wrap gap-3 mt-2'>
							<Link href='/auth/register'>
								<Button size='lg' className='px-6 font-medium text-white bg-blue-600 hover:bg-blue-700'>
									{t('register')}
								</Button>
							</Link>
							<Link href='/auth/login'>
								<Button
									size='lg'
									variant='ghost'
									className='px-6 font-medium text-white border-white hover:bg-opacity-0 hover:text-white'
								>
									{t('login')}
								</Button>
							</Link>
						</div>
					)}

					{dataProfile && (
						<Link href='/home-stay' className='group w-fit'>
							<Button
								size='lg'
								className='px-6 font-medium text-white border border-white hover:bg-white/10'
							>
								{t('hero.cta')}
								<ChevronRight className='w-4 h-4 ml-1 transition-transform group-hover:translate-x-1' />
							</Button>
						</Link>
					)}
				</div>

				{/* <div className='w-full max-w-4xl mx-auto mt-4'>
					<SearchForm />
				</div> */}
			</div>
		</section>
	);
};

export default Hero;
