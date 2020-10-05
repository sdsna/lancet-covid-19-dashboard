import Link from "next/link";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import getTheme from "helpers/getTheme";

const { palette } = getTheme();

const NavBarDrawer = ({ pages, ...otherProps }) => (
  <Drawer {...otherProps} PaperProps={{ style: { maxWidth: "80%" } }}>
    <List disablePadding>
      <ListItem
        button
        component="a"
        href="https://covid19commission.org/"
        style={{
          background: palette.primary.main,
          color: "white",
          paddingBottom: 16,
          paddingTop: 16,
        }}
      >
        <Typography variant="body1" style={{ color: "white", fontWeight: 700 }}>
          Lancet Covid-19 Commission
        </Typography>
      </ListItem>
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
