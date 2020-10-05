import { useEffect, useState } from "react";
import { formatDistanceToNowStrict, parse } from "date-fns";

const TimeAgoExtraction = ({ timestamp }) => {
  const [text, setText] = useState(timestamp);

  useEffect(() => {
    const timeAgo = formatDistanceToNowStrict(
      parse(`${timestamp}+00`, "MMM dd, yyyy HH:mm 'GMT'x", new Date())
    );
    setText(`${timeAgo} ago`);
  }, [timestamp]);

  return <>{text}</>;
};

export default TimeAgoExtraction;
