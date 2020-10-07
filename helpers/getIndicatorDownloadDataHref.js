// Return path to download the dataset as csv
const getIndicatorDownloadDataHref = (indicator) => {
  return `https://sdsna.github.io/lancet-covid-19-database/data/indicators/${indicator.id}.csv`;
};

export default getIndicatorDownloadDataHref;
