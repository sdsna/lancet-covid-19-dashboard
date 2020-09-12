import { Typography } from "@material-ui/core";
import styled from "styled-components";

const DrawerHeading = styled(Typography).attrs(({ gutterBottom = true }) => ({
  variant: "subtitle2",
  gutterBottom,
}))``;

export default DrawerHeading;
