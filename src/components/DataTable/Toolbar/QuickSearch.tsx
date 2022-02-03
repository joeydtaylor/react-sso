import React from "react";
import { TextField, IconButton } from "@material-ui/core";
import { Search, Clear } from "@material-ui/icons";
import useStyles from "../useStyles";

export interface QuickSearchProps {
  clearSearch: () => void;
  onChange: () => void;
  value: string;
}

export const QuickSearch: React.FunctionComponent<QuickSearchProps> = (
  props: QuickSearchProps
) => {
  const classes = useStyles();

  return (
    <>
      <TextField
        color="primary"
        autoFocus
        variant="outlined"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        className={classes.textField}
        InputProps={{
          startAdornment: <Search fontSize="small" color="primary" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <Clear fontSize="small" color="primary" />
            </IconButton>
          ),
        }}
      />
    </>
  );
};

export default React.memo(QuickSearch);
