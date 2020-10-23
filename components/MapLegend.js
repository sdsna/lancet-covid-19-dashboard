import { createElement } from "react";
import DrawerSection from "components/DrawerSection";
import DrawerHeadingWithCaption from "components/DrawerHeadingWithCaption";
import MapLegendItem from "components/MapLegendItem";

// Add thousand separators to numbers
const numberFormat = (value) => Number(value).toLocaleString();

// Create legend label from the domain values
const getLegendLabel = (domain, index) => {
  const isLowValueBetter = domain[0] < domain[1];

  if (index == 0)
    return `${numberFormat(domain[0])} and ${
      isLowValueBetter ? "below" : "above"
    }`;

  if (index == domain.length)
    return `${isLowValueBetter ? "more" : "less"} than ${numberFormat(
      domain[index - 1]
    )}`;

  // Set separator as "—", unless the numbers are negative, then we use "to"
  const separator = domain.every((value) => value >= 0) ? "—" : "to";

  return [domain[index - 1], domain[index]]
    .sort((a, b) => a - b)
    .map((value) => numberFormat(value))
    .join(` ${separator} `);
};

const MapLegendThreshold = ({ range, domain }) => (
  <>
    {range.map((color, index) => (
      <MapLegendItem
        key={index}
        color={color}
        label={getLegendLabel(domain, index)}
      />
    ))}
  </>
);

const MapLegendOrdinal = ({ categories, missingColor }) => (
  <>
    {categories.map(({ value, color, label }) => (
      <MapLegendItem key={value} color={color} label={label} />
    ))}
    <MapLegendItem color={missingColor} label="Missing Data" />
  </>
);

const LEGENDS = {
  ordinal: MapLegendOrdinal,
  threshold: MapLegendThreshold,
};

const MapLegend = ({ scale }) => (
  <DrawerSection>
    <DrawerHeadingWithCaption caption="Click on a country to see its performance.">
      Legend
    </DrawerHeadingWithCaption>
    {createElement(LEGENDS[scale.type], { ...scale })}
  </DrawerSection>
);

export default MapLegend;
