import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import styled from "styled-components";
import AppLayout from "layouts/AppLayout";
import IndicatorDrawer from "components/IndicatorDrawer";
import { useStore } from "helpers/uiStore";
import getIndicators from "helpers/getIndicators";

const TableCellWithEmphasis = styled(TableCell)`
  && {
    font-weight: 500;
  }
`;

const TableBodyWithAlternatingRows = styled(TableBody)`
  & > tr:nth-of-type(odd) > td {
      background: #f8f8f8;
    }
  }

  && > tr:hover > td {
    background: #def3ff;
    cursor: pointer;
  }
`;

const IndicatorsPage = ({ indicators }) => {
  const uiStore = useStore();

  const getIndicatorById = (id) =>
    indicators.find((indicator) => indicator.id === id);

  return (
    <AppLayout Drawer={<IndicatorDrawer getIndicatorById={getIndicatorById} />}>
      <Container>
        <Box marginY={4}>
          <Typography variant="h1" color="primary" gutterBottom>
            COVID-19 Indicators
          </Typography>
          <Typography variant="body1" gutterBottom>
            The COVID-19 database of the Lancet Commission on COVID-19 contains
            over 3 million data points and more than 100 indicators. The data
            has been collected from a range of sources, including Johns Hopkins
            University, Our World in Data, Oxford, YouGov, and Google. The
            database is updated daily from Monday to Friday.
          </Typography>
        </Box>
        <Box marginTop={2}>
          <Typography variant="body1" style={{ fontWeight: 700 }}>
            Click on an indicator for details.
          </Typography>
        </Box>
        <Box my={4}>
          <TableContainer component={Paper} square>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Source</TableCell>
                </TableRow>
              </TableHead>
              <TableBodyWithAlternatingRows>
                {indicators.map((indicator) => (
                  <TableRow
                    key={indicator.id}
                    onClick={() => uiStore.openDrawer(indicator.id)}
                  >
                    <TableCell>{indicator.description}</TableCell>
                    <TableCell>{indicator.source}</TableCell>
                  </TableRow>
                ))}
              </TableBodyWithAlternatingRows>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </AppLayout>
  );
};

export const getStaticProps = async () => {
  const indicators = await getIndicators();

  return {
    props: {
      indicators,
    },
  };
};

export default IndicatorsPage;
