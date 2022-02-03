import { FormControlLabel, Grow, Switch, Paper } from "@material-ui/core";
import React, { useState } from "react";

interface GrowSwitchProps {
  component: React.FunctionComponent;
  label?: string;
}

const GrowSwitch: React.FunctionComponent<GrowSwitchProps> = ({
  component: Component,
  label,
  ...rest
}) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label={label}
        {...rest}
      />
      <Grow
        in={checked}
        style={{ transformOrigin: "0 0 0" }}
        {...(checked ? { timeout: 1000 } : {})}
      >
        <Paper>{checked ? <Component {...rest} /> : <></>}</Paper>
      </Grow>
    </>
  );
};

export default GrowSwitch;
