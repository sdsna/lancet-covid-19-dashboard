import { Popper, Paper, ClickAwayListener, Grow } from "@material-ui/core";

const DropdownMenu = ({
  anchorRef,
  open,
  handleClose,
  children,
  paperProps,
  placement = "top-start",
}) => {
  return (
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
      placement={placement}
      style={{ minWidth: anchorRef.current?.offsetWidth }}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin: placement.startsWith("bottom")
              ? "center top"
              : "center bottom",
          }}
        >
          <Paper {...paperProps}>
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
