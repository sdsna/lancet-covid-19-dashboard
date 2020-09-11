import { ButtonBase, Box, Typography } from "@material-ui/core";
import { ChevronDown } from "mdi-material-ui";
import { useStore } from "helpers/uiStore";

const MobileMenuOpenerButton = ({ label }) => {
  const uiStore = useStore();

  return (
    <ButtonBase
      component={Box}
      alignItems="center"
      overflow="hidden"
      style={{ padding: 16, display: "flex" }}
      boxShadow={4}
      onClick={() => uiStore.openDrawer(null)}
    >
      <Box flexGrow="1" flexDirection="column" overflow="hidden">
        <Typography variant="h4" noWrap>
          {label}
        </Typography>
      </Box>
      <Box marginLeft={1}>
        <ChevronDown />
      </Box>
    </ButtonBase>
  );
};

export default MobileMenuOpenerButton;
