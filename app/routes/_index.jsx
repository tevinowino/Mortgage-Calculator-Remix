import { useState } from "react";
import { Calculator, Home, RefreshCcw, DollarSign, Clock, Percent, AlertCircle } from "lucide-react";

export const meta = () => {
  return [
    { title: "Mortgage Calculator" },
    { name: "description", content: "Calculate your mortgage repayments easily." },
  ];
};

export default function Index() {
  const [monthlyRepayments, setMonthlyRepayments] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [result, setResult] = useState(false);
  const [mortgageAmount, setMortgageAmount] = useState("");
  const [mortgageTerm, setMortgageTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [mortgageType, setMortgageType] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validate inputs
    if (!mortgageAmount || !mortgageTerm || !interestRate || !mortgageType) {
      setError("Please fill in all fields");
      return;
    }

    const principal = parseFloat(mortgageAmount);
    const years = parseFloat(mortgageTerm);
    const annualInterestRate = parseFloat(interestRate) / 100;

    // Validation checks
    if (principal <= 0 || years <= 0 || annualInterestRate <= 0) {
      setError("Please enter valid positive numbers");
      return;
    }

    // Monthly interest rate and total number of payments
    const monthlyRate = annualInterestRate / 12;
    const totalPayments = years * 12;

    if (mortgageType === "repayment") {
      const monthlyPayment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);

      setMonthlyRepayments(monthlyPayment.toFixed(2));
      setTotalCost((monthlyPayment * totalPayments).toFixed(2));
    } else {
      const monthlyPayment = principal * monthlyRate;
      setMonthlyRepayments(monthlyPayment.toFixed(2));
      setTotalCost((monthlyPayment * totalPayments + principal).toFixed(2));
    }

    setResult(true);
  };

  const handleClear = () => {
    setMortgageAmount("");
    setMortgageTerm("");
    setInterestRate("");
    setMortgageType("");
    setMonthlyRepayments("");
    setTotalCost("");
    setResult(false);
    setError("");
  };

  return (
    <main className="min-h-screen bg-[#e3f4fc] py-8 px-4 md:py-16">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <section className="w-full lg:w-1/2 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Calculator className="w-8 h-8 text-[#133040]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#133040]">
                  Mortgage Calculator
                </h2>
              </div>
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-2 text-[#133040] hover:text-[#133040]/80 transition-colors"
              >
                <RefreshCcw className="w-4 h-4" />
                <span className="font-medium">Reset</span>
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <TextInput
                label="Mortgage Amount"
                value={mortgageAmount}
                onChange={(e) => setMortgageAmount(e.target.value)}
                icon={<DollarSign className="w-5 h-5 text-gray-400" />}
                placeholder="Enter amount"
              />

              <div className="grid md:grid-cols-2 gap-4">
                <TextInput
                  label="Mortgage Term"
                  value={mortgageTerm}
                  onChange={(e) => setMortgageTerm(e.target.value)}
                  icon={<Clock className="w-5 h-5 text-gray-400" />}
                  placeholder="Years"
                />
                <TextInput
                  label="Interest Rate"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  icon={<Percent className="w-5 h-5 text-gray-400" />}
                  placeholder="Rate"
                />
              </div>

              <div className="space-y-3">
                <label className="block font-medium text-[#133040da]">Mortgage Type</label>
                <div className="grid md:grid-cols-2 gap-3">
                  <RadioInput
                    label="Repayment Mortgage"
                    value="repayment"
                    checked={mortgageType === "repayment"}
                    onChange={(e) => setMortgageType(e.target.value)}
                  />
                  <RadioInput
                    label="Interest Only"
                    value="interestOnly"
                    checked={mortgageType === "interestOnly"}
                    onChange={(e) => setMortgageType(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#d9db30] hover:bg-[#d8db30]/90 text-[#133040] font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Calculate Repayments
              </button>
            </form>
          </section>

          <section className="w-full lg:w-1/2 bg-[#133040] p-8 lg:p-10 rounded-bl-[70px]">
            <div className="h-full flex flex-col justify-center">
              {result ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Home className="w-8 h-8 text-[#d9db30]" />
                    <h3 className="text-3xl font-bold text-white">Your Results</h3>
                  </div>
                  <div className="bg-[#1a4b73] rounded-xl p-6 space-y-4">
                    <ResultItem 
                      label="Monthly Payment"
                      value={`$${Number(monthlyRepayments).toLocaleString()}`}
                      highlight={true}
                    />
                    <ResultItem 
                      label="Total Cost"
                      value={`$${Number(totalCost).toLocaleString()}`}
                      highlight={true}
                    />
                    <div className="pt-4 border-t border-white/20">
                      <ResultItem 
                        label="Mortgage Amount"
                        value={`$${Number(mortgageAmount).toLocaleString()}`}
                      />
                      <ResultItem 
                        label="Term"
                        value={`${mortgageTerm} years`}
                      />
                      <ResultItem 
                        label="Interest Rate"
                        value={`${interestRate}%`}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Home className="w-16 h-16 text-[#d9db30] mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    Calculate Your Mortgage
                  </h3>
                  <p className="text-gray-300">
                    Fill in the details to see your monthly repayments and total cost.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

const TextInput = ({ label, value, onChange, icon, placeholder }) => (
  <div className="space-y-2">
    <label className="block font-medium text-[#133040da]">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        type="number"
        className="block w-full pl-10 pr-3 py-2.5 border border-[#133040] rounded-lg focus:ring-2 focus:ring-[#133040] focus:border-[#133040] text-gray-900 placeholder-gray-400 transition-shadow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        step="any"
      />
    </div>
  </div>
);

const RadioInput = ({ label, value, checked, onChange }) => (
  <label className={`
    relative flex items-center justify-between p-4 rounded-lg cursor-pointer
    border-2 transition-all duration-200
    ${checked ? 'border-[#133040] bg-[#e3f4fc]' : 'border-gray-200 hover:border-gray-300'}
  `}>
    <span className="font-medium text-[#133040]">{label}</span>
    <input
      type="radio"
      name="mortgage-type"
      value={value}
      checked={checked}
      onChange={onChange}
      className="w-5 h-5 text-[#133040] border-gray-300 focus:ring-[#133040]"
    />
  </label>
);

const ResultItem = ({ label, value, highlight = false }) => (
  <div className="flex justify-between items-center py-1">
    <span className="text-gray-300">{label}</span>
    <span className={`font-semibold ${highlight ? 'text-2xl text-[#d9db30]' : 'text-white'}`}>
      {value}
    </span>
  </div>
);