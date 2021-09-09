// LIBRARIES
import { Container, Stack, Typography, Divider, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import Chart from 'react-apexcharts';

// CONTEXTS
import { useContext, useState, useEffect } from 'react';
import { UserInformationContext } from '../../context/userInformationContext';

// SERVICES
import { getDialHistory } from '../../services/recordsHoursService';

// FUNCTIONS
import { getPeriods } from '../../utils/getPeriods';
import { generateKey } from '../../utils/generateKey';

// MODELS
import { IDialHistory } from '../../shared/models/IDialHistory';
import { ITotalOvertime } from '../../shared/models/ITotalOvertime';

// COMPONENTS
import { LoadingComponent } from "../../components/LoadingComponent";
import { FatherRow } from "./components/FatherRow";



const totalOvertimeInit: ITotalOvertime = {
	"50": 0,
	"100": 0,
}

export const Reports = () => {
	const { ctx: userInformation } = useContext(UserInformationContext)!;
	const [ data, setData ] = useState<JSX.Element[]>([]);
	const [ isLoading, setIsLoading ] = useState<boolean>(false);

	const updateDataState = (state: JSX.Element[], record: JSX.Element) => {
		const stateNew = [ ...state, record ];
		stateNew.sort((a, b) => {
			const monthA = Number(a.props.periodName.split('_')[ 0 ]);
			const monthB = Number(b.props.periodName.split('_')[ 0 ]);

			if (monthA > monthB) return 1;
			if (monthA < monthB) return -1;
			return 0;
		});

		return stateNew;
	};

	const initComponent = async () => {
		const dialHistory = await getDialHistory(userInformation.uid);
		const period = await getPeriods(dialHistory);

		for (const periodName in period) {
			const totalOvertime = period[ periodName ].reduce<ITotalOvertime>((prev, recordHour) => {
				recordHour.overtimeType === 0
					? prev[ 50 ] += recordHour.overtimeQuant
					: prev[ 100 ] += recordHour.overtimeQuant;

				return prev;
			}, totalOvertimeInit);
			const record = <FatherRow key={generateKey()} dialHistory={period[ periodName ]} periodName={periodName} totalOvertime={{ ...totalOvertime }} />;

			setData(state => updateDataState(state, record));
		}
		setIsLoading(false);
	};

	useEffect(() => { 
		setIsLoading(true);
		if ( userInformation.uid === "") return;
		(async () => await initComponent())()
	 // eslint-disable-next-line react-hooks/exhaustive-deps
	 }, [ userInformation.uid ]);

	return (
		<Container className='main-container'>
			<Stack spacing={3}>
				<Typography variant="h4">Resumen</Typography>
				<Divider />
				<TableContainer className="white">
					<Table stickyHeader size="small">
						<TableHead>
							<TableRow>
								<TableCell colSpan={3} rowSpan={2} align={'center'}>Período</TableCell>
								<TableCell colSpan={6} align={'center'}>Horas</TableCell>
							</TableRow>
							<TableRow>
								<TableCell colSpan={3} align={'center'}>50%</TableCell>
								<TableCell colSpan={2} align={'left'}>100%</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data !== null && data.map((row: any) => row)}
						</TableBody>
					</Table>
				</TableContainer>

			</Stack>

			{/* <Chart className='graph-responsiv' options={state.options} series={state.series} type='bar' width='500' /> */}
			<LoadingComponent isLoading={isLoading} />

		</Container>
	);
};