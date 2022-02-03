import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons/";
import { Avatar, CssBaseline, Container, Fade } from "@material-ui/core";

import useStyles from "./useStyles";
import LoginForm from "./LoginForm";

const Login: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Fade in={true} timeout={{ enter: 2000 }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon className={classes.lockIcon} />
          </Avatar>
          <LoginForm />
        </div>
      </Container>
    </Fade>
  );
};

export default Login;
