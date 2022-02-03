import { useState } from "react";
import { IconButton, Typography, ListItemIcon } from "@material-ui/core";
import {
  ExitToApp as ExitToAppIcon,
  Home as HomeIcon,
  AccountCircle as AccountCircleIcon,
} from "@material-ui/icons/";
import { logoutUser } from "src/store/reducers/userSlice";
import { useStyles, StyledMenu, StyledMenuItem } from "./useStyles";
import { useAppDispatch } from "src/utils/hooks";

const UserMenu: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <div className={classes.userMenu}>
      <IconButton
        className={classes.homeIcon}
        color="primary"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <HomeIcon />
      </IconButton>
      <IconButton
        aria-controls="account-menu"
        aria-haspopup="true"
        className={classes.accountIcon}
        edge="start"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          setAnchorEl(event.currentTarget);
        }}
        color="primary"
      >
        <AccountCircleIcon />
      </IconButton>
      <StyledMenu
        id="account-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        <StyledMenuItem
          className={classes.menuItem}
          onClick={async () => {
            await dispatch(logoutUser());
          }}
        >
          <ListItemIcon style={{ color: "inherit" }}>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <Typography
            variant="button"
            display="block"
            align="justify"
            style={{ color: "inherit" }}
          >
            Logout
          </Typography>
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
};

export default UserMenu;
