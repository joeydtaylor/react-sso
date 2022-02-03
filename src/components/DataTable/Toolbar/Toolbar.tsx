import React, { useState } from "react";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { QuickSearch, QuickSearchProps } from "./QuickSearch";
import useStyles from "../useStyles";

import { IconButton, Tooltip, Typography } from "@material-ui/core";
import { LockOpenOutlined, LockOutlined } from "@material-ui/icons";

export interface ToolbarProps extends QuickSearchProps {
  exportAvailable: boolean;
  columnChangeAvailable: boolean;
  filterAvailable: boolean;
  searchAvailable: boolean;
  densityAvailable: boolean;
  tableLockingAvailable: boolean;
  lockTable: Function;
  resetRows: Function;
}

export const TableToolbar: React.FunctionComponent<ToolbarProps> = React.memo(
  (props: ToolbarProps) => {
    const classes = useStyles();
    const [tableLocked, setTableLocked] = useState(true);

    return (
      <>
        <GridToolbarContainer className={classes.root}>
          {props.tableLockingAvailable && (
            <Tooltip title="Lock table from editing" placement="right">
              <IconButton
                onClick={() => {
                  setTableLocked(!tableLocked);
                  props.lockTable(!tableLocked);
                  !tableLocked && props.resetRows();
                }}
              >
                {tableLocked ? (
                  <LockOutlined className={classes.lockButton} />
                ) : (
                  <LockOpenOutlined className={classes.lockButton} />
                )}
                <Typography style={{ padding: ".5em" }} color="primary">
                  Lock Table
                </Typography>
              </IconButton>
            </Tooltip>
          )}
          {props.columnChangeAvailable && <GridToolbarColumnsButton />}
          {props.columnChangeAvailable && <GridToolbarFilterButton />}
          {props.densityAvailable && <GridToolbarDensitySelector />}
          {props.exportAvailable && <GridToolbarExport />}
          {props.searchAvailable && (
            <QuickSearch
              value={props.value}
              onChange={props.onChange}
              clearSearch={props.clearSearch}
            />
          )}
        </GridToolbarContainer>
      </>
    );
  }
);

export default TableToolbar;
