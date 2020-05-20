import React from "react";
import { render } from "@testing-library/react";
import { ExchangeRates, EXCHANGE_RATES, EXCHANGE_RATES_FRAGMENT } from "./App";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import "@testing-library/jest-dom/extend-expect";

test("mocks results fine when not using fragments", async () => {
  const { getByText, findByTestId } = render(
    <MockedProvider
      mocks={[
        {
          request: {
            query: EXCHANGE_RATES,
          },
          result: {
            data: { rates: [{ __typename: "Rate", currency: "USD", rate: 1 }] },
          },
        },
      ]}
    >
      <ExchangeRates />
    </MockedProvider>
  );
  expect(getByText(/loading/i)).toBeInTheDocument();
  const data = await findByTestId("data");
  expect(data).toBeInTheDocument();
  expect(getByText("USD: 1")).toBeInTheDocument();
});

test("mocks results fine when using fragments", async () => {
  const { getByText, findByTestId } = render(
    <MockedProvider
      mocks={[
        {
          request: {
            query: EXCHANGE_RATES_FRAGMENT,
          },
          result: {
            data: { rates: [{ __typename: "Rate", currency: "USD", rate: 1 }] },
          },
        },
      ]}
    >
      <ExchangeRates useFragment={true} />
    </MockedProvider>
  );
  expect(getByText(/loading/i)).toBeInTheDocument();
  const data = await findByTestId("data");
  expect(data).toBeInTheDocument();
  expect(getByText("USD: 1")).toBeInTheDocument();
});
