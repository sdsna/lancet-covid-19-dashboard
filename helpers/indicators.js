const INDICATORS = [
  {
    slug: "daily-cases-per-million",
    id: "owid_new_cases_per_million",
    name: "Daily Cases Per Million",
    scale: {
      domain: [5, 10, 50, 100],
      range: ["#7cb9e0", "#97bae2", "#f5ad72", "#df6b6c", "#ce2127"],
    },
  },
  {
    slug: "daily-deaths-per-million",
    id: "owid_new_deaths_per_million",
    name: "Daily Deaths Per Million",
    scale: {
      domain: [0.2, 0.5, 1, 2],
      range: ["#7cb9e0", "#97bae2", "#f5ad72", "#df6b6c", "#ce2127"],
    },
  },
  {
    slug: "effective-reproduction-rate",
    id: "marioli_effective_reproduction_rate",
    name: "Effective Reproduction Rate",
    scale: {
      domain: [0.8, 1, 1.2, 1.5],
      range: ["#7cb9e0", "#97bae2", "#f5ad72", "#df6b6c", "#ce2127"],
    },
  },
  {
    slug: "positive-rate",
    id: "owid_positive_rate",
    name: "Positive Rate",
    scale: {
      domain: [0.01, 0.02, 0.05, 0.1],
      range: ["#7cb9e0", "#97bae2", "#f5ad72", "#df6b6c", "#ce2127"],
    },
  },
  {
    slug: "tests-per-case",
    id: "owid_tests_per_case",
    name: "Tests Per Case",
    scale: {
      domain: [100, 50, 20, 10],
      range: ["#7cb9e0", "#97bae2", "#f5ad72", "#df6b6c", "#ce2127"],
    },
  },
];

module.exports = INDICATORS;
