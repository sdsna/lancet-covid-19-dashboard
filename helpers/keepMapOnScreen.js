// Limit panning to keep map on screen at all times
// Based on https://ariutta.github.io/svg-pan-zoom/demo/limit-pan.html\
const keepMapOnScreen = function (oldPan, newPan) {
  const {
    width: containerWidth,
    height: containerHeight,
    realZoom: zoom,
    viewBox: { x: svgX, y: svgY, width: svgWidth, height: svgHeight },
  } = this.getSizes();

  // Gutter size is equal either to container dimension or SVG dimension
  const gutterWidth = Math.min(containerWidth, svgWidth * zoom);
  const gutterHeight = Math.min(containerHeight, svgHeight * zoom);

  // Copy-paste from https://github.com/ariutta/svg-pan-zoom/blob/e3aa8dee15d9d30645e8a0ebea82c0ce3f16d0b8/demo/limit-pan.html
  const leftLimit = gutterWidth - (svgX + svgWidth) * zoom;
  const rightLimit = containerWidth - gutterWidth - svgX * zoom;
  const topLimit = gutterHeight - (svgY + svgHeight) * zoom;
  const bottomLimit = containerHeight - gutterHeight - svgY * zoom;

  return {
    x: Math.max(leftLimit, Math.min(rightLimit, newPan.x)),
    y: Math.max(topLimit, Math.min(bottomLimit, newPan.y)),
  };
};

export default keepMapOnScreen;
