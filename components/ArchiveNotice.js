import { useState } from "react";
import Link from "next/link";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const ArchiveNotice = () => {
  const [isOpen, setIsOpen] = useState(true);

  const close = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>COVID-19 Portal: Archive Notice</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          The COVID-19 Data Portal of the Lancet COVID-19 Commission has been
          archived. It is now read-only. The data is no longer being updated and
          the indicator set is no longer being maintained. On our{" "}
          <Link href="/indicators">
            <a onClick={close}>indicators page</a>
          </Link>
          , you will find references and links to the source data sets which
          will allow you to check for data updates directly with the data
          providers.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={close} color="primary">
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ArchiveNotice;
