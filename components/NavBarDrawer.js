import Link from "next/link";
import { Box, Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import getTheme from "helpers/getTheme";

const { palette } = getTheme();

const NavBarDrawer = ({ pages, ...otherProps }) => (
  <Drawer {...otherProps}>
    <List disablePadding>
      <Link href="/" passHref>
        <ListItem
          button
          component="a"
          style={{
            background: palette.primary.main,
            color: "white",
            paddingBottom: 16,
            paddingTop: 16,
          }}
        >
          <img src="/static/logo.svg" alt="Logo" style={{ height: 80 }} />
        </ListItem>
      </Link>
      {pages.map(({ href, label }) => (
        <Link key={href} href={href} passHref>
          <ListItem button component="a" divider>
            <ListItemText primary={label} />
          </ListItem>
        </Link>
      ))}
    </List>
  </Drawer>
);

export default NavBarDrawer;
