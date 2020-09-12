const fetch = require("node-fetch");
const fse = require("fs-extra");
const path = require("path");
const getIndicators = require("../helpers/getIndicators");

const REPO_URL =
  "https://raw.githubusercontent.com/sdsna/lancet-covid-19-database";

const main = async () => {
  fse.emptyDirSync(path.join(__dirname, "indicators"));
  fse.remove(path.join(__dirname, "codebook.csv"));
  await downloadCodebook();
  const indicators = await getIndicators();
  for (let i = 0; i < indicators.length; i++) {
    process.stdout.write(`Downloading ${indicators[i].id} ...`);
    await downloadIndicator(indicators[i].id);
    console.log("Done!");
  }
};

const downloadCodebook = async () => {
  const res = await fetch(`${REPO_URL}/master/data/codebook.csv`);
  const text = await res.text();
  fse.writeFileSync(path.join(__dirname, "codebook.csv"), text);
};

const downloadIndicator = async (indicatorId) => {
  const res = await fetch(
    `${REPO_URL}/master/data/indicators/${indicatorId}.csv`
  );
  const text = await res.text();
  fse.writeFileSync(
    path.join(__dirname, "indicators", `${indicatorId}.csv`),
    text
  );
};

main();
