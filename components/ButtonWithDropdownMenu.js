import { useCallback, useRef, useState } from "react";
import { Menu } from "@material-ui/core";

const ButtonWithDropdownMenu = ({ button, children }) => {
  const buttonRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);

  const openMenu = useCallback(() => {
    setShowDropdown(true);
  }, []);

  const closeMenu = useCallback(() => {
    setShowDropdown(false);
  }, []);

  return (
    <>
      {button({ ref: buttonRef, openMenu })}
      <Menu
        anchorEl={buttonRef.current}
        open={showDropdown}
        onClose={closeMenu}
      >
        {children}
      </Menu>
    </>
  );
};

export default ButtonWithDropdownMenu;
