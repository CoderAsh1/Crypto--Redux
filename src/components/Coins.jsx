import {
  Autocomplete,
  Avatar,
  Card,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import millify from "millify";
import React, { useState } from "react";
import { useGetCoinsQuery } from "../queries/cryptoApi";
import { Link } from "react-router-dom";
import Loading from "./Loading";

export default function Coins({ hello }) {
  const count = hello ? 12 : 100;
  const { data: data, isLoading } = useGetCoinsQuery(count);
  if (isLoading) return <Loading />;

  const [filterName, setFilterName] = useState("");
  let coins = data?.data?.coins;
  let names = coins.map((coin) => coin.name);
  names = names.sort();

  function filter() {
    let tempCoins = coins;
    if (filterName) {
      tempCoins = tempCoins.filter((coin) => coin.name === filterName);
    }
    return tempCoins;
  }

  return (
    <>
      {!hello && (
        <Autocomplete
          style={{ margin: "0 auto 2rem auto" }}
          disablePortal
          id="combo-box-demo"
          options={names}
          sx={{ width: 300 }}
          onChange={(e) => setFilterName(e.target.innerText)}
          renderInput={(params) => <TextField {...params} label="Coins" />}
        />
      )}
      <div className="coin-container">
        {filter().map((coin) => (
          <Link to={`/coins/${coin.uuid}`} key={coin.uuid}>
            <Card className="card">
              <div
                className="title"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="p">{coin.rank}</Typography>
                <Avatar src={coin.iconUrl} />
              </div>
              <Divider />
              <Typography variant="h5">{coin.name}</Typography>
              <Typography variant="p">
                Price : {millify(coin.price)}$
              </Typography>
              <Typography variant="p">
                Change : {millify(coin.change)}%
              </Typography>
              <Typography variant="p">
                Total Market Cap : {millify(coin.marketCap)}
              </Typography>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
