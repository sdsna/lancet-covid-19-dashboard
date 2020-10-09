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

const LegendLine = styled.span`
  margin-top: -1px;
  display: inline-block;
  width: 10px;
  vertical-align: middle;
  margin-right: 5px;
  border-bottom: 2px dotted ${(props) => props.styled.color};
`;

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

const getDomain = (scale) => {
  if (scale.type === "ordinal") {
    const sortedValues = scale.categories
      .map((c) => c.value)
      .sort((a, b) => a - b);

    return [sortedValues[0], sortedValues[sortedValues.length - 1]];
  }

  if (scale.type === "threshold") return [0, "auto"];
};

const IndicatorTimeseries = ({
  chartData,
  countryId,
  countryName,
  activeStep,
  onClick,
  steps,
  primaryColor,
  secondaryColor,
  stepFormatter,
  scale,
  target,
  ...otherProps
}) => (
  <DrawerSection {...otherProps}>
    <ResponsiveContainer height={200} key={countryId}>
      <LineChart data={chartData} onClick={onClick}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          // Cut off data that flows outside of the axis bounds
          allowDataOverflow={true}
          allowDecimals={false}
          domain={[0, steps]}
          dataKey="step"
          height={20}
          tick={{ fontSize: ".7rem" }}
          tickFormatter={stepFormatter}
        />
        <YAxis
          width={40}
          domain={getDomain(scale)}
          // Make sure ticks are rounded to max two decimals
          tickFormatter={(tick) => millify(tick)}
          tick={{ fontSize: ".7rem", width: 60 }}
        />
        <ReferenceLine x={activeStep} stroke={secondaryColor} />
        {target ? (
          <ReferenceLine
            ifOverflow="extendDomain"
            y={target.value}
            stroke={target.color}
            strokeWidth={2}
            strokeDasharray="3 3"
          />
        ) : null}
        <Tooltip
          separator={": "}
          labelFormatter={stepFormatter}
          content={(props) => renderTooltip({ props, countryName })}
          isAnimationActive={false}
        />
        <Line
          connectNulls
          animationDuration={1000}
          dot={false}
          stroke={primaryColor}
          dataKey={countryId}
        />
      </LineChart>
    </ResponsiveContainer>
    {target ? (
      <CustomLegend>
        <LegendLine styled={{ color: target.color }} /> {target.label}
      </CustomLegend>
    ) : null}
  </DrawerSection>
);

export default IndicatorTimeseries;
