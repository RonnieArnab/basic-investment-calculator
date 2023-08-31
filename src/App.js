import React, { useState } from "react";

import InvestmentForm from "./components/InvestmentFrom/InvestmentForm";
import Result from "./components/Result/Result";
import Header from "./components/Header/Header";

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
      <Header />
      <InvestmentForm onCalculate={calculateHandler} />
      {!userInput && (
        <p style={{ textAlign: "center" }}>No investment Calculated</p>
      )}
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
