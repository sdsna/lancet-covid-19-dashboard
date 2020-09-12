import DrawerSection from "components/DrawerSection";
import DrawerHeading from "components/DrawerHeading";
import DrawerHeadingWithCaption from "components/DrawerHeadingWithCaption";
import DrawerText from "components/DrawerText";

const IndicatorMetadata = ({ indicator, drawerSectionProps = false }) => (
  <>
    <DrawerSection {...drawerSectionProps}>
      <DrawerHeading>Description</DrawerHeading>
      <DrawerText>{indicator.description}</DrawerText>
    </DrawerSection>
    <DrawerSection {...drawerSectionProps}>
      <DrawerHeading>Source</DrawerHeading>
      <DrawerText>{indicator.source}</DrawerText>
    </DrawerSection>
    <DrawerSection {...drawerSectionProps}>
      <DrawerHeading>Reference</DrawerHeading>
      <DrawerText>{indicator.reference}</DrawerText>
    </DrawerSection>
    <DrawerSection {...drawerSectionProps}>
      <DrawerHeading>License</DrawerHeading>
      <DrawerText>{indicator.license}</DrawerText>
    </DrawerSection>
    <DrawerSection {...drawerSectionProps}>
      <DrawerHeading>Notes</DrawerHeading>
      <DrawerText>{indicator.notes}</DrawerText>
    </DrawerSection>
    <DrawerSection {...drawerSectionProps}>
      <DrawerHeading>Links</DrawerHeading>
      <DrawerText>
        <a href={indicator.link_to_data_repository} target="_blank">
          Data Repository
        </a>
      </DrawerText>
      <DrawerText>
        <a href={indicator.link_to_dataset} target="_blank">
          Dataset
        </a>
      </DrawerText>
    </DrawerSection>
  </>
);

export default IndicatorMetadata;
