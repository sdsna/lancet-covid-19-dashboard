// Return path to the indicator map
const getIndicatorMapHref = (indicator, { embed } = { embed: false }) => {
  let path = `/map/${indicator.slug}`;

  // If in embed mode, add embed
  if (embed) path += "/embed";

  return path;
};

export default getIndicatorMapHref;
