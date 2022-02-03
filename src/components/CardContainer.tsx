import React from "react";
import { Container, useTheme } from "@material-ui/core";

interface CardContainerProps {
  component: React.FunctionComponent;
}

const CardContainer: React.FunctionComponent<CardContainerProps> = ({
  component: Component,
  ...rest
}) => {
  const theme = useTheme();
  return (
    <div
      style={{
        display: "flex",
        marginLeft: "auto",
        marginRight: "auto",
        flexFlow: "row",
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "space-around",
        justifyContent: "space-around",
        padding: theme.spacing(-10),
        width: "100%",
        marginTop: theme.spacing(1),
      }}
    >
      <Container maxWidth="xl" {...rest}>
        <Component {...rest} />
      </Container>
    </div>
  );
};

export default CardContainer;
