'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/components/ui/button';
import { Input } from '@/components/components/ui/input';
import { Label } from '@/components/components/ui/label';
import { Textarea } from '@/components/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/components/ui/card';
import OtpConfirmation from '@/components/OtpConfirmation';
import Image from 'next/image';
import Link from 'next/link';

export default function RegisterForm() {
	const [isRegistered, setIsRegistered] = useState(false);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			const response = await fetch('https://homestaybooking-001-site1.ntempurl.com/api/Auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...data,
					roleId: 1, // Adding roleId as required
				}),
			});

			if (response.ok) {
				setIsRegistered(true);
			} else {
				const errorData = await response.json();
				console.error('Registration failed:', errorData);
				alert(`Registration failed: ${errorData.message || 'Unknown error'}`);
			}
		} catch (error) {
			console.error('Error:', error);
			alert('An error occurred. Please try again later.');
		}
	};

	const password = watch('password'); // Watching password to validate confirm password

	if (isRegistered) {
		return <OtpConfirmation email={watch('email')} />;
	}

	return (
		<div className='flex justify-center items-center h-full relative bg-gray-100 p-4'>
			<Image src='/images/authen/bg-authen.jpg' fill alt='bg-authen' />
			<Card className='w-full max-w-xl relative z-50 bg-white/80'>
				<CardHeader>
					<CardTitle>Register</CardTitle>
					<CardDescription>Create your account to get started.</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit(onSubmit)}>
					<CardContent className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='fullName'>Full Name</Label>
							<Input
								id='fullName'
								{...register('fullName', { required: 'Full name is required' })}
								placeholder='John Doe'
								className='border border-black'
							/>
							{errors.fullName && <p className='text-red-500 text-sm'>{errors.fullName.message}</p>}
						</div>
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								{...register('email', {
									required: 'Email is required',
									pattern: {
										value: /\S+@\S+\.\S+/,
										message: 'Invalid email address',
									},
								})}
								placeholder='john@example.com'
								className='border border-black'
							/>
							{errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
						</div>
						<div className='space-y-2'>
							<Label htmlFor='phone'>Phone</Label>
							<Input
								id='phone'
								type='tel'
								{...register('phone', {
									required: 'Phone number is required',
									pattern: {
										value: /^0\d{9}$/,
										message: 'Invalid phone number',
									},
								})}
								placeholder='0123-456-789'
								className='border border-black'
							/>
							{errors.phone && <p className='text-red-500 text-sm'>{errors.phone.message}</p>}
						</div>
						<div className='space-y-2'>
							<Label htmlFor='address'>Address</Label>
							<Textarea
								id='address'
								{...register('address', { required: 'Address is required' })}
								placeholder='123 Main St, City, Country'
								className='border border-black'
							/>
							{errors.address && <p className='text-red-500 text-sm'>{errors.address.message}</p>}
						</div>
						<div className='space-y-2'>
							<Label htmlFor='password'>Password</Label>
							<Input
								id='password'
								type='password'
								{...register('password', {
									required: 'Password is required',
									minLength: {
										value: 8,
										message: 'Password must be at least 8 characters long',
									},
								})}
								placeholder='*******'
								className='border border-black'
							/>
							{errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
						</div>

						{/* Confirm Password Field */}
						<div className='space-y-2'>
							<Label htmlFor='confirmPassword'>Confirm Password</Label>
							<Input
								id='confirmPassword'
								type='password'
								{...register('confirmPassword', {
									required: 'Confirm Password is required',
									validate: (value) => value === password || 'Passwords do not match',
								})}
								placeholder='*******'
								className='border border-black'
							/>
							{errors.confirmPassword && (
								<p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>
							)}
						</div>

						<div className='text-center mt-4'>
							<p>
								Already have an account?{' '}
								<Link href='/auth/login'>
									<button className='text-blue-500 hover:underline'>Login</button>
								</Link>
							</p>
						</div>
					</CardContent>
					<CardFooter>
						<Button type='submit' className='w-full'>
							Register
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
