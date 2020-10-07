const INDICATORS = [
  {
    slug: "overall-transmission",
    id: "sdsn_overall_transmission",
    name: "COVID-19 Overall Transmission",
    hasMap: true,
    scale: {
      type: "ordinal",
      categories: [
        {
          value: 1,
          color: "#7cb9e0",
          label: "Suppression (1)",
        },
        {
          value: 2,
          color: "#97bae2",
          label: "Low (2)",
        },
        {
          value: 3,
          color: "#f5ad72",
          label: "Medium (3)",
        },
        {
          value: 4,
          color: "#df6b6c",
          label: "High (4)",
        },
        {
          value: 5,
          color: "#ce2127",
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
      range: ["#7cb9e0", "#97bae2", "#f5ad72", "#df6b6c", "#ce2127"],
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
      range: ["#7cb9e0", "#97bae2", "#f5ad72", "#df6b6c", "#ce2127"],
    },
  },
  {
    slug: "effective-reproduction-rate",
    id: "marioli_effective_reproduction_rate",
    name: "Effective Reproduction Rate",
    hasMap: true,
    scale: {
      type: "threshold",
      domain: [0.8, 1, 1.2, 1.5],
      range: ["#7cb9e0", "#97bae2", "#f5ad72", "#df6b6c", "#ce2127"],
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
      range: ["#7cb9e0", "#97bae2", "#f5ad72", "#df6b6c", "#ce2127"],
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
      range: ["#7cb9e0", "#97bae2", "#f5ad72", "#df6b6c", "#ce2127"],
    },
  },
];

module.exports = INDICATORS;
