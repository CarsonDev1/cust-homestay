import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, User, Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import MobileNav from './MobileNav';
import { useAuth } from 'context/AuthProvider';
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './components/ui/dropdown-menu';
import { Button } from './components/ui/button';

const Header = ({ placeholder }) => {
	const router = useRouter();
	const { dataProfile, logout } = useAuth();
	const [location, setLocation] = useState('');
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!location.trim()) return;
		router.push(`/search?location=${location.trim()}`);
		setLocation('');
	};

	return (
		<header
			className={`fixed top-0 w-full z-50 transition-all duration-300 py-4 ${
				scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
			}`}
		>
			<div className='container-lg flex justify-between items-center'>
				<div className='flex items-center cursor-pointer gap-2' onClick={() => router.push('/')}>
					<Image
						src='/images/logo.jpg'
						alt='logo'
						width={40}
						height={40}
						className='rounded-full shadow-md'
					/>
				</div>

				<nav
					className={`hidden md:flex space-x-8 text-sm font-medium ${
						scrolled ? 'text-gray-600' : 'text-white'
					}`}
				>
					<Link href='#' className='hover:text-pink-500 transition-colors'>
						Places to stay
					</Link>
					<Link href='/home-stay' className='hover:text-pink-500 transition-colors'>
						Experiences
					</Link>
					<Link href='#' className='hover:text-pink-500 transition-colors'>
						Online Experiences
					</Link>
				</nav>

				<div className='flex items-center gap-3'>
					<ThemeToggle />
					{dataProfile ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<div
									className={`flex items-center gap-2 px-3 py-2 rounded-full border cursor-pointer hover:bg-gray-100 ${
										scrolled ? 'text-slate-600' : 'text-white hover:text-slate-600'
									}`}
								>
									<Menu className='w-4 h-4' />
									{dataProfile.avatar ? (
										<Image
											src={dataProfile.avatar}
											alt='avatar'
											width={32}
											height={32}
											className='rounded-full'
										/>
									) : (
										<User className='w-5 h-5' />
									)}
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent className='w-44'>
								<DropdownMenuItem onClick={() => router.push('/profile')}>Profile</DropdownMenuItem>
								<DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Link href='/auth/register'>
							<Button variant='outline' size='sm'>
								Login/Register
							</Button>
						</Link>
					)}

					<Sheet>
						<SheetTrigger asChild>
							<Button variant='ghost' size='icon' className='md:hidden'>
								<Menu className='w-5 h-5 text-gray-600' />
							</Button>
						</SheetTrigger>
						<SheetContent side='left'>
							<MobileNav />
						</SheetContent>
					</Sheet>
				</div>
			</div>

			<form
				onSubmit={handleSubmit}
				className='max-w-lg mx-auto mt-4 flex items-center gap-2 rounded-full border shadow-md px-4 py-2 bg-white md:hidden'
			>
				<input
					type='text'
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					placeholder={placeholder || 'Where are you going?'}
					className='flex-1 text-sm outline-none placeholder-gray-400'
				/>
				<Button type='submit' size='icon' variant='ghost' disabled={!location.trim()}>
					<Search className='w-5 h-5 text-pink-500' />
				</Button>
			</form>
		</header>
	);
};

export default Header;
