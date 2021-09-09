import { Backdrop } from "@material-ui/core";

import { LoadingIcon } from "./LoadingIcon";

interface ILoadingComponent {
  isLoading: boolean;
}

export const LoadingComponent = ({isLoading}: ILoadingComponent) => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
      <LoadingIcon />
    </Backdrop>
  )
}