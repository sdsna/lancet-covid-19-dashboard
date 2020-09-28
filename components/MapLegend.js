import DrawerSection from "components/DrawerSection";
import DrawerHeadingWithCaption from "components/DrawerHeadingWithCaption";
import MapLegendItem from "components/MapLegendItem";

// Create legend label from the domain values
const getLegendLabel = (domain, index) => {
  const isLowValueBetter = domain[0] < domain[1];

  if (index == 0)
    return `${domain[0]} and ${isLowValueBetter ? "below" : "above"}`;

  if (index == domain.length)
    return `${isLowValueBetter ? "more" : "less"} than ${domain[index - 1]}`;

  return [domain[index - 1], domain[index]].sort((a, b) => a - b).join(" — ");
};

const MapLegend = ({ scale }) => (
  <DrawerSection>
    <DrawerHeadingWithCaption caption="Click on a country to see its performance.">
      Legend
    </DrawerHeadingWithCaption>
    {scale.range.map((color, index) => (
      <MapLegendItem
        key={index}
        color={color}
        label={getLegendLabel(scale.domain, index)}
      />
    ))}
  </DrawerSection>
);

export default MapLegend;
