import { useRef, useState } from "react";
import Link from "next/link";
import { Box, ButtonBase, Typography } from "@material-ui/core";
import styled from "styled-components";
import NavBarDropdownMenu from "components/NavBarDropdownMenu";

const StyledButtonBase = styled(ButtonBase).attrs({
  component: "a",
})`
  && {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-self: stretch;
    padding: 0 16px;
  }
`;

const HoverButton = styled(StyledButtonBase)`
  transition: background 0.3s ease-in-out;

  ${(props) => (props.styled.showingDropdown ? "&& ," : "")}
  &&:hover {
    background: ${(props) => props.theme.palette.primary.main};
  }
`;

const LinkHandler = ({ href, external, children }) => {
  // If this is an external button or a button without link, we do not need
  // to use the NextJS Link component
  if (!href || external) return <>{children}</>;

  return (
    <Link href={href} passHref>
      {children}
    </Link>
  );
};

const NavBarButton = ({ label, href, subpages, external, onClick }) => {
  const buttonRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);

  // Pass href and target:_blank to external buttons
  const buttonProps = external ? { href, target: "_blank" } : {};

  return (
    <Box
      display="flex"
      height="100%"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <LinkHandler href={href} external={external}>
        <HoverButton
          {...buttonProps}
          onClick={onClick}
          styled={{ showingDropdown: showDropdown }}
          ref={buttonRef}
        >
          <Typography variant="body1">{label}</Typography>
        </HoverButton>
      </LinkHandler>
      <NavBarDropdownMenu
        anchorRef={buttonRef}
        open={showDropdown}
        handleClose={() => setShowDropdown(false)}
        pages={subpages}
      />
    </Box>
  );
};

export default NavBarButton;
