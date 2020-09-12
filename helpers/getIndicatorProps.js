import path from "path";
import csvtojson from "csvtojson";

const getIndicatorProps = async (indicatorId) => {
  // Load the indicator metadata from codebook
  const codebookPath = path.join(process.cwd(), "data", "codebook.csv");
  const codebook = await csvtojson().fromFile(codebookPath);

  const indicator = codebook.find((entry) => entry.indicator === indicatorId);
  delete indicator.indicator;
  indicator.id = indicatorId;

  // Load the indicator CSV file
  const file = path.join(
    process.cwd(),
    "data",
    "indicators",
    `${indicatorId}.csv`
  );
  const data = await csvtojson().fromFile(file);

  // Create one object of country names and one of observations of data
  // points
  const countries = {};
  const observations = {};

  data.forEach(({ iso_code, country, date, [indicatorId]: value }) => {
    observations[iso_code] = observations[iso_code] || {};
    observations[iso_code][date] = parseFloat(value);

    countries[iso_code] = country;
  });

  return {
    indicator,
    countries,
    observations,
  };
};

export default getIndicatorProps;
