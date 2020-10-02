import { useRouter } from "next/router";
import PageSelectionButton from "components/PageSelectionButton";

const MapPageSelectionButton = ({ children, indicators, getLink }) => {
  const router = useRouter();

  return (
    <PageSelectionButton
      options={indicators}
      getOptionLabel={(indicator) => indicator.name}
      // getOptionGroup={(indicator) => indicator.source}
      modalTitle="Select an indicator"
      modalDescription="Select an indicator to display on the map."
      onSelect={(indicator) => {
        router.push(getLink(indicator));
      }}
    >
      {children}
    </PageSelectionButton>
  );
};

export default MapPageSelectionButton;
