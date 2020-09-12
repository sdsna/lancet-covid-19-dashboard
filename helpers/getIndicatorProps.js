import path from "path";
import csvtojson from "csvtojson";

const getIndicatorProps = async (indicator) => {
  // Load the indicator CSV file
  const file = path.join(
    process.cwd(),
    "data",
    "indicators",
    `${indicator}.csv`
  );
  const data = await csvtojson().fromFile(file);

  // Create one object of country names and one of observations of data
  // points
  const countries = {};
  const observations = {};

  data.forEach(({ iso_code, country, date, [indicator]: value }) => {
    observations[iso_code] = observations[iso_code] || {};
    observations[iso_code][date] = value;

    countries[iso_code] = country;
  });

  return {
    countries,
    observations,
  };
};

export default getIndicatorProps;
