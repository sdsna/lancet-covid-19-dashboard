import DrawerSection from "components/DrawerSection";
import DrawerHeadingWithCaption from "components/DrawerHeadingWithCaption";

const MapLegend = ({ children }) => (
  <DrawerSection>
    <DrawerHeadingWithCaption caption="Click on a country to see its performance.">
      Legend
    </DrawerHeadingWithCaption>
    {children}
  </DrawerSection>
);

export default MapLegend;
