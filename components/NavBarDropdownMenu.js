import Link from "next/link";
import { MenuList, MenuItem } from "@material-ui/core";
import DropdownMenu from "components/DropdownMenu";
import LinkHandler from "components/LinkHandler";

const NavBarDropdownMenu = ({ pages, handleClose, ...otherProps }) => {
  if (pages == null || pages.length === 0) return null;

  return (
    <DropdownMenu
      placement="bottom-start"
      paperProps={{ elevation: 5, square: true }}
      handleClose={handleClose}
      {...otherProps}
    >
      <MenuList>
        {pages.map(({ key, href, label, disabled }) => (
          <LinkHandler key={key || href} href={href}>
            <MenuItem
              disabled={disabled}
              component="a"
              onClick={() => {
                if (disabled) return;
                handleClose();
              }}
            >
              {label}
            </MenuItem>
          </LinkHandler>
        ))}
      </MenuList>
    </DropdownMenu>
  );
};

export default NavBarDropdownMenu;
