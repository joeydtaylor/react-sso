import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      marginLeft: "auto",
      marginRight: "auto",
      width: "auto",
      justifyContent: "center",
      backgroundColor: theme.palette.background.paper,
      marginTop: theme.spacing(5),
    },
    button: {
      padding: theme.spacing(1),
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5),
      display: "flex",
      height: "auto",
      boxShadow: `10px 10px ${theme.palette.secondary.contrastText}`,
      border: `2px ridge ${theme.palette.secondary.contrastText}`,
    },
    image: {
      width: "auto",
      height: "auto",
      objectFit: "cover",
      padding: 1,
      paddingTop: 4,
    },
    closeIcon: {
      display: "flex",
      marginLeft: "auto",
      marginRight: "auto",
    },
    card: {
      alignItems: "center",
      justifyContent: "center",
    },
    cardContent: {
      display: "flex",
      alignItems: "center",
      marginLeft: "auto",
      marginRight: "auto",
      width: "auto",
      justifyContent: "center",
      backgroundColor: theme.palette.background.paper,
      marginTop: theme.spacing(5),
    },
  })
);

export default useStyles;
