import React, { useCallback, useState } from "react";
import {
  DataGrid,
  GridSelectionModel,
  GridSortModel,
  GridActionsCellItem,
  GridRowParams,
  GridActionsColDef,
} from "@mui/x-data-grid";
import Toolbar from "./Toolbar/Toolbar";
import { Paper, Fade, Tooltip } from "@material-ui/core";
import useStyles from "./useStyles";
import ActionBar from "./ActionBar";
import { DeleteOutlineRounded, SaveAltOutlined } from "@material-ui/icons";

export interface DataTableProps {
  actionBarComponent?: any;
  data: any;
  columns: any;
  isRowSelectable?: boolean;
  disableSelectionOnClick?: boolean;
  actionColumnEnabled?: boolean;
  shadeOddRows?: any;
  editMode?: string;
  checkboxSelection?: boolean;
  columnChangeAvailable?: boolean;
  onDeleteSingleRow?: any;
  onSaveSingleRow?: any;
  onBulkSave?: any;
  onBulkDelete?: any;
  filterAvailable?: boolean;
  exportAvailable?: boolean;
  searchAvailable?: boolean;
  tableLockingAvailable?: boolean;
  densityAvailable?: boolean;
  disableColumnMenu?: boolean;
  style?: any;
  sortModel?: any;
  height?: number;
  rest?: any;
}

export const DataTable: React.FunctionComponent<DataTableProps> = ({
  sortModel,
  data,
  columns,
  height,
  disableSelectionOnClick,
  actionColumnEnabled,
  onDeleteSingleRow,
  onSaveSingleRow,
  onBulkSave,
  onBulkDelete,
  searchAvailable,
  exportAvailable,
  tableLockingAvailable,
  columnChangeAvailable,
  filterAvailable,
  disableColumnMenu,
  editMode,
  isRowSelectable,
  checkboxSelection,
  actionBarComponent: ActionBarComponent,
  ...rest
}: any) => {
  const classes = useStyles();
  const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
  const [pageSize, setPageSize] = useState<number>(25);
  const [selectionOnClick, setSelectionOnClick] = useState<boolean>(
    tableLockingAvailable || disableSelectionOnClick
  );
  const [tableLocked, setTableLocked] = useState<boolean>(
    tableLockingAvailable
  );
  const [sort, setSort] = useState<GridSortModel>(sortModel);
  const [searchText, setSearchText] = useState("");
  const [rows, setRows] = useState<any[]>(data);

  const lockTable = (value: boolean) => {
    setSelectionOnClick(value);
    setTableLocked(value);
  };

  const actionColumn: GridActionsColDef = {
    field: "actions",
    type: "actions",
    headerClassName: "& MuiDataGrid-columnHeader",
    getActions: (params: GridRowParams) => [
      onDeleteSingleRow !== undefined && !tableLocked ? (
        <GridActionsCellItem
          icon={
            <Tooltip title="Delete" placement="bottom">
              <DeleteOutlineRounded className={classes.deleteButton} />
            </Tooltip>
          }
          onClick={() => onDeleteSingleRow(params.row)}
          label="Delete"
        />
      ) : (
        <></>
      ),
      onSaveSingleRow !== undefined && !tableLocked ? (
        <GridActionsCellItem
          icon={
            <Tooltip title="Save" placement="bottom">
              <SaveAltOutlined className={classes.saveButton} />
            </Tooltip>
          }
          onClick={() => onSaveSingleRow(params.row)}
          label="Save"
        />
      ) : (
        <></>
      ),
    ],
  };
  const resetRows = () => {
    setSelectedRows([]);
  };

  const requestSearch = useCallback(
    (searchValue: string) => {
      resetRows();
      setSearchText(searchValue);
      const filteredRows = data.filter((row: any) => {
        return Object.keys(row).some((field: any) => {
          return String(row[field])
            .toLocaleLowerCase()
            .match(searchValue.toLocaleLowerCase());
        });
      });
      setRows(filteredRows);
    },
    [data]
  );

  return (
    <div className={classes.root}>
      <Fade in={true} timeout={{ enter: 1000 }}>
        <Paper className={classes.paper}>
          <DataGrid
            {...rest}
            pageSize={height && height < 1000 ? 5 : pageSize}
            disableSelectionOnClick={selectionOnClick}
            pagination
            sortModel={sort}
            onSortModelChange={(model) => setSort(model)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            components={{
              Toolbar: Toolbar,
            }}
            componentsProps={{
              toolbar: {
                value: searchText,
                onChange: (event: any) => {
                  event.preventDefault();
                  requestSearch(event.target.value);
                },
                clearSearch: () => {
                  setRows(rows);
                  requestSearch("");
                },
                searchAvailable: searchAvailable,
                exportAvailable: exportAvailable,
                columnChangeAvailable: columnChangeAvailable,
                filterAvailable: filterAvailable,
                tableLockingAvailable: tableLockingAvailable,
                lockTable: lockTable,
                resetRows: resetRows,
              },
            }}
            onSelectionModelChange={(newSelectionModel) => {
              setSelectedRows(newSelectionModel);
            }}
            disableColumnMenu={disableColumnMenu}
            editMode={editMode ? editMode : "row"}
            isRowSelectable={isRowSelectable}
            selectionModel={selectedRows}
            density={"compact"}
            autoHeight
            checkboxSelection={!tableLocked && checkboxSelection}
            rows={rows}
            columns={
              actionColumnEnabled && !tableLocked && selectedRows.length < 2
                ? [...columns, actionColumn]
                : [...columns]
            }
          />
          {selectedRows && selectedRows.length > 1 && (
            <ActionBar
              onBulkSave={onBulkSave}
              onBulkDelete={onBulkDelete}
              component={ActionBarComponent}
              rows={rows}
              selectedRows={selectedRows}
              resetRows={resetRows}
            />
          )}
        </Paper>
      </Fade>
    </div>
  );
};

export default DataTable;
