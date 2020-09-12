import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { SvgLoader, SvgProxy } from "react-svgmt";
import svgPanZoom from "svg-pan-zoom";
import Hammer from "hammerjs";
import styled from "styled-components";
import { useStore } from "helpers/uiStore";
import { useMapStore } from "helpers/mapStore";
import keepMapOnScreen from "helpers/keepMapOnScreen";

const NormalizedSvg = styled(SvgLoader)`
  width: 100%;
  height: 100%;
  display: block;
  opacity: 0;
  transition: opacity 0.3s ease-out;

  .countries,
  circle[id]:not([fill]) {
    fill: #e1e1e1;
  }

  [clickable="clickable"] {
    cursor: pointer;
  }

  .geojson {
    stroke: #fff;
    fill: none;
    stroke-width: 1;
    stroke-dasharray: 1;
  }
`;

// Mobile touch events: From http://ariutta.github.io/svg-pan-zoom/demo/mobile.html
const eventsHandler = {
  haltEventListeners: [
    "touchstart",
    "touchend",
    "touchmove",
    "touchleave",
    "touchcancel",
  ],
  init: function (options) {
    var instance = options.instance,
      initialScale = 1,
      pannedX = 0,
      pannedY = 0;

    // Init Hammer
    // Listen only for pointer and touch events
    this.hammer = Hammer(options.svgElement, {
      inputClass: Hammer.SUPPORT_POINTER_EVENTS
        ? Hammer.PointerEventInput
        : Hammer.TouchInput,
    });

    // Enable pinch
    this.hammer.get("pinch").set({ enable: true });

    // Handle double tap
    this.hammer.on("doubletap", function (ev) {
      instance.zoomIn();
    });

    // Handle pan
    this.hammer.on("panstart panmove", function (ev) {
      // On pan start reset panned variables
      if (ev.type === "panstart") {
        pannedX = 0;
        pannedY = 0;
      }

      // Pan only the difference
      instance.panBy({ x: ev.deltaX - pannedX, y: ev.deltaY - pannedY });
      pannedX = ev.deltaX;
      pannedY = ev.deltaY;
    });

    // Handle pinch
    this.hammer.on("pinchstart pinchmove", function (ev) {
      // On pinch start remember initial zoom
      if (ev.type === "pinchstart") {
        initialScale = instance.getZoom();
        instance.zoomAtPoint(initialScale * ev.scale, {
          x: ev.center.x,
          y: ev.center.y,
        });
      }

      instance.zoomAtPoint(initialScale * ev.scale, {
        x: ev.center.x,
        y: ev.center.y,
      });
    });

    // Prevent moving the page on some devices when panning over SVG
    options.svgElement.addEventListener("touchmove", function (e) {
      e.preventDefault();
    });
  },
  destroy: function () {
    this.hammer.destroy();
  },
};

const onSVGReady = (node) => {
  window.zoomAndPan = svgPanZoom(node, {
    zoomScaleSensitivity: 1,
    minZoom: 0.66,
    beforePan: keepMapOnScreen,
    fit: 1,
    center: 1,
    customEventsHandler: eventsHandler,
  });

  // Only display SVG after it's been centered on the screen,
  // otherwise we get positional flashes
  node.style.opacity = "1";
};

const MapSvgSection = observer(({ data }) => {
  const mapStore = useMapStore();
  const uiStore = useStore();

  useEffect(() => {
    return () => {
      window?.zoomAndPan?.destroy();
      window.zoomAndPan = null;
    };
  }, []);

  return (
    <NormalizedSvg path="/static/map.svg" onSVGReady={onSVGReady}>
      <>
        {data.map(({ countryId, fill, disabled }) => (
          <SvgProxy
            key={countryId}
            selector={`#${countryId}`}
            clickable={disabled ? "disabled" : "clickable"}
            fill={fill}
            onClick={() => !disabled && uiStore.openDrawer(countryId)}
            onMouseMove={(event) => mapStore.showTooltip({ event, countryId })}
            onMouseLeave={mapStore.hideTooltip}
          />
        ))}
      </>
    </NormalizedSvg>
  );
});

export default MapSvgSection;
