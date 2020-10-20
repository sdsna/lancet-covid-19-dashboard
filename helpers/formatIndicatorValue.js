import millify from "millify";

const valueToString = ({ value, approximate }) => {
  // If approximate, convert 1000 to K and million to M
  if (approximate) return millify(value);

  return Number(value).toLocaleString();
};

const formatIndicatorValue = ({ value, indicator, approximate = false }) => {
  if (value != null) {
    const { scale } = indicator;

    if (scale.type === "threshold")
      return valueToString({ value, approximate });
    if (scale.type === "ordinal")
      return scale.categories.find((c) => c.value === value).label;
  }

  return "No value";
};

export default formatIndicatorValue;
