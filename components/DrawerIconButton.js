import { forwardRef } from "react";
import { Box, Button, IconButton, Typography } from "@material-ui/core";
import styled from "styled-components";

// The color for the button text and fill or outline
const primaryColor = "#015edd";

const InlineIcon = styled(IconButton).attrs({
  component: "span",
  disableRipple: true,
  disableFocusRipple: true,
  size: "small",
})`
  &&,
  &&:hover {
    padding: 8px;
    border: 1px solid #1a73e8;
    color: ${primaryColor};
    margin-bottom: 4px;
  }
`;

const StyledButton = styled(Button).attrs({
  component: "a",
})`
  .MuiButton-label {
    flex-direction: column;
  }

  && {
    padding: 12px;
    text-transform: initial;
  }

  ${InlineIcon} {
    transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
  }

  &:first-of-type ${InlineIcon} {
    color: #fff;
    background: ${primaryColor};
  }
`;

const Label = styled(Typography).attrs({
  variant: "caption",
})`
  && {
    line-height: 1.33;
  }
  color: ${primaryColor};
`;

const DrawerIconButton = forwardRef(
  ({ Icon, label, primary = false, ...otherProps }, ref) => (
    <Box
      textAlign="center"
      component={StyledButton}
      flex="0 0 33.33%"
      ref={ref}
      {...otherProps}
    >
      <InlineIcon
        styled={{
          primary: primary,
        }}
      >
        <Icon fontSize="small" />
      </InlineIcon>
      <Label>{label}</Label>
    </Box>
  )
);

export default DrawerIconButton;
