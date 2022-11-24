import {
  Autocomplete,
  Avatar,
  Badge,
  Card,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import millify from "millify";
import React, { useEffect, useState } from "react";
import { useGetCoinsQuery } from "../../queries/cryptoApi";
import loading from "../../assets/Rolling.svg";

export default function Coins({ hello }) {
  const count = hello ? 10 : 100;
  const { data: data, isLoading } = useGetCoinsQuery(count);
  const [filterName, setFilterName] = useState("");
  if (isLoading)
    return (
      <div className="loading">
        <img src={loading} width="50px" />
      </div>
    );
  let coins = data?.data?.coins;
  let names = coins.map((coin) => coin.name);

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
          <div key={coin.uuid}>
            <Card className="card">
              <div
                className="title"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="h6">{coin.rank}</Typography>
                <Avatar src={coin.iconUrl} />
              </div>
              <Divider />
              <Typography variant="h5">{coin.name}</Typography>
              <Typography variant="h6">
                Price : {millify(coin.price)}$
              </Typography>
              <Typography variant="h6">
                Change : {millify(coin.change)}%
              </Typography>
              <Typography variant="h6">
                Total Market Cap : {millify(coin.marketCap)}
              </Typography>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
