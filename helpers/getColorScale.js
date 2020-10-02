import { scaleOrdinal, scaleThreshold } from "d3-scale";

// Convert indicator domain and range into a color scale.
// Domain must be in order of best to worst, cutoffs are inclusive.
// TODO: Write tests to test this behavior
const getColorScale = (scale) => {
  if (scale.type === "threshold") return getThresholdScale(scale);
  if (scale.type === "ordinal") return getOrdinalScale(scale);
};

// Mapping of value thresholds to a list of colors.
const getThresholdScale = ({ domain, range }) => {
  // Are low value better than high values?
  // The d3 domain must be in order of low values to high values. The cutoffs
  // are exclusive, that's why we need to inverse all values when low values are
  // better.
  const inverseValues = domain[0] < domain[1];

  // Generate the d3 scale
  const scale = scaleThreshold()
    .domain(domain.map((v) => (inverseValues ? -v : v)).reverse())
    .range(range.slice().reverse());

  // This is the colorScale function
  return (value) => {
    return scale(inverseValues ? -value : value);
  };
};

// Discrete mapping of values to a list of colors
const getOrdinalScale = ({ categories, missingColor }) => {
  const domain = categories.map((category) => category.value);
  const range = categories.map((category) => category.color);

  return scaleOrdinal().domain(domain).range(range).unknown(missingColor);
};

export default getColorScale;
