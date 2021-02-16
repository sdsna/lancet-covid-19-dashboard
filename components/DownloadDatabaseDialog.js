import { observer } from "mobx-react-lite";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import { useStore } from "helpers/uiStore";

const DownloadDatabaseDialog = observer(() => {
  const uiStore = useStore();

  return (
    <Dialog
      open={uiStore.showDownloadDatabaseDialog}
      onClose={uiStore.closeDownloadDatabaseDialog}
    >
      <DialogTitle>Download COVID-19 Database</DialogTitle>
      <DialogContent>
        <DialogContentText>
          The COVID-19 database of the Lancet Commission on COVID-19 contains
          over 3 million data points and more than 100 indicators. The data has
          been collected from a range of sources, including Johns Hopkins
          University, Our World in Data, Oxford, YouGov, and Google. The
          database is updated once per week.
        </DialogContentText>
      </DialogContent>
      <DialogContent>
        <Box paddingBottom={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <Button
                component="a"
                href="https://sdsna.github.io/lancet-covid-19-database/data/database.csv"
                target="_blank"
                variant="contained"
                color="secondary"
                fullWidth
              >
                Download Database (.csv)
              </Button>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Button
                component="a"
                href="https://sdsna.github.io/lancet-covid-19-database/data/codebook.csv"
                target="_blank"
                variant="contained"
                color="secondary"
                fullWidth
              >
                Download Codebook (.csv)
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
});

export default DownloadDatabaseDialog;
