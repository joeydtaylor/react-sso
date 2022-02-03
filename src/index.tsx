import React from "react";
import { render } from "react-dom";
import App from "src/App";
import store from "src/store/store";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import {
  QueryClient as ReactQueryClient,
  QueryClientProvider as ReactQueryProvider,
} from "react-query";
import { Provider as ReduxProvider } from "react-redux";
import { Theme } from "@material-ui/core";
import { unstable_createMuiStrictModeTheme as createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";

const apolloClient = new ApolloClient({
  uri:
    process.env.NODE_ENV === "development"
      ? "https://localhost:3000/graphql"
      : "", // prod url
  cache: new InMemoryCache(),
});

const reactQueryClient = new ReactQueryClient();

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#01579b",
    },
    text: {
      primary: "#212121",
      secondary: "#263238",
    },
    secondary: {
      main: "#1e88e5",
      contrastText: "rgba(235, 235, 235, .7)",
    },
    background: {
      default: "#fafafa",
      paper: "#fff",
    },
    type: "dark",
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <ReactQueryProvider client={reactQueryClient}>
          <ApolloProvider client={apolloClient}>
            <App />
          </ApolloProvider>
        </ReactQueryProvider>
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
