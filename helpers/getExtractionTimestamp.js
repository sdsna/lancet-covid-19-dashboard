import path from "path";
import { readJsonSync } from "fs-extra";

// Get the timestamp of latest extraction
const getExtractionTimestamp = () => {
  const extractionTimestampPath = path.join(
    process.cwd(),
    "data",
    "last-extraction.json"
  );
  const extractionMetadata = readJsonSync(extractionTimestampPath);
  return extractionMetadata["message"];
};

export default getExtractionTimestamp;
