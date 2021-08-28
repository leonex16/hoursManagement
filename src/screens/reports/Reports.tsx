// LIBRARIES
import { Container } from '@material-ui/core';
import Chart from 'react-apexcharts';

// CONTEXTS
import { useContext, useEffect } from 'react';
import { UserInformationContext } from '../../context/userInformationContext';

// SERVICES
import { getDialHistory } from '../../services/recordsHoursService';

export const Reports = () => {
	const { ctx: userInformation } = useContext(UserInformationContext)!;

	// useEffect(() => {
	// 	getDialHistory(userInformation.uid).then(console.log);
	// }, []);

	return (
		<Container className='red'>
			<Chart className='graph-responsiv' options={state.options} series={state.series} type='bar' width='500' />
		</Container>
	);
};
var state = {
	options: {
		chart: {
			id: 'basic-bar',
			width: '100%',
			height: 380,
		},
		xaxis: {
			categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
		},
	},
	series: [
		{
			name: 'series-1',
			data: [30, 40, 45, 50, 49, 60, 70, 91],
		},
	],
	responsive: [
		{
			breakpoint: 1000,
			options: {
				plotOptions: {
					bar: {
						horizontal: true,
					},
				},
				legend: {
					position: 'bottom',
				},
			},
		},
	],
};
var data = [
	{
		overtimeQuant: 2,
		checkIn: {
			seconds: 1629370800,
			nanoseconds: 0,
		},
		overtimeType: 0,
		checkOut: {
			seconds: 1629405000,
			nanoseconds: 0,
		},
		shiftType: 0,
	},
	{
		overtimeQuant: 4,
		checkOut: {
			seconds: 1629412200,
			nanoseconds: 0,
		},
		shiftType: 0,
		overtimeType: 0,
		checkIn: {
			seconds: 1629370800,
			nanoseconds: 0,
		},
	},
	{
		checkIn: {
			seconds: 1629370800,
			nanoseconds: 0,
		},
		overtimeQuant: 3,
		checkOut: {
			seconds: 1629408600,
			nanoseconds: 0,
		},
		shiftType: 0,
		overtimeType: 0,
	},
	{
		checkOut: '2021/08/19 16:30:00',
		checkIn: {
			seconds: 1629370800,
			nanoseconds: 0,
		},
		overtimeType: 0,
		overtimeQuant: 2,
		shiftType: 0,
	},
	{
		shiftType: 0,
		overtimeType: 1,
		overtimeQuant: 7,
		checkIn: {
			seconds: 1629370800,
			nanoseconds: 0,
		},
		checkOut: {
			seconds: 1629423000,
			nanoseconds: 0,
		},
	},
	{
		checkOut: {
			seconds: 1629405000,
			nanoseconds: 0,
		},
		overtimeType: 0,
		shiftType: 0,
		overtimeQuant: 2,
		checkIn: {
			seconds: 1629370800,
			nanoseconds: 0,
		},
	},
	{
		checkOut: {
			seconds: 1629401400,
			nanoseconds: 0,
		},
		checkIn: {
			seconds: 1629370800,
			nanoseconds: 0,
		},
		overtimeQuant: 1,
		shiftType: 0,
		overtimeType: 0,
	},
	{
		shiftType: 0,
		overtimeQuant: 7,
		checkOut: {
			seconds: 1629423000,
			nanoseconds: 0,
		},
		checkIn: {
			seconds: 1629370800,
			nanoseconds: 0,
		},
		overtimeType: 1,
	},
	{
		overtimeQuant: 1,
		checkIn: {
			seconds: 1629370800,
			nanoseconds: 0,
		},
		checkOut: {
			seconds: 1629401400,
			nanoseconds: 0,
		},
		overtimeType: 0,
		shiftType: 0,
	},
];
