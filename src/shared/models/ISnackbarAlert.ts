export interface ISnackbarAlert {
	open: boolean;
	message: string;
	severity: 'error' | 'info' | 'success' | 'warning';
	autoHideDuration?: number;
	anchorOrigin?: {
		vertical: 'top' | 'bottom';
		horizontal: 'left' | 'center' | 'right';
	};
	onClose?: () => void;
	TransitionComponent?: (props: any) => JSX.Element;
}
