import React, { useState } from "react";
import {
  CardContent,
  Typography,
  useTheme,
  Fade,
  Zoom,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import useStyles from "./useStyles";

interface ButtonCardContainerProps {
  component?: React.Component;
  style?: any;
  imageText?: string;
  image?: string;
  contentWidth?: string;
  buttonWidth?: string;
  cardLabel?: string;
  transitionEffect?: "fade" | "zoom";
  transitionEffectTimeout?: number;
  timeout?: number;
}

const ButtonCardContainer: React.FunctionComponent<ButtonCardContainerProps> = React.memo(
  ({
    children: Component,
    transitionEffect,
    image,
    imageText,
    cardLabel,
    ...rest
  }: any) => {
    const classes = useStyles();
    const theme = useTheme();

    const [checked, setChecked] = useState(false);
    const [raised, setRaised] = useState({
      raised: false,
      elevation: 0,
    });

    const TransitionEffect: React.FunctionComponent = () => {
      return transitionEffect && transitionEffect === "fade" ? (
        <Fade in={checked} {...rest} />
      ) : transitionEffect === "zoom" ? (
        <Zoom in={checked} {...rest} />
      ) : (
        <Zoom in={checked} {...rest} />
      );
    };

    const handleChange = () => !checked && setChecked(() => true);
    return (
      <div>
        <Card
          raised={raised.raised}
          className={classes.root}
          elevation={raised.elevation}
          onMouseOver={() => {
            return !checked ? setRaised({ raised: true, elevation: 5 }) : {};
          }}
          onMouseOut={() => {
            return !checked ? setRaised({ raised: false, elevation: 1 }) : {};
          }}
        >
          {!checked && (
            <Button
              onClick={handleChange}
              className={classes.button}
              style={{
                backgroundColor: theme.palette.background.paper,
              }}
            >
              {!checked && image && (
                <>
                  <img alt={imageText} src={image} className={classes.image} />
                  {cardLabel && (
                    <Typography variant="h3" {...rest}>
                      {cardLabel}
                    </Typography>
                  )}
                </>
              )}
            </Button>
          )}
          <TransitionEffect>
            <Card className={classes.card}>
              {checked && (
                <IconButton
                  className={classes.closeIcon}
                  color="primary"
                  size="small"
                  onClick={() => setChecked((prev) => !prev)}
                >
                  <CloseIcon />
                </IconButton>
              )}
              <Card
                className={classes.card}
                style={{
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <CardContent className={classes.cardContent}>
                  {checked && <Component {...rest} />}
                </CardContent>
              </Card>
            </Card>
          </TransitionEffect>
        </Card>
      </div>
    );
  }
);

export default ButtonCardContainer;
