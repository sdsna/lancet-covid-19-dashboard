import path from "path";
import { readFileSync } from "fs-extra";
import INDICATORS from "helpers/indicators";
import getIndicatorProps from "helpers/getIndicatorProps";

test("all countries are present on the map", async () => {
  // Collect countries used in data
  let countriesInData = [];
  for (let i = 0; i < INDICATORS.length; i++) {
    const { countries } = await getIndicatorProps(INDICATORS[i].slug);
    const countryIds = Object.keys(countries);
    countriesInData = new Set([...countriesInData, ...countryIds]);
  }

  // Convert country IDs from set to array
  countriesInData = Array.from(countriesInData);

  // Read map file to string
  const mapSvg = readFileSync(
    path.join(__dirname, "..", "public", "static", "map.svg"),
    "utf8"
  );

  // Collect 3-letter country IDs
  const countriesOnMap = [...mapSvg.matchAll(/id="([A-Z]{3})"/g)].map(
    (match) => match[1]
  );

  // Identify missing countries
  const missingCountries = countriesInData.filter(function (id) {
    return countriesOnMap.indexOf(id) < 0;
  });

  expect(missingCountries).toHaveLength(0);
});
