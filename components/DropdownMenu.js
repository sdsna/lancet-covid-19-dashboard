import { Popper, Paper, ClickAwayListener, Grow } from "@material-ui/core";

const DropdownMenu = ({
  anchorRef,
  open,
  handleClose,
  children,
  paperProps,
}) => {
  return (
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
      placement="bottom-start"
      style={{ minWidth: anchorRef.current?.offsetWidth }}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom" ? "center top" : "center bottom",
          }}
        >
          <Paper square {...paperProps}>
            <ClickAwayListener onClickAway={handleClose}>
              {children}
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default DropdownMenu;
