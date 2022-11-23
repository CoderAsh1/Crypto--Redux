import { useGetCoinsQuery } from "../../queries/cryptoApi";
import millify from "millify";
import { Chip, Grid, Typography } from "@mui/material";
import "./home.scss";
import Coins from "../coins/Coins";
import loading from "../../assets/Rolling.svg";

export default function Home() {
  let count = 10;
  const { data: data, isLoading } = useGetCoinsQuery(count);

  if (isLoading)
    return (
      <div className="loading">
        <img src={loading} width="50px" />
      </div>
    );

  let globalData = data?.data?.stats;
  const { total, totalExchanges, totalMarketCap, total24hVolume } = globalData;

  return (
    <div className="home">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Chip label="Total CryptoCurrency" />
          <Typography variant="h3">{total} </Typography>
        </Grid>
        <Grid item xs={6}>
          <Chip label="Total Exchanges" />
          <Typography variant="h3">{totalExchanges}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Chip label="Total Markets " />
          <Typography variant="h3">{millify(total24hVolume)}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Chip label="Total MarketCap" />
          <Typography variant="h3">{millify(totalMarketCap)}</Typography>
        </Grid>
      </Grid>
      <Typography variant="h3">Top 10 Crypto Currencies</Typography>
      <Coins hello />
    </div>
  );
}
