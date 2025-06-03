import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

test("renders Sign In button", () => {
  const { getByText } = render(
    <BrowserRouter>
      <LoginPage
        createUser={jest.fn()}
        loginUser={() => Promise.resolve({ status: 200 })}
        setError={jest.fn()}
      />
    </BrowserRouter>
  );

  expect(getByText("Sign In")).toBeInTheDocument();
});
