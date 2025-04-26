import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './components/ui/dropdown-menu';
import { Button } from './components/ui/button';

const LanguageSwitcher = () => {
	const router = useRouter();
	const { pathname, asPath, query } = router;
	const [mounted, setMounted] = useState(false);

	// Set mounted to true on client side
	useEffect(() => {
		setMounted(true);
	}, []);

	// Array of available languages
	const languages = [
		{ locale: 'en', name: 'English' },
		{ locale: 'vi', name: 'Tiếng Việt' },
	];

	// Get current language name
	const getCurrentLanguageName = () => {
		const currentLocale = router.locale || 'en';
		const language = languages.find((lang) => lang.locale === currentLocale);
		return language ? language.name : 'English';
	};

	// Change language handler
	const handleLanguageChange = (locale) => {
		// Do not use router.push as it triggers a full page reload
		document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
		router.push({ pathname, query }, asPath, { locale, scroll: false });
	};

	// Skip rendering if component is not mounted yet (prevents hydration errors)
	if (!mounted) return <div className='w-8 h-8'></div>;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='sm' className='flex items-center gap-1 px-2'>
					<Globe className='w-4 h-4' />
					<span className='hidden md:inline-block'>{getCurrentLanguageName()}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				{languages.map((language) => (
					<DropdownMenuItem
						key={language.locale}
						className={`cursor-pointer ${
							router.locale === language.locale ? 'bg-blue-50 text-blue-600' : ''
						}`}
						onClick={() => handleLanguageChange(language.locale)}
					>
						{language.name}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default LanguageSwitcher;
