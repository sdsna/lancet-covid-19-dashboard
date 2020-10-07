import Link from "next/link";
import { MenuList, MenuItem } from "@material-ui/core";
import DropdownMenu from "components/DropdownMenu";

const NavBarDropdownMenu = ({ pages, ...otherProps }) => {
  if (pages == null || pages.length === 0) return null;

  return (
    <DropdownMenu
      placement="bottom-start"
      paperProps={{ elevation: 5, square: true }}
      {...otherProps}
    >
      <MenuList>
        {pages.map(({ href, label, disabled }) => (
          <Link key={href} href={href} passHref>
            <MenuItem disabled={disabled} component="a">
              {label}
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </DropdownMenu>
  );
};

export default NavBarDropdownMenu;
