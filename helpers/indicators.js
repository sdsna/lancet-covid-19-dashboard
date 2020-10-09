const LIGHT_BLUE = "#97caeb";
const MEDIUM_BLUE = "#97bae2";
const DARK_BLUE = "#4e8dd6";
const ORANGE = "#f5ad72";
const LIGHT_RED = "#df6b6c";
const DARK_RED = "#ce2127";

const INDICATORS = [
  {
    slug: "overall-transmission",
    id: "sdsn_overall_transmission",
    name: "COVID-19 Overall Transmission",
    hasMap: true,
    // There is no much data prior to March 1st, so we start the timeslider on
    // March 1st
    startDate: "2020-03-01",
    scale: {
      type: "ordinal",
      categories: [
        {
          value: 1,
          color: LIGHT_BLUE,
          label: "Suppressed (1)",
        },
        {
          value: 2,
          color: DARK_BLUE,
          label: "Low (2)",
        },
        {
          value: 3,
          color: ORANGE,
          label: "Medium (3)",
        },
        {
          value: 4,
          color: LIGHT_RED,
          label: "High (4)",
        },
        {
          value: 5,
          color: DARK_RED,
          label: "Very High (5)",
        },
      ],
      missingColor: "#e1e1e1",
    },
  },
  {
    slug: "new-cases-per-million",
    id: "owid_new_cases_per_million",
    name: "New Cases Per Million",
    hasMap: true,
    scale: {
      type: "threshold",
      domain: [5, 10, 50, 100],
      range: [LIGHT_BLUE, DARK_BLUE, ORANGE, LIGHT_RED, DARK_RED],
    },
  },
  {
    slug: "new-deaths-per-million",
    id: "owid_new_deaths_per_million",
    name: "New Deaths Per Million",
    hasMap: true,
    scale: {
      type: "threshold",
      domain: [0.2, 0.5, 1, 2],
      range: [LIGHT_BLUE, DARK_BLUE, ORANGE, LIGHT_RED, DARK_RED],
    },
  },
  {
    slug: "effective-reproduction-rate",
    id: "marioli_effective_reproduction_rate",
    name: "Effective Reproduction Rate",
    hasMap: true,
    target: {
      value: 1,
      color: ORANGE,
      label: "Target: ERR <= 1",
    },
    scale: {
      type: "threshold",
      domain: [1, 1.2, 1.5],
      range: [MEDIUM_BLUE, ORANGE, LIGHT_RED, DARK_RED],
    },
  },
  {
    slug: "positive-test-rate",
    id: "owid_positive_rate",
    name: "Positive Test Rate",
    hasMap: true,
    scale: {
      type: "threshold",
      domain: [0.01, 0.02, 0.05, 0.1],
      range: [LIGHT_BLUE, DARK_BLUE, ORANGE, LIGHT_RED, DARK_RED],
    },
  },
  {
    slug: "tests-per-case",
    id: "owid_tests_per_case",
    name: "Tests Per Case",
    hasMap: true,
    scale: {
      type: "threshold",
      domain: [100, 50, 20, 10],
      range: [LIGHT_BLUE, DARK_BLUE, ORANGE, LIGHT_RED, DARK_RED],
    },
  },
];

module.exports = INDICATORS;
