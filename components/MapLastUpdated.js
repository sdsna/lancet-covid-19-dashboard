import { useEffect, useState } from "react";
import { Box, Tooltip, Typography } from "@material-ui/core";
import { Update } from "mdi-material-ui";
import { formatDistanceToNowStrict, parse } from "date-fns";
import TimeAgoExtraction from "components/TimeAgoExtraction";

const MapLastUpdated = ({ updatedAt }) => {
  const [text, setText] = useState(updatedAt);

  useEffect(() => {
    const timeAgo = formatDistanceToNowStrict(
      parse(`${updatedAt}+00`, "MMM dd, yyyy HH:mm 'GMT'x", new Date())
    );
    setText(`${timeAgo} ago`);
  }, [updatedAt]);

  return (
    <Box
      position="absolute"
      style={{
        top: 0,
        right: 0,
        background: "rgba(255, 255, 255, 0.7)",
        cursor: "help",
        userSelect: "none",
      }}
    >
      <Tooltip title={`Data was extracted on ${updatedAt}`}>
        <Box display="flex" padding={0.5}>
          <Update fontSize="small" style={{ marginRight: 4 }} />
          <Typography variant="body1">
            Updated: <TimeAgoExtraction timestamp={updatedAt} />
          </Typography>
        </Box>
      </Tooltip>
    </Box>
  );
};

export default MapLastUpdated;
