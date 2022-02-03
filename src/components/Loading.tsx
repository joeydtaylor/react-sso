import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Box, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: "flex",
      alignSelf: "center",
      justifyContent: "center",
      background: theme.palette.background.paper,
    },
    circle: {
      strokeLinecap: "round",
    },
  })
);

const Loading: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box>
        <Box sx={{ p: [4, 6, 8], m: 12 }}>
          <CircularProgress
            variant="indeterminate"
            color="primary"
            classes={{
              circle: classes.circle,
            }}
            size={125}
            thickness={5}
          ></CircularProgress>
        </Box>
      </Box>
    </div>
  );
};

export default Loading;
