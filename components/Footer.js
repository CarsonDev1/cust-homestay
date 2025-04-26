import React from 'react';
import Link from 'next/link';
import { Globe, DollarSign, Facebook, Twitter, Instagram, MapPin, Mail, Phone, ChevronRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Button } from './components/ui/button';
import { useTranslation } from 'next-i18next';

const Footer = () => {
	const { t } = useTranslation('common');
	const currentYear = new Date().getFullYear();

	return (
		<footer className='text-gray-600 bg-white border-t border-gray-100 sec-com'>
			<div className='container-lg'>
				<div className='grid grid-cols-1 gap-8 mb-8 md:grid-cols-2 lg:grid-cols-3'>
					{/* About Section */}
					<div>
						<h2 className='mb-4 text-lg font-bold text-gray-800'>{t('footer.about.title')}</h2>
						<p className='mb-4 text-sm leading-relaxed text-gray-500'>{t('footer.about.description')}</p>
						<div className='flex items-center mt-6 space-x-4'>
							<a href='#' className='text-gray-400 transition-colors hover:text-blue-600'>
								<Facebook size={20} />
							</a>
							<a href='#' className='text-gray-400 transition-colors hover:text-blue-600'>
								<Twitter size={20} />
							</a>
							<a href='#' className='text-gray-400 transition-colors hover:text-blue-600'>
								<Instagram size={20} />
							</a>
						</div>
					</div>

					{/* Useful Links */}
					<div>
						<h2 className='mb-4 text-lg font-bold text-gray-800'>{t('footer.usefulLinks.title')}</h2>
						<ul className='space-y-2'>
							<li>
								<Link
									href='/home-stay'
									className='flex items-center text-gray-500 hover:text-blue-600 group'
								>
									<ChevronRight
										size={16}
										className='mr-2 transition-opacity opacity-0 group-hover:opacity-100'
									/>
									<span>{t('footer.usefulLinks.browseHomestays')}</span>
								</Link>
							</li>
							<li>
								<Link href='#' className='flex items-center text-gray-500 hover:text-blue-600 group'>
									<ChevronRight
										size={16}
										className='mr-2 transition-opacity opacity-0 group-hover:opacity-100'
									/>
									<span>{t('footer.usefulLinks.aboutUs')}</span>
								</Link>
							</li>
							<li>
								<Link href='#' className='flex items-center text-gray-500 hover:text-blue-600 group'>
									<ChevronRight
										size={16}
										className='mr-2 transition-opacity opacity-0 group-hover:opacity-100'
									/>
									<span>{t('footer.usefulLinks.blogNews')}</span>
								</Link>
							</li>
							<li>
								<Link href='#' className='flex items-center text-gray-500 hover:text-blue-600 group'>
									<ChevronRight
										size={16}
										className='mr-2 transition-opacity opacity-0 group-hover:opacity-100'
									/>
									<span>{t('footer.usefulLinks.faqs')}</span>
								</Link>
							</li>
							<li>
								<Link href='#' className='flex items-center text-gray-500 hover:text-blue-600 group'>
									<ChevronRight
										size={16}
										className='mr-2 transition-opacity opacity-0 group-hover:opacity-100'
									/>
									<span>{t('footer.usefulLinks.privacyPolicy')}</span>
								</Link>
							</li>
							<li>
								<Link href='#' className='flex items-center text-gray-500 hover:text-blue-600 group'>
									<ChevronRight
										size={16}
										className='mr-2 transition-opacity opacity-0 group-hover:opacity-100'
									/>
									<span>{t('footer.usefulLinks.termsConditions')}</span>
								</Link>
							</li>
						</ul>
					</div>

					{/* Host Section */}
					{/* <div>
						<h2 className='mb-4 text-lg font-bold text-gray-800'>{t('footer.hostWithUs.title')}</h2>
						<ul className='space-y-2'>
							<li>
								<Link href='#' className='flex items-center text-gray-500 hover:text-blue-600 group'>
									<ChevronRight
										size={16}
										className='mr-2 transition-opacity opacity-0 group-hover:opacity-100'
									/>
									<span>{t('footer.hostWithUs.listProperty')}</span>
								</Link>
							</li>
							<li>
								<Link href='#' className='flex items-center text-gray-500 hover:text-blue-600 group'>
									<ChevronRight
										size={16}
										className='mr-2 transition-opacity opacity-0 group-hover:opacity-100'
									/>
									<span>{t('footer.hostWithUs.hostResources')}</span>
								</Link>
							</li>
							<li>
								<Link href='#' className='flex items-center text-gray-500 hover:text-blue-600 group'>
									<ChevronRight
										size={16}
										className='mr-2 transition-opacity opacity-0 group-hover:opacity-100'
									/>
									<span>{t('footer.hostWithUs.hostingGuidelines')}</span>
								</Link>
							</li>
							<li>
								<Link href='#' className='flex items-center text-gray-500 hover:text-blue-600 group'>
									<ChevronRight
										size={16}
										className='mr-2 transition-opacity opacity-0 group-hover:opacity-100'
									/>
									<span>{t('footer.hostWithUs.responsibleHosting')}</span>
								</Link>
							</li>
						</ul>
						<Button className='mt-4 bg-blue-600 hover:bg-blue-700'>
							{t('footer.hostWithUs.becomeHost')}
						</Button>
					</div> */}

					{/* Contact Section */}
					<div>
						<h2 className='mb-4 text-lg font-bold text-gray-800'>{t('footer.contactUs.title')}</h2>
						<ul className='space-y-3'>
							<li className='flex items-start'>
								<MapPin className='w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0' />
								<span className='text-gray-500'>{t('footer.contactUs.address')}</span>
							</li>
							<li className='flex items-center'>
								<Phone className='flex-shrink-0 w-5 h-5 mr-3 text-blue-600' />
								<span className='text-gray-500'>{t('footer.contactUs.phone')}</span>
							</li>
							<li className='flex items-center'>
								<Mail className='flex-shrink-0 w-5 h-5 mr-3 text-blue-600' />
								<span className='text-gray-500'>{t('footer.contactUs.email')}</span>
							</li>
						</ul>
						<div className='mt-6'>
							<h3 className='mb-2 text-sm font-semibold text-gray-800'>
								{t('footer.contactUs.newsletter')}
							</h3>
							<div className='flex'>
								<input
									type='email'
									placeholder={t('footer.contactUs.emailPlaceholder')}
									className='w-full px-3 py-2 text-sm text-gray-700 border border-gray-200 bg-gray-50 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500'
								/>
								<button className='px-3 py-2 text-white transition-colors bg-blue-600 hover:bg-blue-700 rounded-r-md'>
									{t('footer.contactUs.send')}
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Footer Bottom */}
				<div className='flex flex-col items-center justify-between pt-8 mt-8 border-t border-gray-100 md:flex-row'>
					{/* <div className='flex items-center mb-4 space-x-4 md:mb-0'>
						<ThemeToggle />
						<div className='flex items-center text-gray-500 cursor-pointer hover:text-gray-700'>
							<Globe className='w-4 h-4 mr-1' />
							<span className='text-sm'>{t('footer.language')}</span>
						</div>
						<div className='flex items-center text-gray-500 cursor-pointer hover:text-gray-700'>
							<DollarSign className='w-4 h-4 mr-1' />
							<span className='text-sm'>{t('footer.currency')}</span>
						</div>
					</div> */}

					<p className='text-sm text-gray-400'>
						&copy; {currentYear} HomeStay. {t('footer.copyright')}
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
