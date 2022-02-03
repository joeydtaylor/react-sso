import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "absolute",
      left: "50%",
      top: "20%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      caretColor: "transparent",
    },
    multilineColor: {
      color: theme.palette.background.paper,
      fontFamily: theme.typography.fontFamily,
    },
    loginText: {
      color: theme.palette.primary.main,
      fontFamily: theme.typography.fontFamily,
      border: `1px solid ${theme.palette.primary.main}`,
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: "50%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    tooltip: {
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(1, 0, 0),
      backgroundColor: theme.palette.primary.main,
    },
    lockIcon: {
      color: theme.palette.background.paper,
    },
  })
);

export default useStyles;
