import { LayerProps } from "react-map-gl";

export const clusterLayer: LayerProps = {
  id: "clusters",
  type: "circle",
  source: "locations",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#51bbd6",
      5,
      "#f1f075",
      15,
      "#f28cb1",
    ],
    "circle-radius": ["step", ["get", "point_count"], 20, 100, 40, 750, 50],
  },
};

export const clusterCountLayer: LayerProps = {
  id: "cluster-count",
  type: "symbol",
  source: "locations",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
  paint: {},
};

export const unclusteredPointLayer: LayerProps = {
  id: "unclustered-point",
  type: "symbol",
  source: "locations",
  filter: ["!", ["has", "point_count"]],
  paint: {},
  layout: {
    "icon-image": "marker-15",
    "icon-anchor": "bottom",
  },
};
