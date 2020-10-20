const fetch = require("node-fetch");
const fse = require("fs-extra");
const path = require("path");
const { indicators } = require("../helpers/indicators");

const REPO_URL =
  "https://raw.githubusercontent.com/sdsna/lancet-covid-19-database";

const main = async () => {
  fse.emptyDirSync(path.join(__dirname, "indicators"));
  fse.emptyDirSync(path.join(__dirname, "badges"));
  fse.remove(path.join(__dirname, "codebook.csv"));
  [
    "country-coverage",
    "day-coverage",
    "total-data-points",
    "total-indicators",
    "last-extraction",
  ].forEach(async (badge) => {
    await downloadBadge(badge);
  });
  await downloadCodebook();
  for (let i = 0; i < indicators.length; i++) {
    process.stdout.write(`Downloading ${indicators[i].id} ...`);
    await downloadIndicator(indicators[i].id);
    console.log("Done!");
  }
};

const downloadBadge = async (badge) => {
  const res = await fetch(`${REPO_URL}/master/badges/${badge}.json`);

  // Check for errors
  if (res.status != 200) throw `Could not download badge: ${badge}`;

  const text = await res.text();
  fse.writeFileSync(path.join(__dirname, "badges", `${badge}.json`), text);
};

const downloadCodebook = async () => {
  const res = await fetch(`${REPO_URL}/master/data/codebook.csv`);
  const text = await res.text();
  fse.writeFileSync(path.join(__dirname, "codebook.csv"), text);
};

const downloadIndicator = async (indicatorId) => {
  const url = `${REPO_URL}/master/data/indicators/${indicatorId}.csv`;
  const res = await fetch(url);

  // Check for errors
  if (res.status != 200)
    throw `Could not download indicator ${indicatorId} from ${url}`;

  // Continue
  const text = await res.text();
  fse.writeFileSync(
    path.join(__dirname, "indicators", `${indicatorId}.csv`),
    text
  );
};

main();
