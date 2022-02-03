import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  confirmResponsiveDialog,
  hideResponsiveDialog,
  rejectResponsiveDialog,
} from "src/store/reducers/responsiveDialogSlice";
import { RootState } from "src/store/store";
import { Typography } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";

const ResponsiveDialog: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const responsiveDialog: Application.IResponsiveDialogState = useAppSelector(
    (state: RootState) => state.responsiveDialog
  );
  const {
    responsiveDialogContentText,
    responsiveDialogOpen,
    responsiveDialogPromptMessage,
    responsiveDialogRejectText,
    responsiveDialogConfirmText,
  } = responsiveDialog;

  const handleReject = (): void => {
    dispatch(rejectResponsiveDialog());
  };

  const handleConfirm = (): void => {
    dispatch(confirmResponsiveDialog());
  };

  const handleClose = (): void => {
    dispatch(hideResponsiveDialog());
  };

  return (
    <div style={{ wordWrap: "break-word" }}>
      <Dialog
        open={responsiveDialogOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth="xl"
      >
        <DialogTitle id="responsive-dialog-title">
          {responsiveDialogPromptMessage}
        </DialogTitle>
        <DialogContent>
          <Typography variant="caption">
            <pre style={{ fontFamily: "inherit" }}>
              {responsiveDialogContentText}
            </pre>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleReject} color="primary">
            {responsiveDialogRejectText}
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            {responsiveDialogConfirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ResponsiveDialog;
