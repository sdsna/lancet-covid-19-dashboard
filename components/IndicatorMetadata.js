import { Divider } from "@material-ui/core";
import DrawerSection from "components/DrawerSection";
import DrawerHeading from "components/DrawerHeading";
import DrawerHeadingWithCaption from "components/DrawerHeadingWithCaption";
import DrawerText from "components/DrawerText";
import DrawerActionSection from "components/DrawerActionSection";

const IndicatorMetadata = ({
  indicator,
  showActions = true,
  actionProps = {},
  showDatabaseId = false,
  drawerSectionProps = false,
}) => (
  <>
    {showActions ? (
      <>
        <DrawerActionSection indicator={indicator} {...actionProps} />
        <Divider />
      </>
    ) : null}
    <DrawerSection {...drawerSectionProps}>
      <DrawerHeading>Description</DrawerHeading>
      <DrawerText>{indicator.description}</DrawerText>
    </DrawerSection>
    <DrawerSection {...drawerSectionProps}>
      <DrawerHeading>Source</DrawerHeading>
      <DrawerText>{indicator.source}</DrawerText>
    </DrawerSection>
    {showDatabaseId ? (
      <DrawerSection {...drawerSectionProps}>
        <DrawerHeading>Database ID</DrawerHeading>
        <DrawerText>{indicator.id}</DrawerText>
      </DrawerSection>
    ) : null}
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
      <DrawerText>{indicator.notes || "None"}</DrawerText>
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
