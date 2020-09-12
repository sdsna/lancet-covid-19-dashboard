const path = require("path");
const csvtojson = require("csvtojson");

const getIndicators = async () => {
  const codebookPath = path.join(process.cwd(), "data", "codebook.csv");
  const codebook = await csvtojson().fromFile(codebookPath);

  return codebook.map((entry) => ({
    id: entry.indicator,
    source: entry.source,
  }));
};

module.exports = getIndicators;
