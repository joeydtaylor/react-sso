import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appDrawerIcon: {
      "&:hover": {
        filter: "opacity(50%)",
        color: theme.palette.primary.main,
      },
      color: theme.palette.primary.main,
      background: "none",
    },
    labelText: {
      padding: 1,
      marginLeft: -theme.spacing(1),
    },
  })
);

export default useStyles;
