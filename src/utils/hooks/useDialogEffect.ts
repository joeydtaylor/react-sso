import { useEffect } from "react";
import { hideResponsiveDialog } from "../../store/reducers/responsiveDialogSlice";
import { RootState } from "../../store/store";
import useAppDispatch from "./useAppDispatch";
import useAppSelector from "./useAppSelector";

const useDialogEffect = (confirm: any, reject?: any) => {
  const {
    responsiveDialogConfirmed,
    responsiveDialogRejected,
    responsiveDialogOpen,
  }: Application.IResponsiveDialogState = useAppSelector(
    (state: RootState) => state.responsiveDialog
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (responsiveDialogConfirmed === true && responsiveDialogOpen === false) {
      dispatch(hideResponsiveDialog());
      Promise.all([confirm()]);
    }
    if (responsiveDialogRejected === true && responsiveDialogOpen === false) {
      dispatch(hideResponsiveDialog());
      Promise.all([reject()]);
    }
  }, [
    dispatch,
    responsiveDialogConfirmed,
    responsiveDialogRejected,
    responsiveDialogOpen,
    confirm,
    reject,
  ]);
};

export default useDialogEffect;
