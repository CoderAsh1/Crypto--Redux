import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//? calling api with RTK Query
const baseUrl = "https://coinranking1.p.rapidapi.com";
const apiHeaders = {
  "X-RapidAPI-Key": "ba87fb649bmshffba27713de7994p1d5558jsn555001b771cb",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const cryptoUrl = (url) => ({ url, headers: apiHeaders });

export const cryptoApiSlice = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getCoins: builder.query({
      query: (count) => cryptoUrl(`/coins?limit=${count}`),
    }),
    getCoin: builder.query({
      query: (id) => cryptoUrl(`/coin/${id}`),
    }),
    getCoinHistory: builder.query({
      query: ({ id, time }) =>
        cryptoUrl(`/coin/${id}/history?timePeriod=${time}`),
    }),
  }),
});

export const { useGetCoinsQuery, useGetCoinQuery, useGetCoinHistoryQuery } =
  cryptoApiSlice;
