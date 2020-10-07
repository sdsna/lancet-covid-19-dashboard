import getBadgeMessage from "helpers/getBadgeMessage";

// Get the timestamp of latest extraction
const getExtractionTimestamp = () => {
  return getBadgeMessage("last-extraction");
};

export default getExtractionTimestamp;
