import React from "react";
import useStyles from "./useStyles";
import { IconButton, Typography, Tooltip } from "@material-ui/core";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import { GridSelectionModel } from "@mui/x-data-grid";
import { DeleteOutlineRounded, SaveAltOutlined } from "@material-ui/icons";

export interface ActionBarProps {
  children?: React.Component;
  rows?: any;
  selectedRows?: GridSelectionModel;
  onBulkSave?: any;
  onBulkDelete?: any;
  resetRows?: any;
  component?: any;
  rest?: any;
}

const ActionBar: React.FunctionComponent<ActionBarProps> = React.memo(
  ({
    component: Component,
    rows,
    selectedRows,
    onBulkSave,
    onBulkDelete,
    resetRows,
    ...rest
  }: any) => {
    const classes = useStyles();

    let selectedObjects = selectedRows.map((selectedId: string) => {
      return rows.find(({ id }: any) => id === selectedId);
    });

    return (
      <div className={classes.actionBar}>
        <Tooltip title="Clear All Selections">
          <IconButton
            color="primary"
            onClick={async () => {
              resetRows();
            }}
          >
            <ClearAllIcon />
            <Typography variant="subtitle2" color="primary">
              Clear All Selections
            </Typography>
          </IconButton>
        </Tooltip>
        <Tooltip title="Save All Selections">
          <IconButton
            style={{ marginTop: -3 }}
            color="primary"
            onClick={async () => {
              onBulkSave(selectedObjects);
            }}
          >
            <SaveAltOutlined />
            <Typography
              variant="subtitle2"
              style={{ marginTop: 2 }}
              color="primary"
            >
              Save All Selections
            </Typography>
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete All Selections">
          <IconButton
            style={{ marginTop: -3 }}
            color="primary"
            onClick={async () => {
              onBulkDelete(selectedObjects);
            }}
          >
            <DeleteOutlineRounded />
            <Typography
              variant="subtitle2"
              style={{ marginTop: 2 }}
              color="primary"
            >
              Delete All Selections
            </Typography>
          </IconButton>
        </Tooltip>
        {Component ? (
          <Component selectedObjects={selectedObjects} {...rest} />
        ) : (
          <></>
        )}
      </div>
    );
  }
);

export default ActionBar;
