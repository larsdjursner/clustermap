import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config({
  path: ".env",
});
export interface IFeatureCollection {
  type: string;
  features: IFeature[];
}
export interface IFeature {
  type: string;
  properties: {
    id: string;
    name: string;
  };
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}

export const locations: IFeatureCollection = {
  type: "FeatureCollection",
  features: [
    // {
    //   type: "Feature",
    //   properties: { id: "123", name: "first" },
    //   geometry: { type: "Point", coordinates: [18.15, 59.39] },
    // },
  ],
};

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/locations", (req, res) => {
  res.json(locations);
});

app.post("/locations", async (req, res) => {
  const item = req.body;
  locations.features.push(item);
  res.status(200).json(item);
  console.log(item);
});

app.listen(process.env.APP_PORT, () =>
  console.log(`Example app listening on port ${process.env.APP_PORT}!`)
);
