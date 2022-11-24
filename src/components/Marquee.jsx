import millify from "millify";
import { useGetCoinsQuery } from "../queries/cryptoApi";

const Marquee = () => {
  const { data: data, isLoading } = useGetCoinsQuery(20);

  if (isLoading) return "loading...";
  const coins = data?.data?.coins;

  return (
    <marquee>
      {coins.map((coin) => (
        <span id="cont" key={coin.uuid}>
          <span>{coin.name}</span>:<span>{millify(coin.price)}$</span>
        </span>
      ))}
    </marquee>
  );
};

export default Marquee;
