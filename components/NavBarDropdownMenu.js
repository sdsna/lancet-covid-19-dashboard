import Link from "next/link";
import { MenuList, MenuItem } from "@material-ui/core";
import DropdownMenu from "components/DropdownMenu";

const NavBarDropdownMenu = ({ pages, handeClose, ...otherProps }) => {
  if (pages == null || pages.length === 0) return null;

  return (
    <DropdownMenu
      placement="bottom-start"
      paperProps={{ elevation: 5, square: true }}
      handeClose={handeClose}
      {...otherProps}
    >
      <MenuList>
        {pages.map(({ href, label, disabled }) => (
          <Link key={href} href={href} passHref>
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
          </Link>
        ))}
      </MenuList>
    </DropdownMenu>
  );
};

export default NavBarDropdownMenu;
