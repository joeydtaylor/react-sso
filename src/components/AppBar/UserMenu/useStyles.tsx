import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import { Menu, MenuItem, MenuProps } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    userMenu: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignContent: "center",
    },
    accountIcon: {
      marginRight: theme.spacing(3),
      marginLeft: theme.spacing(1),
      display: "flex",
      width: "5%",
      color: theme.palette.background.paper,
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        opacity: "50%",
      },
    },
    homeIcon: {
      display: "flex",
      width: "5%",
      color: theme.palette.background.paper,
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        opacity: "50%",
      },
    },
    menuItem: {
      "&:hover": {
        color: theme.palette.background.paper,
      },
      color: theme.palette.primary.main,
    },
  })
);

export const StyledMenu = withStyles((theme: Theme) => ({
  paper: {
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2),
  },
}))((props: MenuProps) => (
  <Menu
    elevation={10}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

export const StyledMenuItem = withStyles((theme: Theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default useStyles;
