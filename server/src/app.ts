import dotenv from "dotenv";
import express from "express";
import cors from 'cors';

dotenv.config({
  path: ".env",
});

const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { id: "123" },
      geometry: { type: "Point", coordinates: [18.15, 59.39] },
    },
  ],
};

const app = express();

app.use(cors());

app.get("/locations", (req, res) => {
  console.log("struck!");
  res.json(geojson);
});

app.listen(process.env.APP_PORT, () =>
  console.log(`Example app listening on port ${process.env.APP_PORT}!`)
);
