import { forwardRef } from "react";
import { Box } from "@material-ui/core";
import styled from "styled-components";

const DrawerSection = styled(
  forwardRef(({ gray, ...props }, ref) => <Box ref={ref} {...props} />)
).attrs((props) => ({
  padding: 1.5,
  ...props,
}))`
  && {
    ${(props) => (props.gray ? "background: #fafafa;" : null)}
    ${(props) => (props.padding ? `padding: ${props.padding * 8}px;` : null)}
  }
`;

export default DrawerSection;
