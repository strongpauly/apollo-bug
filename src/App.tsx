import React from "react";
import ApolloClient, { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
});

import { ApolloProvider, useQuery } from "@apollo/react-hooks";

const fragment = gql`
  fragment someFields on Rates {
    currency
    rate
  }
`;

export const EXCHANGE_RATES = gql`
  query rates {
    rates(currency: "USD") {
      ...someFields
    }
  }
  ${fragment}
`;

export function ExchangeRates() {
  const { loading, error, data } = useQuery<{
    rates: { currency: string; rate: number }[];
  }>(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div data-testid="data">
      {data &&
        data.rates.map(({ currency, rate }) => (
          <div key={currency}>
            <p>
              {currency}: {rate}
            </p>
          </div>
        ))}
    </div>
  );
}

const App = () => (
  <ApolloProvider client={client}>
    <ExchangeRates />
  </ApolloProvider>
);

export default App;
