import React from "react";
import { render, fireEvent, waitFor, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPage, {
  SignUpPanel,
  SignUpModal,
  LoginForm,
} from "../pages/LoginPage";

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

test("renders Sign Up button", () => {
  const { getByText } = render(
    <BrowserRouter>
      <LoginPage
        createUser={jest.fn()}
        loginUser={() => Promise.resolve({ status: 200 })}
        setError={jest.fn()}
      />
    </BrowserRouter>
  );

  expect(getByText("Sign Up Here!")).toBeInTheDocument();
});

test("renders Sign Up button", () => {
  const { getByText } = render(
    <BrowserRouter>
      <LoginPage
        createUser={jest.fn()}
        loginUser={() => Promise.resolve({ status: 200 })}
        setError={jest.fn()}
      />
    </BrowserRouter>
  );

  expect(getByText("Sign Up Here!")).toBeInTheDocument();
});

test("renders SignUpPanel welcome text", () => {
  const { getByText } = render(<SignUpPanel changeMode={jest.fn()} />);

  expect(getByText("Welcome to Move-n-Stuff!")).toBeInTheDocument();
  expect(getByText("Sign Up Here!")).toBeInTheDocument();
});

test("renders all fields and requirement text", () => {
  const creds = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  const reqs = {
    lengthCheck: false,
    lowerCheck: false,
    upperCheck: false,
    numberCheck: false,
    specialCheck: false,
  };

  const { getByLabelText, getByText } = render(
    <SignUpModal
      onChange={jest.fn()}
      onSubmit={jest.fn()}
      creds={creds}
      changeMode={jest.fn()}
      reqs={reqs}
    />
  );

  expect(getByLabelText("Username")).toBeInTheDocument();
  expect(getByLabelText("Password")).toBeInTheDocument();
  expect(getByLabelText("Confirm Password")).toBeInTheDocument();
  expect(getByText("At least 8 characters")).toBeInTheDocument();
});

test("calls onChange when input is typed in", () => {
  const mockOnChange = jest.fn();
  const creds = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  const reqs = {
    lengthCheck: false,
    lowerCheck: false,
    upperCheck: false,
    numberCheck: false,
    specialCheck: false,
  };

  const { getByLabelText } = render(
    <SignUpModal
      onChange={mockOnChange}
      onSubmit={jest.fn()}
      creds={creds}
      changeMode={jest.fn()}
      reqs={reqs}
    />
  );

  fireEvent.change(getByLabelText("Username"), {
    target: { name: "username", value: "testuser" },
  });

  expect(mockOnChange).toHaveBeenCalled();
});

test('calls changeMode when "Back to Login" button is clicked', () => {
  const mockChangeMode = jest.fn();

  const { getByText } = render(
    <SignUpModal
      onChange={jest.fn()}
      onSubmit={jest.fn()}
      creds={{ username: "", password: "", confirmPassword: "" }}
      changeMode={mockChangeMode}
      reqs={{
        lengthCheck: true,
        lowerCheck: true,
        upperCheck: true,
        numberCheck: true,
        specialCheck: true,
      }}
    />
  );

  fireEvent.click(getByText("Back to Login"));

  expect(mockChangeMode).toHaveBeenCalledWith("login");
});

describe("LoginForm", () => {
  const creds = {
    username: "",
    password: "",
  };

  test("renders username and password fields and sign in button", () => {
    const { getByLabelText, getByText } = render(
      <LoginForm creds={creds} onChange={jest.fn()} onSubmit={jest.fn()} />
    );

    expect(getByLabelText("Username")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByText("Sign In")).toBeInTheDocument();
  });

  test("calls onChange when typing in username", () => {
    const mockOnChange = jest.fn();
    const { getByLabelText } = render(
      <LoginForm creds={creds} onChange={mockOnChange} onSubmit={jest.fn()} />
    );

    fireEvent.change(getByLabelText("Username"), {
      target: { name: "username", value: "testuser" },
    });

    expect(mockOnChange).toHaveBeenCalled();
  });

  test("calls onChange when typing in password", () => {
    const mockOnChange = jest.fn();
    const { getByLabelText } = render(
      <LoginForm creds={creds} onChange={mockOnChange} onSubmit={jest.fn()} />
    );

    fireEvent.change(getByLabelText("Password"), {
      target: { name: "password", value: "secret" },
    });

    expect(mockOnChange).toHaveBeenCalled();
  });

  test("calls onSubmit when form is submitted", () => {
    const mockOnSubmit = jest.fn((e) => e.preventDefault());
    const { getByRole } = render(
      <LoginForm creds={creds} onChange={jest.fn()} onSubmit={mockOnSubmit} />
    );

    fireEvent.submit(getByRole("form"));

    expect(mockOnSubmit).toHaveBeenCalled();
  });
});

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("LoginPage", () => {
  test("renders Sign In button and login fields", () => {
    const { getByText, getByLabelText } = render(
      <BrowserRouter>
        <LoginPage
          createUser={jest.fn()}
          loginUser={jest.fn(() => Promise.resolve({ status: 200 }))}
          setError={jest.fn()}
        />
      </BrowserRouter>
    );

    expect(getByText("Sign In")).toBeInTheDocument();
    expect(getByLabelText("Username")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
  });

  test("submits login form and calls loginUser with credentials", async () => {
    const mockLoginUser = jest.fn(() => Promise.resolve({ status: 200 }));

    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <LoginPage
          createUser={jest.fn()}
          loginUser={mockLoginUser}
          setError={jest.fn()}
        />
      </BrowserRouter>
    );

    fireEvent.change(getByLabelText("Username"), {
      target: { name: "username", value: "testuser" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { name: "password", value: "testpass" },
    });

    fireEvent.click(getByText("Sign In"));

    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledWith({
        username: "testuser",
        password: "testpass",
      });
    });

    expect(mockNavigate).toHaveBeenCalledWith("/containers");
  });

  test('shows SignUpModal after clicking "Sign Up Here!"', () => {
    const { getByText, getByLabelText } = render(
      <BrowserRouter>
        <LoginPage
          createUser={jest.fn()}
          loginUser={jest.fn()}
          setError={jest.fn()}
        />
      </BrowserRouter>
    );

    fireEvent.click(getByText("Sign Up Here!"));

    expect(getByText("Back to Login")).toBeInTheDocument();
    expect(getByLabelText("Confirm Password")).toBeInTheDocument();
  });

  test("blocks signup if passwords do not match", () => {
    const mockSetError = jest.fn();

    const { getByText, container } = render(
      <BrowserRouter>
        <LoginPage
          createUser={jest.fn()}
          loginUser={jest.fn()}
          setError={mockSetError}
        />
      </BrowserRouter>
    );

    fireEvent.click(getByText("Sign Up Here!"));

    const modal = container.querySelector(".modal-background");
    const { getByLabelText: getByLabelInModal, getByText: getByTextInModal } =
      within(modal);

    fireEvent.change(getByLabelInModal("Username"), {
      target: { name: "username", value: "newuser" },
    });
    fireEvent.change(getByLabelInModal("Password"), {
      target: { name: "password", value: "ValidPass1!" },
    });
    fireEvent.change(getByLabelInModal("Confirm Password"), {
      target: { name: "confirmPassword", value: "WrongPass" },
    });

    fireEvent.click(getByTextInModal("Sign Up"));

    expect(mockSetError).toHaveBeenCalledWith("Passwords must match");
  });
});
