'use client';

import { CalendarIcon, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
import { Input } from './components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover';
import { Button } from './components/ui/button';
import { cn } from './lib/utils';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function SearchForm() {
	const [range, setRange] = useState({ from: undefined, to: undefined });

	return (
		<div className='w-full'>
			<div className='bg-white rounded-lg border-2 border-red-500 p-4 flex flex-col md:flex-row gap-4'>
				{/* Location */}
				<div className='flex-1 relative'>
					<MapPin className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
					<Input type='text' placeholder='Where are you going?' className='pl-10 h-12 border-gray-300' />
				</div>

				{/* Date Range Picker */}
				<div className='flex-1'>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant='outline'
								className={cn(
									'w-full justify-start text-left h-12 font-normal border-gray-300',
									!range?.from && 'text-muted-foreground'
								)}
							>
								<CalendarIcon className='mr-2 h-5 w-5' />
								{range?.from ? (
									range.to ? (
										<>
											{format(range.from, 'dd/MM/yyyy')} - {format(range.to, 'dd/MM/yyyy')}
										</>
									) : (
										format(range.from, 'dd/MM/yyyy')
									)
								) : (
									'Select dates'
								)}
							</Button>
						</PopoverTrigger>

						<PopoverContent className='w-auto p-4' align='start'>
							<DayPicker
								mode='range'
								selected={range}
								onSelect={setRange}
								numberOfMonths={2}
								weekStartsOn={1}
								disabled={{ before: new Date() }}
								className='flex gap-4'
								styles={{
									caption: { fontWeight: 'bold' },
									head: { fontSize: '0.9rem', color: '#6B7282' },
									day: { height: '2.25rem', width: '2.25rem' },
								}}
							/>
						</PopoverContent>
					</Popover>
				</div>

				{/* Guests */}
				<div className='flex-1'>
					<Button
						variant='outline'
						className='w-full justify-start h-12 font-normal text-gray-600 border-gray-300'
					>
						<Users className='mr-2 h-5 w-5' />
						<span>1 adult • 0 children • 1 room</span>
					</Button>
				</div>

				{/* Search Button */}
				<Button className='h-12 px-8 bg-[#006CE4] hover:bg-[#006CE4]/90 text-white font-medium'>Search</Button>
			</div>
		</div>
	);
}
