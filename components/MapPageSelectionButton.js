import { useRouter } from "next/router";
import PageSelectionButton from "components/PageSelectionButton";

const MapPageSelectionButton = ({ children, indicators }) => {
  const router = useRouter();

  return (
    <PageSelectionButton
      options={indicators}
      getOptionLabel={(indicator) => indicator.id}
      getOptionGroup={(indicator) => indicator.source}
      modalTitle="Select an indicator"
      modalDescription="Select an indicator to display on the map."
      onSelect={(indicator) => {
        router.push("/map");
      }}
    >
      {children}
    </PageSelectionButton>
  );
};

export default MapPageSelectionButton;
