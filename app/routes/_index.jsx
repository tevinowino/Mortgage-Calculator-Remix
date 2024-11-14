import { useState } from "react";

export const meta = () => {
  return [
    { title: "Mortgage app calculator" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  let [monthlyRepayments, setMonthlyRepayments] = useState('');
  let [totalCost, setTotalCost] = useState('');
  let [result, setResult] = useState(false);
  let [mortgageAmount, setMortgageAmount] = useState('');
  let [mortgageTerm, setMortgageTerm] = useState('');
  let [interestRate, setInterestRate] = useState('');
  let [mortgageType, setMortgageType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(true);
    const principal = parseFloat(mortgageAmount);
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12;
    let monthlyInterestPayment = principal * monthlyInterestRate;

    setMonthlyRepayments(monthlyInterestPayment.toFixed(2));
    setTotalCost((monthlyInterestPayment * 12 * parseInt(mortgageTerm)).toFixed(2));

    console.log({ monthlyRepayments, totalCost });
  };

  return (
    <main className="bg-[#e3f4fc] min-h-screen py-40 px-10">
      <div className="bg-white flex flex-col sm:flex-row rounded-md">
        <section className="w-full sm:w-1/2 p-7">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Mortgage Calculator</h2>
            <button className="border-b-[2px] border-[#13304040] text-[#133040] font-semibold">
              Clear All
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <TextInput label="Mortgage Amount" onChange={(e) => setMortgageAmount(e.target.value)} />
            </div>
            <div className="flex justify-between items-center gap-4 mb-4">
              <TextInput label="Mortgage Term" onChange={(e) => setMortgageTerm(e.target.value)} />
              <TextInput label="Interest Rate" onChange={(e) => setInterestRate(e.target.value)} />
            </div>
            <div className="mb-4">
              <fieldset className="flex flex-col gap-4">
                <legend className="font-medium text-[#133040da]">Mortgage Type</legend>
                <RadioInput label="Repayment" value="repayment" onChange={(e) => setMortgageType(e.target.value)} />
                <RadioInput label="Interest Only" value="interestOnly" onChange={(e) => setMortgageType(e.target.value)} />
              </fieldset>
            </div>
            <button type="submit" className="bg-[#d9db30] hover:bg-[#d8db30a1] py-3 px-5 rounded-3xl font-bold">
              Calculate Repayments
            </button>
          </form>
        </section>
        <section className="w-full sm:w-1/2 bg-[#133040] p-8 rounded-bl-[70px] shadow-md text-white flex flex-col items-center">
          {result ? (
            <div className="text-center w-full max-w-xs mx-auto">
              <h3 className="text-4xl font-semibold mb-6">Results</h3>
              <div className="bg-[#1a4b73] p-5 rounded-lg shadow-inner">
                <p className="text-lg mb-2"><span className="font-bold">Mortgage Amount:</span> ${mortgageAmount}</p>
                <p className="text-lg mb-2"><span className="font-bold">Term:</span> {mortgageTerm} years</p>
                <p className="text-lg mb-2"><span className="font-bold">Interest Rate:</span> {interestRate}%</p>
                <p className="text-lg mb-2"><span className="font-bold">Type:</span> {mortgageType}</p>
                <p className="text-xl mt-5 font-semibold">Monthly Interest Payment: ${monthlyRepayments}</p>
                <p className="text-xl font-semibold">Total Interest Cost: ${totalCost}</p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h3 className="text-3xl font-semibold mb-4">Results</h3>
              <p className="text-xl">Enter details to calculate the interest payment.</p>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}

// Components
const TextInput = ({ label, onChange }) => (
  <div className="flex flex-col gap-1">
    <label className="font-medium text-[#133040da]" htmlFor={label}>
      {label}
    </label>
    <input
      type="number"
      id={label}
      className="w-full rounded-md border-[#133040] py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
      onChange={onChange}
    />
  </div>
);

const RadioInput = ({ label, value, onChange }) => (
  <div className="p-2 rounded-md flex items-center gap-2 border-2 border-gray-300">
    <input
      type="radio"
      id={value}
      name="mortgage-type"
      value={value}
      className=""
      onChange={onChange}
    />
    <label htmlFor={value} className="text-[#133040] font-bold">
      {label}
    </label>
  </div>
);
