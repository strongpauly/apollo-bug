import React from "react";
import { render } from "@testing-library/react";
import { ExchangeRates, EXCHANGE_RATES } from "./App";
import { MockedProvider, MockedResponse } from "@apollo/react-testing";
import "@testing-library/jest-dom/extend-expect";

const mockedResponses: MockedResponse[] = [
  {
    request: {
      query: EXCHANGE_RATES,
    },
    result: {
      data: { rates: [{ __typename: "Rate", currency: "USD", rate: 1 }] },
    },
  },
];

test("mocks results", async () => {
  const { getByText, findByTestId } = render(
    <MockedProvider mocks={mockedResponses}>
      <ExchangeRates />
    </MockedProvider>
  );
  expect(getByText(/loading/i)).toBeInTheDocument();
  const data = await findByTestId("data");
  expect(data).toBeInTheDocument();
  expect(getByText("USD: 1")).toBeInTheDocument();
});
