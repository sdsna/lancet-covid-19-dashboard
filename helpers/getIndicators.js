const path = require("path");
const csvtojson = require("csvtojson");
import { indicators } from "helpers/indicators";

const getIndicators = async () => {
  const codebookPath = path.join(process.cwd(), "data", "codebook.csv");
  let indicators = await csvtojson().fromFile(codebookPath);

  // Set ID
  indicators.map((indicator) => {
    indicator.id = indicator.indicator;
    delete indicator.indicator;
  });

  // Default hasMap to false
  indicators.map((indicator) => (indicator.hasMap = false));

  // Combine info from codebook and our internal definitions
  indicators.forEach((indicator) => {
    Object.assign(
      indicator,
      indicators.find(({ id }) => id === indicator.id) || {}
    );
  });

  return indicators;
};

module.exports = getIndicators;
