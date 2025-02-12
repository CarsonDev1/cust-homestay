'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/components/ui/button';
import { Input } from '@/components/components/ui/input';
import { Label } from '@/components/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			const response = await fetch('https://homestaybooking-001-site1.ntempurl.com/api/Auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				alert('Login successful!');
			} else {
				const errorData = await response.json();
				console.error('Login failed:', errorData);
				alert(`Login failed: ${errorData.message || 'Unknown error'}`);
			}
		} catch (error) {
			console.error('Error:', error);
			alert('An error occurred. Please try again later.');
		}
	};

	return (
		<div className='flex justify-center items-center h-dvh relative bg-gray-100 p-4'>
			<Image src='/images/authen/bg-authen.jpg' fill alt='bg-authen' />
			<Card className='w-full max-w-xl relative z-50 bg-white/80'>
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>Sign in to your account.</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit(onSubmit)}>
					<CardContent className='space-y-4'>
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
								className='border border-black'
								placeholder='john@example.com'
							/>
							{errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
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
								className='border border-black'
								placeholder='*******'
							/>
							{errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
						</div>
						<div className='text-center mt-4'>
							<p>
								Don't have an account?{' '}
								<Link href='/auth/register'>
									<button className='text-blue-500 hover:underline'>Register</button>
								</Link>
							</p>
						</div>
					</CardContent>
					<CardFooter>
						<Button type='submit' className='w-full'>
							Login
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
