import { Box } from "@material-ui/core";
import styled from "styled-components";

const DrawerSection = styled(({ gray, ...props }) => <Box {...props} />).attrs(
  (props) => ({
    padding: 1.5,
    ...props,
  })
)`
  && {
    ${(props) => (props.gray ? "background: #fafafa;" : null)}
    ${(props) => (props.padding ? `padding: ${props.padding * 8}px;` : null)}
  }
`;

export default DrawerSection;
