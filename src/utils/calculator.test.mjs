import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateEMI, formatIndianCurrency, parseCleanNumber } from './calculator.js';

test('calculateEMI - standard calculation with 5 years tenure', () => {
  const result = calculateEMI({
    loanAmount: 500000,
    interestRate: 10.5,
    term: 5,
    termUnit: 'years',
  });

  // Standard reducing balance formula:
  // r = 10.5 / 1200 = 0.00875, n = 60
  // EMI approx 10747
  assert.equal(result.monthlyEmi, 10747);
  assert.equal(result.principal, 500000);
  assert.equal(result.totalPayment, 644817);
  assert.equal(result.totalInterest, 144817);
});

test('calculateEMI - years vs months produces identical results', () => {
  const yearsResult = calculateEMI({
    loanAmount: 1000000,
    interestRate: 8.5,
    term: 10,
    termUnit: 'years',
  });

  const monthsResult = calculateEMI({
    loanAmount: 1000000,
    interestRate: 8.5,
    term: 120,
    termUnit: 'months',
  });

  assert.equal(yearsResult.monthlyEmi, monthsResult.monthlyEmi);
  assert.equal(yearsResult.totalInterest, monthsResult.totalInterest);
  assert.equal(yearsResult.totalPayment, monthsResult.totalPayment);
});

test('calculateEMI - handles 0% interest correctly without NaN or Infinity', () => {
  const result = calculateEMI({
    loanAmount: 120000,
    interestRate: 0,
    term: 1,
    termUnit: 'years',
  });

  assert.equal(result.monthlyEmi, 10000);
  assert.equal(result.principal, 120000);
  assert.equal(result.totalInterest, 0);
  assert.equal(result.totalPayment, 120000);
});

test('calculateEMI - returns clean zeroes for zero/negative or missing values', () => {
  const zeroResult = calculateEMI({
    loanAmount: 0,
    interestRate: 10,
    term: 5,
  });
  assert.equal(zeroResult.monthlyEmi, 0);
  assert.equal(zeroResult.totalInterest, 0);
  assert.equal(zeroResult.totalPayment, 0);

  const missingResult = calculateEMI({});
  assert.equal(missingResult.monthlyEmi, 0);
  assert.equal(missingResult.totalInterest, 0);
});

test('formatIndianCurrency - formats numbers in Indian numbering system', () => {
  assert.equal(formatIndianCurrency(0), '₹ 0');
  assert.equal(formatIndianCurrency(500000), '₹ 5,00,000');
  assert.equal(formatIndianCurrency(10000000), '₹ 1,00,00,000');
  assert.equal(formatIndianCurrency(24250), '₹ 24,250');
  assert.equal(formatIndianCurrency(null), '₹ 0');
});

test('parseCleanNumber - sanitizes numeric inputs with decimal point', () => {
  assert.equal(parseCleanNumber('₹ 5,00,000'), '500000');
  assert.equal(parseCleanNumber('10.5%'), '10.5');
  assert.equal(parseCleanNumber('12.34.56'), '12.3456');
});
