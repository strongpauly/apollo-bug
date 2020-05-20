import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  useQuery,
  HttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://48p1r2roz4.sse.codesandbox.io",
  }),
});

const fragment = gql`
  fragment someFields on Rates {
    currency
    rate
  }
`;

export const EXCHANGE_RATES = gql`
  query rates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

export const EXCHANGE_RATES_FRAGMENT = gql`
  query rates {
    rates(currency: "USD") {
      ...someFields
    }
  }
  ${fragment}
`;

export function ExchangeRates({
  useFragment = false,
}: {
  useFragment?: boolean;
}) {
  const { loading, error, data } = useQuery<{
    rates: { currency: string; rate: number }[];
  }>(useFragment ? EXCHANGE_RATES_FRAGMENT : EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div data-testid="data">
      {data &&
        data.rates.map(({ currency, rate }, index) => (
          <div key={index}>
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
