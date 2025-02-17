'use client';

import { useEffect, useState } from 'react';
import ManagerLayout from '../layout';
import { toast } from 'react-toastify';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/components/ui/card';
import { Label } from '@/components/components/ui/label';
import { Input } from '@/components/components/ui/input';
import { Button } from '@/components/components/ui/button';
import { useAuth } from 'context/AuthProvider';
import { Textarea } from '@/components/components/ui/textarea';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { updateProfile } from 'api/auth/updateProfile';

export default function ProfilePage() {
	const { dataProfile } = useAuth();
	const queryClient = useQueryClient();

	const [profile, setProfile] = useState({
		fullName: '',
		email: '',
		phone: '',
		address: '',
		roleId: '',
	});

	useEffect(() => {
		if (dataProfile) {
			setProfile({
				fullName: dataProfile.fullName || '',
				email: dataProfile.email || '',
				phone: dataProfile.phone || '',
				address: dataProfile.address || '',
				roleId: dataProfile.roleId || '',
			});
		}
	}, [dataProfile]);

	const [passwords, setPasswords] = useState({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	});

	const [isEditing, setIsEditing] = useState(false);

	const {
		mutate: mutateUpdateProfile,
		isLoading,
		isError,
		error,
	} = useMutation({
		mutationFn: async (profileData) => {
			const response = await updateProfile(dataProfile.id, profileData);
			return response;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['dataProfile'] });
			Swal.fire({
				title: 'Success!',
				text: 'Profile updated successfully.',
				icon: 'success',
				confirmButtonText: 'OK',
			});
			setIsEditing(false);
		},
		onError: (error) => {
			console.error('Error updating profile:', error);
			Swal.fire({
				title: 'Error!',
				text: 'There was an error updating your profile.',
				icon: 'error',
				confirmButtonText: 'OK',
			});
		},
	});

	const handleProfileChange = (e) => {
		setProfile({ ...profile, [e.target.name]: e.target.value });
	};

	const handlePasswordChange = (e) => {
		setPasswords({ ...passwords, [e.target.name]: e.target.value });
	};

	const handleProfileSubmit = (e) => {
		e.preventDefault();

		if (!isEditing) {
			setIsEditing(true);
			return;
		}

		// Call the mutate function from useMutation
		mutateUpdateProfile(profile);
	};

	const handlePasswordSubmit = (e) => {
		e.preventDefault();
		if (passwords.newPassword !== passwords.confirmPassword) {
			toast({
				title: 'Error',
				description: 'New passwords do not match.',
				variant: 'destructive',
			});
			return;
		}
		console.log('Password changed');
		toast({
			title: 'Password Changed',
			description: 'Your password has been successfully updated.',
		});
	};

	return (
		<ManagerLayout>
			<h1 className='text-2xl font-bold mb-4'>Profile</h1>
			<div className='grid gap-8 md:grid-cols-2'>
				<Card>
					<CardHeader>
						<CardTitle>Profile Information</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleProfileSubmit} className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='fullName'>Full Name</Label>
								<Input
									id='fullName'
									name='fullName'
									value={profile.fullName}
									onChange={handleProfileChange}
									disabled={!isEditing}
									required
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									name='email'
									type='email'
									value={profile.email}
									onChange={handleProfileChange}
									disabled={!isEditing}
									required
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='phone'>Phone</Label>
								<Input
									id='phone'
									name='phone'
									type='tel'
									value={profile.phone}
									onChange={handleProfileChange}
									disabled={!isEditing}
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='address'>Address</Label>
								<Textarea
									id='address'
									name='address'
									value={profile.address}
									onChange={handleProfileChange}
									disabled={!isEditing}
								/>
							</div>
							<Button type='submit' disabled={isLoading}>
								{isEditing ? 'Save Changes' : 'Update Profile'}
							</Button>
							{isError && (
								<p className='text-red-500 text-sm'>Error: {error?.message || 'Unknown error'}</p>
							)}
						</form>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Change Password</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handlePasswordSubmit} className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='currentPassword'>Current Password</Label>
								<Input
									id='currentPassword'
									name='currentPassword'
									type='password'
									value={passwords.currentPassword}
									onChange={handlePasswordChange}
									required
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='newPassword'>New Password</Label>
								<Input
									id='newPassword'
									name='newPassword'
									type='password'
									value={passwords.newPassword}
									onChange={handlePasswordChange}
									required
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='confirmPassword'>Confirm New Password</Label>
								<Input
									id='confirmPassword'
									name='confirmPassword'
									type='password'
									value={passwords.confirmPassword}
									onChange={handlePasswordChange}
									required
								/>
							</div>
							<Button type='submit'>Change Password</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</ManagerLayout>
	);
}
