import { useState } from "react";
import {
  Box,
  ButtonBase,
  Dialog,
  DialogContent,
  TextField,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Menu } from "mdi-material-ui";
import styled from "styled-components";
import DrawerSection from "components/DrawerSection";

const Button = styled(ButtonBase)`
  && {
    display: flex;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.04);
    transition: background 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
`;

const PageSelectionButton = ({
  children,
  options,
  getOptionLabel,
  getOptionGroup,
  modalTitle,
  modalDescription,
  onSelect,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        display="flex"
        onClick={() => setOpen(true)}
        component={DrawerSection}
      >
        <Box flexGrow="1">{children}</Box>
        <Box marginLeft={1}>
          <Menu />
        </Box>
      </Button>
      <Dialog
        fullWidth
        maxWidth="lg"
        onClose={() => setOpen(false)}
        open={open}
      >
        <DialogContent>
          <Typography variant="h2">{modalTitle}</Typography>
          <Typography variant="body1" color="textSecondary">
            {modalDescription}
          </Typography>
          <Autocomplete
            options={options}
            autoHighlight
            open={true}
            fullWidth
            onChange={(_event, option) => {
              onSelect(option);
              setOpen(false);
            }}
            getOptionLabel={getOptionLabel}
            groupBy={getOptionGroup}
            PopperComponent="div"
            PaperComponent="div"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search"
                margin="dense"
                size="small"
                variant="outlined"
              />
            )}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PageSelectionButton;
