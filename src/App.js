import "./styles.css";
import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: true,
};
const miniDeposit = 500;
function reducer(state, action) {
  switch (action.type) {
    case "open":
      return {
        ...state,
        balance: state.balance + miniDeposit,
        isActive: false,
      };
    case "deposit":
      return { ...state, balance: state.balance + action.payload };
    case "withdraw":
      return {
        ...state,
        balance:
          state.balance > 0 ? state.balance - action.payload : state.balance,
      };
    case "request":
      if (state.loan !== 0) return { ...state };
      return {
        ...state,
        loan: state.loan + action.payload,
        balance: state.balance + action.payload,
      };
    case "payLoan":
      return {
        ...state,
        loan: state.loan - action.payload,
        balance: state.balance - action.payload,
      };
    case "close":
      if (state.balance === 0)
        return {
          ...initialState,
        };
      return { ...state };
  }
}

export default function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => {
            dispatch({ type: "open" });
          }}
          disabled={!isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "deposit", payload: 150 });
          }}
          disabled={isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "withdraw", payload: 50 });
          }}
          disabled={isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "request", payload: 5000 });
          }}
          disabled={isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "payLoan", payload: 5000 });
          }}
          disabled={isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "close" });
          }}
          disabled={isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
