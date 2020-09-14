import {
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import DefaultTooltipContent from "recharts/lib/component/DefaultTooltipContent";
import millify from "millify";
import { Box, Typography } from "@material-ui/core";
import styled from "styled-components";
import DrawerSection from "components/DrawerSection";

const CustomLegend = styled(Typography).attrs({
  variant: "caption",
  display: "block",
  align: "center",
})``;

const renderTooltip = ({ props, countryName }) => {
  // payload[0] doesn't exist when tooltip isn't visible
  if (props.payload && props.payload[0] != null) {
    const { payload } = props;

    const newPayload = [
      {
        name: countryName,
        value: Number(payload[0].value).toLocaleString(),
      },
    ];

    // we render the default, but with our overridden payload
    return <DefaultTooltipContent {...props} payload={newPayload} />;
  }

  // we just render the default
  return <DefaultTooltipContent {...props} />;
};

const IndicatorTimeseries = ({
  chartData,
  countryId,
  countryName,
  ...otherProps
}) => {
  return (
    <DrawerSection {...otherProps}>
      <ResponsiveContainer height={200} key={countryId}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" height={20} tick={{ fontSize: ".7rem" }} />
          <YAxis
            width={40}
            domain={[0, "auto"]}
            // Make sure ticks are rounded to max two decimals
            tickFormatter={(tick) => millify(tick)}
            tick={{ fontSize: ".7rem", width: 60 }}
          />
          <Tooltip
            separator={": "}
            content={(props) => renderTooltip({ props, countryName })}
            isAnimationActive={false}
          />
          <Line
            connectNulls
            animationDuration={1000}
            dot={false}
            dataKey={countryId}
          />
        </LineChart>
      </ResponsiveContainer>
    </DrawerSection>
  );
};

export default IndicatorTimeseries;
