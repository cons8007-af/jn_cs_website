import React, { useState } from 'react';
import { Calculator, RotateCcw, BarChart3 } from 'lucide-react';
import { calculateEMI, formatIndianCurrency, parseCleanNumber } from '../utils/calculator';

/**
 * LoanCalculator Component
 * Integrated EMI calculator matching the blue/white Banking Services design.
 */
export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [term, setTerm] = useState('');
  const [termUnit, setTermUnit] = useState('years');
  const [hasCalculated, setHasCalculated] = useState(false);
  const [errors, setErrors] = useState({});

  // Calculation results
  const [results, setResults] = useState({
    monthlyEmi: 0,
    principal: 0,
    totalInterest: 0,
    totalPayment: 0,
  });

  const handleAmountChange = (e) => {
    const raw = e.target.value;
    const clean = parseCleanNumber(raw);
    setLoanAmount(clean);
    if (errors.loanAmount) setErrors((prev) => ({ ...prev, loanAmount: null }));
  };

  const handleRateChange = (e) => {
    const raw = e.target.value;
    const clean = parseCleanNumber(raw);
    setInterestRate(clean);
    if (errors.interestRate) setErrors((prev) => ({ ...prev, interestRate: null }));
  };

  const handleTermChange = (e) => {
    const raw = e.target.value;
    const clean = parseCleanNumber(raw);
    setTerm(clean);
    if (errors.term) setErrors((prev) => ({ ...prev, term: null }));
  };

  const validate = () => {
    const newErrors = {};
    const p = parseFloat(loanAmount);
    const r = parseFloat(interestRate);
    const t = parseFloat(term);

    if (!loanAmount || isNaN(p) || p <= 0) {
      newErrors.loanAmount = 'Please enter a valid loan amount greater than ₹0';
    }
    if (interestRate === '' || isNaN(r) || r < 0) {
      newErrors.interestRate = 'Please enter a valid interest rate (0% or greater)';
    }
    if (!term || isNaN(t) || t <= 0) {
      newErrors.term = 'Please enter a valid loan tenure';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = (e) => {
    if (e) e.preventDefault();
    if (!validate()) return;

    const res = calculateEMI({
      loanAmount,
      interestRate,
      term,
      termUnit,
    });

    setResults(res);
    setHasCalculated(true);
  };

  const handleReset = () => {
    setLoanAmount('');
    setInterestRate('');
    setTerm('');
    setTermUnit('years');
    setHasCalculated(false);
    setErrors({});
    setResults({
      monthlyEmi: 0,
      principal: 0,
      totalInterest: 0,
      totalPayment: 0,
    });
  };

  // Quick preset buttons for common term selections
  const termPresets = [
    { label: '1 Yr', value: '1', unit: 'years' },
    { label: '3 Yrs', value: '3', unit: 'years' },
    { label: '5 Yrs', value: '5', unit: 'years' },
    { label: '10 Yrs', value: '10', unit: 'years' },
    { label: '15 Yrs', value: '15', unit: 'years' },
    { label: '20 Yrs', value: '20', unit: 'years' },
  ];

  return (
    <section className="banking-calculator-section" id="loan-calculator" aria-label="Loan Calculator">
      <div className="section-header">
        <div className="header-badge blue-badge">
          <Calculator size={22} color="#ffffff" />
        </div>
        <div>
          <h2 className="section-title">Loan Calculator</h2>
          <p className="section-subtitle">Plan your loan with easy EMI calculations.</p>
        </div>
      </div>

      <div className="calculator-card-grid">
        {/* Left Side: Inputs Form */}
        <form className="calculator-form" onSubmit={handleCalculate} noValidate>
          {/* Loan Amount Input */}
          <div className="calc-field-group">
            <label htmlFor="calc-loan-amount" className="calc-label">
              Loan Amount
            </label>
            <div className={`calc-input-wrapper ${errors.loanAmount ? 'has-error' : ''}`}>
              <span className="calc-prefix" aria-hidden="true">
                ₹
              </span>
              <input
                id="calc-loan-amount"
                type="text"
                inputMode="numeric"
                className="calc-input"
                placeholder="Enter loan amount"
                value={loanAmount ? Number(loanAmount).toLocaleString('en-IN') : ''}
                onChange={handleAmountChange}
                aria-describedby={errors.loanAmount ? 'err-loan-amount' : undefined}
                aria-required="true"
              />
            </div>
            {errors.loanAmount && (
              <span id="err-loan-amount" className="calc-error-text" role="alert">
                {errors.loanAmount}
              </span>
            )}
          </div>

          {/* Interest Rate Input */}
          <div className="calc-field-group">
            <label htmlFor="calc-interest-rate" className="calc-label">
              Interest Rate (%)
            </label>
            <div className={`calc-input-wrapper ${errors.interestRate ? 'has-error' : ''}`}>
              <input
                id="calc-interest-rate"
                type="text"
                inputMode="decimal"
                className="calc-input no-prefix"
                placeholder="Enter interest rate"
                value={interestRate}
                onChange={handleRateChange}
                aria-describedby={errors.interestRate ? 'err-interest-rate' : undefined}
                aria-required="true"
              />
              <span className="calc-suffix" aria-hidden="true">
                %
              </span>
            </div>
            {errors.interestRate && (
              <span id="err-interest-rate" className="calc-error-text" role="alert">
                {errors.interestRate}
              </span>
            )}
          </div>

          {/* Loan Term Input & Unit Selector */}
          <div className="calc-field-group">
            <div className="calc-label-row">
              <label htmlFor="calc-loan-term" className="calc-label">
                Loan Term
              </label>
              <div className="term-unit-toggle" role="radiogroup" aria-label="Loan term unit">
                <button
                  type="button"
                  className={`term-unit-btn ${termUnit === 'years' ? 'active' : ''}`}
                  onClick={() => setTermUnit('years')}
                  role="radio"
                  aria-checked={termUnit === 'years'}
                >
                  Years
                </button>
                <button
                  type="button"
                  className={`term-unit-btn ${termUnit === 'months' ? 'active' : ''}`}
                  onClick={() => setTermUnit('months')}
                  role="radio"
                  aria-checked={termUnit === 'months'}
                >
                  Months
                </button>
              </div>
            </div>

            <div className={`calc-input-wrapper ${errors.term ? 'has-error' : ''}`}>
              <input
                id="calc-loan-term"
                type="text"
                inputMode="numeric"
                className="calc-input no-prefix"
                placeholder={`Enter loan term in ${termUnit}`}
                value={term}
                onChange={handleTermChange}
                aria-describedby={errors.term ? 'err-loan-term' : undefined}
                aria-required="true"
              />
              <span className="calc-suffix term-suffix">{termUnit === 'years' ? 'Years' : 'Months'}</span>
            </div>
            {errors.term && (
              <span id="err-loan-term" className="calc-error-text" role="alert">
                {errors.term}
              </span>
            )}

            {/* Quick Tenure Pills */}
            <div className="calc-tenure-pills" aria-label="Quick tenure selection">
              {termPresets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  className={`tenure-pill ${term === p.value && termUnit === p.unit ? 'active' : ''}`}
                  onClick={() => {
                    setTerm(p.value);
                    setTermUnit(p.unit);
                    if (errors.term) setErrors((prev) => ({ ...prev, term: null }));
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons: Reset and Calculate */}
          <div className="calculator-actions">
            <button
              type="button"
              className="calc-btn reset-btn"
              onClick={handleReset}
              title="Reset all inputs"
              aria-label="Reset Calculator"
            >
              <RotateCcw size={16} />
              Reset
            </button>
            <button type="submit" className="calc-btn calculate-btn" aria-label="Calculate EMI">
              <Calculator size={18} />
              Calculate EMI
            </button>
          </div>
        </form>

        {/* Right Side: Results Display Card */}
        <div className="calculator-results-card" aria-live="polite">
          <div className="results-top-header">
            <div className="results-icon-badge" aria-hidden="true">
              <BarChart3 size={24} color="#2563eb" />
            </div>
            <div className="results-title-group">
              <span className="results-label">Monthly EMI</span>
              <div className="results-emi-value">
                {formatIndianCurrency(results.monthlyEmi)}
              </div>
            </div>
          </div>

          <div className="results-divider" />

          <div className="results-stats-list">
            <div className="results-stat-row">
              <span className="stat-label">Principal Amount</span>
              <span className="stat-value">{formatIndianCurrency(results.principal)}</span>
            </div>

            <div className="results-stat-row">
              <span className="stat-label">Total Interest</span>
              <span className="stat-value">{formatIndianCurrency(results.totalInterest)}</span>
            </div>

            <div className="results-stat-row highlight">
              <span className="stat-label">Total Payment (P + I)</span>
              <span className="stat-value">{formatIndianCurrency(results.totalPayment)}</span>
            </div>
          </div>

          {hasCalculated && results.monthlyEmi > 0 && (
            <div className="results-breakdown-bar" aria-hidden="true">
              <div
                className="bar-principal"
                style={{
                  width: `${results.totalPayment ? (results.principal / results.totalPayment) * 100 : 50}%`,
                }}
                title={`Principal: ${formatIndianCurrency(results.principal)}`}
              />
              <div
                className="bar-interest"
                style={{
                  width: `${results.totalPayment ? (results.totalInterest / results.totalPayment) * 100 : 50}%`,
                }}
                title={`Interest: ${formatIndianCurrency(results.totalInterest)}`}
              />
            </div>
          )}

          <div className="results-note">
            <span>Standard reducing balance rate. Final loan sanction terms are subject to bank partner discretion.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
