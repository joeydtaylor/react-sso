import React, { useCallback } from "react";
import { shallowEqual } from "react-redux";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { hideSnackbar } from "src/store/reducers/snackbarSlice";
import { RootState } from "src/store/store";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

const CustomizedSnackbars: React.FunctionComponent = React.memo(() => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const snackbar: Application.ISnackbarState = useAppSelector(
    (state: RootState) => state.snackbar,
    shallowEqual
  );
  const {
    snackbarOpen,
    snackbarType,
    snackbarMessage,
    vertical,
    horizontal,
  } = snackbar;

  const handleClose = useCallback((): void => {
    dispatch(hideSnackbar());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={snackbarType}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
});

export default CustomizedSnackbars;
