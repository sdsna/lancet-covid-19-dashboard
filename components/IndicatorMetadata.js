import { Divider } from "@material-ui/core";
import DrawerSection from "components/DrawerSection";
import DrawerHeading from "components/DrawerHeading";
import DrawerHeadingWithCaption from "components/DrawerHeadingWithCaption";
import DrawerText from "components/DrawerText";
import DrawerActionSection from "components/DrawerActionSection";
import ExternalLinkify from "components/ExternalLinkify";

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
      <DrawerText>
        <ExternalLinkify>{indicator.reference}</ExternalLinkify>
      </DrawerText>
    </DrawerSection>
    <DrawerSection {...drawerSectionProps}>
      <DrawerHeading>License</DrawerHeading>
      <DrawerText>{indicator.license}</DrawerText>
    </DrawerSection>
    <DrawerSection {...drawerSectionProps}>
      <DrawerHeading>Notes</DrawerHeading>
      <DrawerText>
        <ExternalLinkify>{indicator.notes || "None"}</ExternalLinkify>
      </DrawerText>
    </DrawerSection>
    <DrawerSection {...drawerSectionProps}>
      <DrawerHeading>Data Repository</DrawerHeading>
      <DrawerText>
        <ExternalLinkify>{indicator.link_to_data_repository}</ExternalLinkify>
      </DrawerText>
    </DrawerSection>
    <DrawerSection {...drawerSectionProps}>
      <DrawerHeading>Raw Dataset</DrawerHeading>
      <DrawerText>
        <ExternalLinkify>{indicator.link_to_dataset}</ExternalLinkify>
      </DrawerText>
    </DrawerSection>
  </>
);

export default IndicatorMetadata;
