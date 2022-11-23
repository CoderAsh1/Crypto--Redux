import { Avatar, Badge, Card, Divider, Typography } from "@mui/material";
import millify from "millify";
import React from "react";
import { useGetCoinsQuery } from "../../queries/cryptoApi";
import loading from "../../assets/Rolling.svg";

export default function Coins({ hello }) {
  const count = hello ? 10 : 100;
  const { data: data, isLoading } = useGetCoinsQuery(count);
  if (isLoading)
    return (
      <div className="loading">
        <img src={loading} width="50px" />
      </div>
    );
  const coins = data?.data?.coins;

  return (
    <div className="coin-container">
      {coins.map((coin) => (
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
            <Typography variant="h6">Price : {millify(coin.price)}$</Typography>
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
  );
}
