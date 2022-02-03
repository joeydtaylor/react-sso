import React from "react";
import { ListItem, ListItemIcon, Typography, Tooltip } from "@material-ui/core";
import { BubbleChart as BubbleChartIcon } from "@material-ui/icons/";
import { config } from "../../../config/config";
import useStyles from "./useStyles";

const DeveloperAppDrawer: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div>
      {process.env.NODE_ENV === "development" && (
        <div>
          <Tooltip title="GraphQL Playground" placement="bottom">
            <ListItem
              button
              dense
              onClick={() => {
                window.location.href = `${config.authenticationServiceBaseUrl}/graphql`;
              }}
            >
              <ListItemIcon>
                <BubbleChartIcon
                  color="primary"
                  className={classes.appDrawerIcon}
                />
              </ListItemIcon>
              <Typography
                color="textSecondary"
                variant="button"
                display="block"
                align="justify"
                className={classes.labelText}
              >
                GraphQL Playground
              </Typography>
            </ListItem>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default DeveloperAppDrawer;
