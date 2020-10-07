import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { MapSearch, Xml, Download, OpenInNew } from "mdi-material-ui";
import DrawerSection from "components/DrawerSection";
import DrawerIconButton from "components/DrawerIconButton";
import getIndicatorMapHref from "helpers/getIndicatorMapHref";
import getIndicatorDownloadDataHref from "helpers/getIndicatorDownloadDataHref";
import getIndicatorDataSourceHref from "helpers/getIndicatorDataSourceHref";
import * as gtag from "helpers/gtag";

const DrawerActionSection = ({
  indicator,
  map = false,
  mapInNewTab = false,
  mapEmbed = false,
  download = false,
  source = false,
  ...otherProps
}) => {
  const [showEmbedDialog, setShowEmbedDialog] = useState(false);

  return (
    <DrawerSection padding={0} {...otherProps}>
      <Box display="flex" flexWrap="wrap">
        {map && indicator.hasMap ? (
          <Link href={getIndicatorMapHref(indicator)} passHref>
            <DrawerIconButton
              onClick={() => {
                gtag.event({
                  action: "clickAction",
                  category: "sideMenu",
                  label: getIndicatorMapHref(indicator),
                });
              }}
              Icon={MapSearch}
              label="Visualize on map"
            />
          </Link>
        ) : null}
        {mapInNewTab && indicator.hasMap ? (
          <DrawerIconButton
            href={getIndicatorMapHref(indicator)}
            target="_blank"
            onClick={() => {
              gtag.event({
                action: "clickAction",
                category: "sideMenu",
                label: `fullscreen: ${getIndicatorMapHref(indicator)}`,
              });
            }}
            Icon={OpenInNew}
            label="Open fullscreen"
          />
        ) : null}
        {download ? (
          <DrawerIconButton
            href={getIndicatorDownloadDataHref(indicator)}
            target="_blank"
            Icon={Download}
            onClick={() => {
              gtag.event({
                action: "clickAction",
                category: "sideMenu",
                label: getIndicatorDownloadDataHref(indicator),
              });
            }}
            label="Download data (.csv)"
          />
        ) : null}
        {mapEmbed && indicator.hasMap ? (
          <>
            <DrawerIconButton
              onClick={() => {
                setShowEmbedDialog(true);
                gtag.event({
                  action: "clickAction",
                  category: "sideMenu",
                  label: getIndicatorMapHref(indicator, { embed: true }),
                });
              }}
              Icon={Xml}
              label="Embed (iframe)"
            />
            <Dialog
              onClose={() => setShowEmbedDialog(false)}
              open={showEmbedDialog}
              maxWidth="lg"
              fullWidth
            >
              <DialogTitle>Embed this map on your website</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Use the following code to embed this map on your website:
                </DialogContentText>
                <TextField
                  inputProps={{
                    readOnly: "readonly",
                    style: {
                      fontFamily: "monospace",
                    },
                  }}
                  fullWidth
                  autoFocus
                  multiline
                  defaultValue={`<iframe src="https://data.covid19commission.org${getIndicatorMapHref(
                    indicator,
                    {
                      embed: true,
                    }
                  )}" style="width: 100%; height: 500px;"></iframe>`}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowEmbedDialog(false)}>Close</Button>
              </DialogActions>
            </Dialog>
          </>
        ) : null}
        {source ? (
          <DrawerIconButton
            href={getIndicatorDataSourceHref(indicator)}
            target="_blank"
            Icon={OpenInNew}
            onClick={() => {
              gtag.event({
                action: "clickAction",
                category: "sideMenu",
                label: getIndicatorDataSourceHref(indicator),
              });
            }}
            label="Go to data source"
          />
        ) : null}
      </Box>
    </DrawerSection>
  );
};

export default DrawerActionSection;
