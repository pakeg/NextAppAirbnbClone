"use client";

interface ICurrencyProps {
  currency?: string;
  locale?: string;
  price: number;
}

const Currency: React.FC<ICurrencyProps> = ({
  currency = "USD",
  price,
  locale = "en-US",
}) => {
  return (
    <>
      {new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
      }).format(price)}
    </>
  );
};

export default Currency;
