import express from "express";
import cors from "cors";
import {
  changeCountry,
  createCountry,
  deleteCountry,
  getAllCountries,
  getCountryByID,
  searchCountries
} from "./handlers/countries";
import { AddressInfo } from "net";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/countries", getAllCountries);
app.post("/countries", createCountry);
app.get("/countries/search", searchCountries);
app.get("/countries/:id", getCountryByID);
app.post("/countries/:id", changeCountry);
app.delete("/countries/:id", deleteCountry);

const server = app.listen(process.env["PORT"] || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    //eslint-disable-next-line no-console
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    //eslint-disable-next-line no-console
    console.error("Failure upon starting server.");
  }
});
