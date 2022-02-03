import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& .MuiDataGrid-row.Mui-even:not(:hover)": {
      backgroundColor: theme.palette.primary.main,
    },
    alignItems: "space-evenly",
    overflow: "none",
    border: "none",
    color:
      theme.palette.type === "dark"
        ? "rgba(0,0,0,.85)"
        : "rgba(255,255,255,0.85)",
    "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
      {
        display: "none",
        color: "white",
        paddingTop: 1,
      },
    "& .MuiDataGrid-toolbarContainer": {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      alignItems: "center",
      padding: theme.spacing(1),
      caretColor: "transparent",
    },
    "& .MuiDataGrid-root": {
      border: "none",
      "&:focus": {
        color: "transparent",
        textShadow: "0 0 0 #2196f3",
        cursor: "none",
      },
    },
    padding: theme.spacing(1),
    justifyContent: "space-evenly",
    WebkitFontSmoothing: "auto",
    letterSpacing: "normal",
    fontFamily: theme.typography.fontFamily,
    " & .MuiDataGrid-row.Mui-selected": {
      "&:focus": {
        color: "transparent",
        textShadow: "0 0 0 #2196f3",
        cursor: "none",
      },
    },
    "& .MuiDataGrid-columnsContainer": {
      backgroundColor: theme.palette.type === "dark" ? "#fafafa" : "#1d1d1d",
      "&:focus": {
        cursor: "none",
      },
    },
    "& .MuiDataGrid-iconSeparator": {
      color: theme.palette.secondary.contrastText,
      padding: 1,
      marginRight: -0.5,
    },
    "& .MuiDataGrid-columnSeparator": {
      backgroundColor: theme.palette.primary.main,
    },
    "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
      padding: theme.spacing(0.5, 0.5, 0),
      alignItems: "center",
      borderBottom: `1px solid ${
        theme.palette.type === "dark" ? "#f0f0f0" : "#303030"
      }`,
      justifyContent: "center",
      background: `1px solid ${
        theme.palette.type === "dark" ? "#f0f0f0" : "#303030"
      }`,
    },
    "& .MuiPaginationItem-root": {
      borderRadius: 0,
    },
    "& .MuiDataGrid-footerContainer": {
      padding: theme.spacing(0.5, 0.5, 0),
      justifyContent: "left",
      display: "flex",
      flexWrap: "wrap",
      caretColor: "transparent",
    },
    "& .MuiDataGrid-columnHeaderTitleContainer": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: theme.palette.background.paper,
      fontSize: 16,
      fontVariant: "small-caps",
      backgroundColor: theme.palette.primary.main,
      padding: "1em",
      "&:focus": {
        color: "transparent",
        textShadow: "0 0 0 #2196f3",
        cursor: "none",
      },
      "&:input": {
        color: "transparent",
        textShadow: "0 0 0 #2196f3",
        cursor: "none",
      },
    },
    "& .MuiIconButton-root": {
      color: "inherit",
    },
    "& .MuiDataGrid-checkboxInput": {
      width: "100%",
      padding: theme.spacing(1),
      paddingLeft: 10,
      marginLeft: -1,
      marginRight: "auto",
      margin: -6,
    },
    "& .MuiDataGrid-columnHeadersInner": {
      backgroundColor: theme.palette.primary.main,
    },
    "& .MuiTablePagination-caption": {
      color: theme.palette.text.secondary,
      font: theme.typography.fontFamily,
    },
    "& .MuiDataGrid-row": {
      input: "none",
      outline: "none",
      padding: "inherit",
    },
    "& .MuiDataGrid-cell": {
      borderRight: `1px solid ${
        theme.palette.type === "dark" ? "#f0f0f0" : "#303030"
      }`,

      color: "rgba(0,0,0,.85)",
      fontSize: 12,
      caretColor: "rgba(0,0,0,0)",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      textAlign: "justify",
      overflow: "none",
      paddingLeft: theme.spacing(1),
      "&:focus": {
        outline: "none",
        border: "transparent",
        boxShadow: `1px 2px 20px 
        #9e9e9e`
      },
      "&:input": {
        color: "transparent",
        textShadow: "0 0 0 #2196f3",
        cursor: "none",
      },
    },
    "& .MuiDataGrid-columnHeader--sortable, MuiDataGrid-columnHeader": {
      "&:focus": {
        caretColor: "transparent",
      },
      transition: "all .5s linear",
      backgroundColor: theme.palette.primary.main,
    },
    "& .MuiDataGrid-sortIcon": {
      color: theme.palette.background.paper,
    },
    "& .MuiDataGrid-columnHeaderWrapper": {
      display: "flex",
      flexDirection: "row",
      alignContent: "center",
      justifyContent: "space-evenly",
      fontFamily: `${theme.typography.fontFamily}`,
    },
    "& .MuiDataGrid-columnHeader": {
      fontSize: 14,
      color: theme.palette.text.primary,
      font: theme.typography.fontFamily,
      fontWeight: "normal",
      padding: theme.spacing(1),
      "&:focus": {
        outline: "none",
        color: "transparent",
        textShadow: `0 0 0 ${theme.palette.primary.main}`,
      },
      "&:input": {
        color: "transparent",
        textShadow: "0 0 0 #2196f3",
        cursor: "none",
      },

    },
    "& .MuiDataGrid-dataContainer": {
      "&:focus": {
        color: "transparent",
        textShadow: "0 0 0 #2196f3",
        cursor: "none",
      },
      "&:input": {
        cursor: "none",
      },
    },
    "& .MuiDataGrid-main, .MuiDataGrid-columnsContainer": {},
  },
  paper: {
    borderRadius: "1%",
    marginRight: "auto",
    marginLeft: "auto",
    "&:hover": {
      overflow: "none",
      boxShadow: `1px 2px 10px 
      #9e9e9e`,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexGrow: 1,
    "&:focus": {
      color: "transparent",
      textShadow: "0 0 0 #2196f3",
      cursor: "none",
    },
    "&:input": {
      cursor: "none",
    },
  },
  textField: {
    borderRadius: "2%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    margin: theme.spacing(1, 0.5, 1.5),
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(0.5),
    },
    "& .MuiInput-underline:before": {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    "&:hover": {
      overflow: "none",
      boxShadow: `1px 2px 20px 
      #9e9e9e`,
    },
  },
  "& .MuiGridMenu-root .MuiDataGrid-gridMenuList": {},
  actionBar: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.palette.background.paper,
    WebkitTransition: "linear",
    borderRadius: "inherit",
    overflow: "hidden",
    border: "none",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "space-evenly",
    width: "100%",
  },
  actionCell: {
    backgroundColor: "transparent",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "space-evenly",
    width: "100%",
    overflow: "none",
  },
  deleteIcon: {
    "&:hover": {
      color: theme.palette.background.paper,
      opacity: "100%",
    },
    color: theme.palette.background.paper,
  },
  fab: {
    margin: theme.spacing(2),
  },
  deleteActionCellButton: {
    display: "flex",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      opacity: "50%",
    },
    backgroundColor: theme.palette.primary.main,
    borderRadius: 16,
  },
  deleteButton: {
    display: "flex",
    "&:hover": {
      color: theme.palette.primary.main,
      opacity: "50%",
    },
    color: theme.palette.primary.main,
    borderRadius: 16,
  },
  saveButton: {
    display: "flex",
    "&:hover": {
      color: theme.palette.primary.main,
      opacity: "50%",
    },
    color: theme.palette.primary.main,
    borderRadius: 16,
  },
  lockButton: {
    display: "flex",
    "&:hover": {
      color: theme.palette.primary.main,
      opacity: "50%",
    },
    color: theme.palette.primary.main,
    borderRadius: 16,
  },
}));

export default useStyles;
