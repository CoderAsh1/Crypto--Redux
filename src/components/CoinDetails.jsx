import { Autocomplete, Avatar, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCoinHistoryQuery, useGetCoinQuery } from "../queries/cryptoApi";
import Loading from "./Loading";
import millify from "millify";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LineChart from "./LineChart";

const CoinDetails = () => {
  const [timeFrame, setTimeFrame] = useState("7d");
  let { id } = useParams();
  let { data: data, isLoading } = useGetCoinQuery(id);

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  let { data: history } = useGetCoinHistoryQuery({ id, time: timeFrame });

  if (isLoading) return <Loading />;
  let coin = data.data.coin;

  function createData(name, detail) {
    return { name, detail };
  }

  const rows = [
    createData("Rank", coin.rank),
    createData("All time high", millify(coin.allTimeHigh.price)),
    createData("Total Supply", coin.supply.total),
    createData("MarketCap", millify(coin.marketCap)),
    createData("Price", millify(coin.price)),
    createData("% Change", coin.change),
  ];

  return (
    <div className="single-container">
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        <Avatar src={coin.iconUrl} />
        <Typography variant="h4" sx={{ color: coin.color }}>
          {coin.symbol} - {coin.name}
        </Typography>
      </div>
      <div className="auto">
        <Autocomplete
          style={{ margin: "0 auto 2rem auto" }}
          disablePortal
          id="combo-box-demo"
          options={time}
          onChange={(e) => setTimeFrame(e.target.innerText)}
          renderInput={(params) => <TextField {...params} label="Time" />}
        />
      </div>
      <div className="chart-container">
        <TableContainer component={Paper} sx={{ maxWidth: 350 }}>
          <Table aria-label="simple table">
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.detail}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <LineChart history={history} timeFrame={timeFrame} />
      </div>
    </div>
  );
};

export default CoinDetails;
