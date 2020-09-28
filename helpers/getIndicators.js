// const path = require("path");
// const csvtojson = require("csvtojson");
// const INDICATORS = require("./indicators");
//
// const getIndicators = async () => {
//   const codebookPath = path.join(process.cwd(), "data", "codebook.csv");
//   const codebook = await csvtojson().fromFile(codebookPath);
//
//   return codebook.map((entry) => {
//     const indicator = INDICATORS.find({ id } => id === entry.indicator)
//
//     id: entry.indicator,
//     source: entry.source,
//   });
// };
//
// module.exports = getIndicators;
