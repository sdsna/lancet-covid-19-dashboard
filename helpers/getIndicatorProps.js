import path from "path";
import csvtojson from "csvtojson";
import { readJsonSync } from "fs-extra";
import INDICATORS from "helpers/indicators";
import getExtractionTimestamp from "helpers/getExtractionTimestamp";

const getIndicatorProps = async (indicatorSlug) => {
  // Map the slug to the indicator ID
  const indicatorId = INDICATORS.find(({ slug }) => slug === indicatorSlug)?.id;

  // Load the indicator metadata from codebook
  const codebookPath = path.join(process.cwd(), "data", "codebook.csv");
  const codebook = await csvtojson().fromFile(codebookPath);

  // Combine info from codebook and our internal definitions
  const indicator = Object.assign(
    codebook.find((entry) => entry.indicator === indicatorId),
    INDICATORS.find(({ slug }) => slug === indicatorSlug)
  );
  delete indicator.indicator;

  // Add extraction timestamp
  indicator.extractedAt = getExtractionTimestamp();

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
