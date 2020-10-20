import path from "path";
import csvtojson from "csvtojson";
import { readJsonSync } from "fs-extra";
import { mapIndicators, indicators } from "helpers/indicators";
import getExtractionTimestamp from "helpers/getExtractionTimestamp";

const getDataForIndicator = (indicatorId) => {
  const file = path.join(
    process.cwd(),
    "data",
    "indicators",
    `${indicatorId}.csv`
  );

  return csvtojson().fromFile(file);
};

const getIndicatorProps = async (indicatorSlug) => {
  // Map the slug to the indicator ID
  const indicatorId = mapIndicators.find(({ slug }) => slug === indicatorSlug)
    ?.id;

  // Load the indicator metadata from codebook
  const codebookPath = path.join(process.cwd(), "data", "codebook.csv");
  const codebook = await csvtojson().fromFile(codebookPath);

  // Combine info from codebook and our internal definitions
  const indicator = Object.assign(
    codebook.find((entry) => entry.indicator === indicatorId),
    mapIndicators.find(({ slug }) => slug === indicatorSlug)
  );
  delete indicator.indicator;

  // Add extraction timestamp
  indicator.extractedAt = getExtractionTimestamp();

  // Load the indicator CSV file
  const data = await getDataForIndicator(indicatorId);

  // Create one object of country names and one of observations of data
  // points
  const countries = {};
  const observations = {};

  data.forEach(({ iso_code, country, date, [indicatorId]: value }) => {
    observations[iso_code] = observations[iso_code] || {};
    observations[iso_code][date] = [parseFloat(value)];

    countries[iso_code] = country;
  });

  // Add observations for supplemental indicators
  for (let i = 0; i < indicator.supplementalIndicators?.length || 0; i++) {
    // Load CSV data file
    const supplementalIndicator = indicator.supplementalIndicators[i];
    const supplementalData = await getDataForIndicator(supplementalIndicator);

    // Cycle through observations and add supplemental data
    Object.keys(observations).forEach((countryId) => {
      Object.keys(observations[countryId]).forEach((date) => {
        const value = supplementalData.find(
          (row) => row.iso_code === countryId && row.date === date
        )?.[supplementalIndicator];

        observations[countryId][date].push(parseFloat(value));
      });
    });
  }

  const supplementalIndicators = (
    indicator.supplementalIndicators || []
  ).map((id) => indicators.find((indicator) => indicator.id === id));

  return {
    indicator,
    countries,
    observations,
    supplementalIndicators,
  };
};

export default getIndicatorProps;
