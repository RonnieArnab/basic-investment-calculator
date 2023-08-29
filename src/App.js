import React, { useState } from "react";
import logo from "./assets/investment-calculator-logo.png";
import InvestmentForm from "./components/InvestmentFrom/InvestmentForm";
import Result from "./components/Result/Result";

function App() {
  const [userInput, setuserInput] = useState(null);

  const calculateHandler = (userInput) => {
    setuserInput(userInput);
  };

  const yearlyData = [];

  if (userInput) {
    let currentSavings = +userInput["current-savings"];
    const yearlyContribution = +userInput["yearly-contribution"];
    const expectedReturn = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div>
      <header className="header">
        <img src={logo} alt="logo" />
        <h1>Investment Calculator</h1>
      </header>
      <InvestmentForm onCalculate={calculateHandler} />
      {!userInput && <p>No investment Calculated</p>}
      {userInput && (
        <Result
          result={yearlyData}
          initalInvestment={userInput["current-savings"]}
        />
      )}
    </div>
  );
}

export default App;
