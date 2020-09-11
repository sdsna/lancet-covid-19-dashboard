import { Box, Typography } from "@material-ui/core";

const MapFooter = () => (
  <Box display="flex" justifyContent="flex-end">
    <Typography
      style={{ padding: "0px 4px", background: "rgba(255, 255, 255, 0.7)" }}
      variant="caption"
    >
      <a href="https://unsdsn.org/" target="_blank">
        Sustainable Development Solutions Network
      </a>{" "}
      &middot;{" "}
      {/* TODO: Don't use javascript:void(0).
                See: https://stackoverflow.com/questions/134845/which-href-value-should-i-use-for-javascript-links-or-javascriptvoid0
        */}
      <a
        href="#"
        onClick={() =>
          alert(
            "The boundaries, colors, denominations, and other information shown on this map do not imply any judgment on the part of SDSN concerning the legal status of any territory or the endorsement or acceptance of such boundaries."
          )
        }
      >
        Note on country boundaries
      </a>
    </Typography>
  </Box>
);

export default MapFooter;
