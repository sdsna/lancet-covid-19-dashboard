import path from "path";
import { readJsonSync } from "fs-extra";

// Get the message from one of the badges
const getBadgeMessage = (badge) => {
  const badgePath = path.join(process.cwd(), "data", "badges", `${badge}.json`);
  const badgeJson = readJsonSync(badgePath);
  return badgeJson["message"];
};

export default getBadgeMessage;
