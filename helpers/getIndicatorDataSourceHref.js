// Return path to download the dataset as csv
const getIndicatorDataSourceHref = (indicator) => {
  return indicator.link_to_data_repository;
};

export default getIndicatorDataSourceHref;
