import React, { useState } from "react";
import { useGetCryptoNewsQuery } from "../queries/newsQuery";
import loading from "../assets/Rolling.svg";
import {
  Autocomplete,
  Avatar,
  Card,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import icon from "../assets/icon.gif";
import { useGetCoinsQuery } from "../queries/cryptoApi";

export default function News({ hello }) {
  let count = 100;
  const [filterName, setFilterName] = useState("CryptoCurrency");
  const { data: coin } = useGetCoinsQuery(count);
  let { data: data, isLoading } = useGetCryptoNewsQuery({
    newsCategory: filterName,
    count: hello ? 12 : 50,
  });
  if (isLoading)
    return (
      <div className="loading">
        <img src={loading} width="50px" />
      </div>
    );

  let newsArticles = data.value;
  let coins = coin?.data?.coins;
  let names = coins && coins.map((coin) => coin.name);
  names = coins && names.sort();

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
      <div className="news-container">
        {newsArticles.map((news, i) => (
          <Card
            key={i}
            className="card"
            style={{ justifyContent: "space-between" }}
          >
            <div className="head" style={{ display: "flex", gap: "10px" }}>
              <Typography variant="p">{news.name}</Typography>
              <Avatar variant="square" sx={{ width: 100, height: 100 }}>
                <img
                  src={news?.image?.thumbnail?.contentUrl || icon}
                  style={{ width: "100%" }}
                />
              </Avatar>
            </div>
            <Divider />

            <Typography variant="p">{news?.description}</Typography>

            <div
              className="footer"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <Avatar
                src={news?.provider[0]?.image?.thumbnail?.contentUrl || icon}
                alt="src"
              />
              <Typography variant="p">{news.provider[0].name}</Typography>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
