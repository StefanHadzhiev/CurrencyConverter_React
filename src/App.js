// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

const tempCurrencies = ["USD", "EUR", "CAD", "INR"];

export default function App() {
  const [amount, setAmount] = useState(0);
  const [currencyFrom, setCurrencyFrom] = useState("EUR");
  const [currencyTo, setCurrencyTo] = useState("USD");
  const [output, setOutput] = useState(0);

  useEffect(
    function () {
      async function fetchValueExchange() {
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${currencyFrom}&to=${currencyTo}`
          );

          if (!res.ok) {
            throw new Error("Something went wrong with fetching movies.");
          }

          const data = await res.json();
          console.log(data.rates[currencyTo]);
          setOutput(data.rates[currencyTo]);
        } catch (err) {
          console.log(err.message);
        } finally {
        }
      }

      fetchValueExchange();
    },
    [currencyFrom, currencyTo, amount]
  );

  function handleSetAmount(amount) {
    setAmount(amount);
  }

  function handleCurrencyFrom(currency) {
    setCurrencyFrom(currency);
  }

  function handleCurrencyTo(currency) {
    setCurrencyTo(currency);
  }

  return (
    <div>
      <AmountInput amount={amount} setAmount={handleSetAmount} />
      <CurrencySelector onChange={handleCurrencyFrom}>
        {currencyFrom}
      </CurrencySelector>
      <CurrencySelector onChange={handleCurrencyTo}>
        {currencyTo}
      </CurrencySelector>
      <Output output={output} />
    </div>
  );
}

function AmountInput({ amount, setAmount }) {
  return (
    <input
      type="text"
      value={amount === 0 ? "" : amount}
      onChange={(e) => setAmount(e.target.value)}
    />
  );
}

function CurrencySelector({ onChange, children }) {
  return (
    <select onChange={(e) => onChange(e.target.value)} value={children}>
      {tempCurrencies.map((curr) => (
        <option key={curr}>{curr}</option>
      ))}
    </select>
  );
}

function Output({ output }) {
  return <p>{output}</p>;
}
