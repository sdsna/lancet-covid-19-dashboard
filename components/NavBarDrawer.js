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

const NavBarDrawer = ({
  pages,
  title,
  openDownloadDatabaseDialog,
  ...otherProps
}) => (
  <Drawer {...otherProps} PaperProps={{ style: { maxWidth: "80%" } }}>
    <List disablePadding>
      <Link href="/" passHref>
        <ListItem
          button
          component="a"
          style={{
            background: palette.primary.main,
            borderBottom: `3px solid ${palette.secondary.main}`,
            paddingBottom: 16,
            paddingTop: 16,
          }}
        >
          <ListItemText
            primaryTypographyProps={{
              style: { color: "white", fontWeight: 700 },
            }}
            primary={title}
          />
        </ListItem>
      </Link>
      <Link href="/" passHref>
        <ListItem button component="a" divider>
          <ListItemText primary="Home" />
        </ListItem>
      </Link>
      {pages.map(({ href, label, subpages }) => (
        <>
          <Link key={href} href={href} passHref>
            <ListItem button component="a" divider>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
          <Box style={{ background: "rgba(0,0,0,.05)" }}>
            {(subpages || []).map(({ href, label, disabled }) => (
              <Link key={href} href={href} passHref>
                <ListItem
                  button
                  component="a"
                  dense
                  disabled={disabled}
                  divider
                >
                  <ListItemText
                    primary={`· ${label}`}
                    style={{ paddingLeft: 12 }}
                  />
                </ListItem>
              </Link>
            ))}
          </Box>
        </>
      ))}
      <ListItem
        button
        component="a"
        href="https://covid19commission.org"
        target="_blank"
        divider
      >
        <ListItemText primary="Lancet Commission" />
      </ListItem>
      <ListItem
        button
        onClick={openDownloadDatabaseDialog}
        target="_blank"
        divider
      >
        <ListItemText primary="Download Database" />
      </ListItem>
    </List>
  </Drawer>
);

export default NavBarDrawer;
