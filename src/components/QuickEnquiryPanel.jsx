import React, { useState, useEffect } from 'react';
import { MessageSquare, Lock, ArrowRight, CheckCircle2, AlertCircle, X, Loader2 } from 'lucide-react';
import { submitEnquiry } from '../api';

const LOAN_OPTIONS = [
  'Agriculture Loan',
  'Business Loan',
  'Machinery / Equipment Loan',
  'MSME Loan',
  'Project Loan',
  'Working Capital Loan',
  'Education Loan',
  'Gold Loan',
  'Home Construction Loan',
  'Home Loan',
  'Home Renovation Loan',
  'Personal Loan',
  'Car Loan',
  'Commercial Loan',
  'Two-Wheeler Loan',
  'LAP (Loan Against Property)',
  'Credit Cards',
  'Forex Cards',
  'Health Insurance',
  'Life Insurance',
  'Term Insurance',
  'Vehicle Insurance',
  'Fixed Deposit',
  'Mutual Funds',
  'Bonds',
];

const EMPLOYMENT_TYPES = [
  'Salaried',
  'Self Employed',
  'Business Owner',
  'Professional (Doctor / CA / Lawyer)',
  'Farmer / Agriculturalist',
  'Student',
  'Retired',
  'Other',
];

const SALARY_SELF_EMPLOYED_OPTIONS = [
  'Salaried - Private Sector / MNC',
  'Salaried - Central / State Govt / PSU',
  'Self Employed - Registered Business / MSME',
  'Self Employed - Consultant / Professional',
  'Self Employed - Shop / Retailer',
  'Other Source of Income',
];

const ANNUAL_INCOME_RANGES = [
  'Below ₹3 Lakhs',
  '₹3 Lakhs - ₹5 Lakhs',
  '₹5 Lakhs - ₹10 Lakhs',
  '₹10 Lakhs - ₹20 Lakhs',
  '₹20 Lakhs - ₹50 Lakhs',
  'Above ₹50 Lakhs',
];

const BANK_ACCOUNT_COUNTS = [
  '1 Account',
  '2 Accounts',
  '3 Accounts',
  '4 Accounts',
  '5 or more Accounts',
];

const BANK_OPTIONS = [
  'State Bank of India (SBI)',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Bank of Baroda',
  'Punjab National Bank (PNB)',
  'Canara Bank',
  'Union Bank of India',
  'Indian Bank',
  'Central Bank of India',
  'IDBI Bank',
  'IndusInd Bank',
  'Federal Bank',
  'Other Bank',
];

export default function QuickEnquiryPanel({ selectedService, onServiceSelect }) {
  // Panel fields (matching the approved reference card exactly)
  const [loanType, setLoanType] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [salaryOption, setSalaryOption] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');
  const [bankAccountsCount, setBankAccountsCount] = useState('');
  const [bankAccount, setBankAccount] = useState('');

  // Contact details (collected via contact confirmation modal)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredContact, setPreferredContact] = useState('Phone');

  // Submission UI states
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [errors, setErrors] = useState({});

  // Sync when user clicks any of the 16 loan or product cards
  useEffect(() => {
    if (selectedService) {
      setLoanType(selectedService);
      setErrors((prev) => ({ ...prev, loanType: null }));
    }
  }, [selectedService]);

  const validateCardFields = () => {
    const errs = {};
    if (!loanType) errs.loanType = 'Please select a loan type';
    if (!employmentType) errs.employmentType = 'Please select employment type';
    if (!salaryOption) errs.salaryOption = 'Please select salary / self-employed option';
    if (!annualIncome) errs.annualIncome = 'Please select annual income range';
    if (!bankAccountsCount) errs.bankAccountsCount = 'Please select number of bank accounts';
    if (!bankAccount) errs.bankAccount = 'Please select your bank';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateContactFields = () => {
    const errs = {};
    const cleanName = (name || '').trim();
    if (!cleanName || cleanName.length < 2) {
      errs.name = 'Please provide your full name (at least 2 characters)';
    }

    const cleanPhone = (phone || '').replace(/[\s\-()]/g, '');
    const phoneDigits = cleanPhone.startsWith('+91')
      ? cleanPhone.slice(3)
      : cleanPhone.startsWith('91') && cleanPhone.length === 12
      ? cleanPhone.slice(2)
      : cleanPhone.startsWith('0') && cleanPhone.length === 11
      ? cleanPhone.slice(1)
      : cleanPhone;

    if (!/^[0-9]{10,12}$/.test(phoneDigits)) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (email && email.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        errs.email = 'Please enter a valid email address';
      }
    }

    setErrors((prev) => ({ ...prev, ...errs }));
    return Object.keys(errs).length === 0;
  };

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    setSubmitError(null);

    // Validate the 6 primary fields
    if (!validateCardFields()) {
      return;
    }

    // Open contact confirmation modal
    setIsModalOpen(true);
  };

  const handleFinalSubmit = async (e) => {
    if (e) e.preventDefault();
    setSubmitError(null);

    if (!validateContactFields()) {
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        name: name.trim(),
        phone: phone.trim(),
        email: email ? email.trim() : null,
        service: 'Banking',
        preferred_contact: preferredContact,
        loanType,
        employmentType,
        salaryType: salaryOption,
        annualIncome,
        bankAccounts: bankAccountsCount,
        bankName: bankAccount,
        message: `[Banking Quick Enquiry]\n• Loan Type: ${loanType}\n• Employment Type: ${employmentType}\n• Category: ${salaryOption}\n• Annual Income: ${annualIncome}\n• Bank Accounts: ${bankAccountsCount}\n• Bank: ${bankAccount}`,
      };

      const res = await submitEnquiry(payload);

      setSubmitSuccess({
        enquiryId: (res && res.data && res.data.enquiryId) || 'JNW-CONFIRMED',
        name: name.trim(),
        loanType,
      });

      setIsModalOpen(false);
      // Reset form
      setLoanType('');
      setEmploymentType('');
      setSalaryOption('');
      setAnnualIncome('');
      setBankAccountsCount('');
      setBankAccount('');
      setName('');
      setPhone('');
      setEmail('');
      setErrors({});
      if (onServiceSelect) onServiceSelect('');
    } catch (err) {
      setSubmitError(err.message || 'We could not submit your enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="quick-enquiry-card" id="quick-enquiry" aria-label="Quick Enquiry Panel">
      <div className="enquiry-card-header">
        <div className="enquiry-icon-badge" aria-hidden="true">
          <MessageSquare size={20} color="#ffffff" />
        </div>
        <div>
          <h2 className="enquiry-title">Quick Enquiry</h2>
          <p className="enquiry-subtitle">
            Fill in your details and our banking partner will get in touch with you.
          </p>
        </div>
      </div>

      {submitSuccess ? (
        <div className="enquiry-success-box" role="alert">
          <CheckCircle2 size={36} color="#16a34a" />
          <h3>Enquiry Submitted Successfully!</h3>
          <p>
            Reference ID: <strong>{submitSuccess.enquiryId}</strong>
          </p>
          <p className="success-note">
            Thank you, {submitSuccess.name}! Our authorized banking partner has received your request for <strong>{submitSuccess.loanType}</strong> and will contact you shortly.
          </p>
          <button
            type="button"
            className="enquiry-submit-btn"
            onClick={() => setSubmitSuccess(null)}
          >
            Submit Another Enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleInitialSubmit} className="enquiry-form" noValidate>
          {submitError && (
            <div className="enquiry-error-alert" role="alert">
              <AlertCircle size={18} />
              <span>{submitError}</span>
            </div>
          )}

          {/* 1. Loan Type */}
          <div className="enquiry-field-group">
            <label htmlFor="enq-loan-type" className="enquiry-label">
              Loan Type
            </label>
            <div className={`enquiry-select-wrapper ${errors.loanType ? 'has-error' : ''}`}>
              <select
                id="enq-loan-type"
                className="enquiry-select"
                value={loanType}
                onChange={(e) => {
                  setLoanType(e.target.value);
                  if (errors.loanType) setErrors((prev) => ({ ...prev, loanType: null }));
                }}
                aria-required="true"
                aria-describedby={errors.loanType ? 'err-loan-type' : undefined}
              >
                <option value="">Select Loan Type</option>
                {LOAN_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            {errors.loanType && (
              <span id="err-loan-type" className="enquiry-error-text">
                {errors.loanType}
              </span>
            )}
          </div>

          {/* 2. Employment Type */}
          <div className="enquiry-field-group">
            <label htmlFor="enq-employment-type" className="enquiry-label">
              Employment Type
            </label>
            <div className={`enquiry-select-wrapper ${errors.employmentType ? 'has-error' : ''}`}>
              <select
                id="enq-employment-type"
                className="enquiry-select"
                value={employmentType}
                onChange={(e) => {
                  setEmploymentType(e.target.value);
                  if (errors.employmentType) setErrors((prev) => ({ ...prev, employmentType: null }));
                }}
                aria-required="true"
                aria-describedby={errors.employmentType ? 'err-employment-type' : undefined}
              >
                <option value="">Select Employment Type</option>
                {EMPLOYMENT_TYPES.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            {errors.employmentType && (
              <span id="err-employment-type" className="enquiry-error-text">
                {errors.employmentType}
              </span>
            )}
          </div>

          {/* 3. Salary / Self Employed */}
          <div className="enquiry-field-group">
            <label htmlFor="enq-salary-option" className="enquiry-label">
              Salary / Self Employed
            </label>
            <div className={`enquiry-select-wrapper ${errors.salaryOption ? 'has-error' : ''}`}>
              <select
                id="enq-salary-option"
                className="enquiry-select"
                value={salaryOption}
                onChange={(e) => {
                  setSalaryOption(e.target.value);
                  if (errors.salaryOption) setErrors((prev) => ({ ...prev, salaryOption: null }));
                }}
                aria-required="true"
                aria-describedby={errors.salaryOption ? 'err-salary-option' : undefined}
              >
                <option value="">Select Option</option>
                {SALARY_SELF_EMPLOYED_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            {errors.salaryOption && (
              <span id="err-salary-option" className="enquiry-error-text">
                {errors.salaryOption}
              </span>
            )}
          </div>

          {/* 4. Annual Income */}
          <div className="enquiry-field-group">
            <label htmlFor="enq-annual-income" className="enquiry-label">
              Annual Income
            </label>
            <div className={`enquiry-select-wrapper ${errors.annualIncome ? 'has-error' : ''}`}>
              <select
                id="enq-annual-income"
                className="enquiry-select"
                value={annualIncome}
                onChange={(e) => {
                  setAnnualIncome(e.target.value);
                  if (errors.annualIncome) setErrors((prev) => ({ ...prev, annualIncome: null }));
                }}
                aria-required="true"
                aria-describedby={errors.annualIncome ? 'err-annual-income' : undefined}
              >
                <option value="">Select Annual Income Range</option>
                {ANNUAL_INCOME_RANGES.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            {errors.annualIncome && (
              <span id="err-annual-income" className="enquiry-error-text">
                {errors.annualIncome}
              </span>
            )}
          </div>

          {/* 5. How many Bank Accounts? */}
          <div className="enquiry-field-group">
            <label htmlFor="enq-bank-accounts" className="enquiry-label">
              How many Bank Accounts?
            </label>
            <div className={`enquiry-select-wrapper ${errors.bankAccountsCount ? 'has-error' : ''}`}>
              <select
                id="enq-bank-accounts"
                className="enquiry-select"
                value={bankAccountsCount}
                onChange={(e) => {
                  setBankAccountsCount(e.target.value);
                  if (errors.bankAccountsCount) setErrors((prev) => ({ ...prev, bankAccountsCount: null }));
                }}
                aria-required="true"
                aria-describedby={errors.bankAccountsCount ? 'err-bank-accounts' : undefined}
              >
                <option value="">Select Number</option>
                {BANK_ACCOUNT_COUNTS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            {errors.bankAccountsCount && (
              <span id="err-bank-accounts" className="enquiry-error-text">
                {errors.bankAccountsCount}
              </span>
            )}
          </div>

          {/* 6. Your Bank Account */}
          <div className="enquiry-field-group">
            <label htmlFor="enq-bank-account" className="enquiry-label">
              Your Bank Account
            </label>
            <div className={`enquiry-select-wrapper ${errors.bankAccount ? 'has-error' : ''}`}>
              <select
                id="enq-bank-account"
                className="enquiry-select"
                value={bankAccount}
                onChange={(e) => {
                  setBankAccount(e.target.value);
                  if (errors.bankAccount) setErrors((prev) => ({ ...prev, bankAccount: null }));
                }}
                aria-required="true"
                aria-describedby={errors.bankAccount ? 'err-bank-account' : undefined}
              >
                <option value="">Select Your Bank</option>
                {BANK_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            {errors.bankAccount && (
              <span id="err-bank-account" className="enquiry-error-text">
                {errors.bankAccount}
              </span>
            )}
          </div>

          {/* Submit Enquiry Button */}
          <button type="submit" className="enquiry-submit-btn">
            <span>Submit Enquiry</span>
            <ArrowRight size={18} />
          </button>

          {/* Security / Privacy Message */}
          <div className="enquiry-security-note">
            <Lock size={14} className="security-lock-icon" aria-hidden="true" />
            <span>Your details are secure and will only be used for banking enquiries.</span>
          </div>
        </form>
      )}

      {/* Contact Details Modal to complete submission */}
      {isModalOpen && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <div className="modal-dialog">
            <div className="modal-header">
              <div>
                <h3 id="contact-modal-title" className="modal-title">
                  Contact Details
                </h3>
                <p className="modal-subtitle">
                  Where should our banking partner get in touch regarding your <strong>{loanType}</strong>?
                </p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFinalSubmit} className="modal-form" noValidate>
              {submitError && (
                <div className="enquiry-error-alert" role="alert">
                  <AlertCircle size={18} />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Full Name */}
              <div className="enquiry-field-group">
                <label htmlFor="modal-name" className="enquiry-label">
                  Full Name <span className="req">*</span>
                </label>
                <input
                  id="modal-name"
                  type="text"
                  className={`modal-input ${errors.name ? 'has-error' : ''}`}
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
                  }}
                  autoFocus
                  required
                />
                {errors.name && <span className="enquiry-error-text">{errors.name}</span>}
              </div>

              {/* Mobile Phone Number */}
              <div className="enquiry-field-group">
                <label htmlFor="modal-phone" className="enquiry-label">
                  Mobile Number <span className="req">*</span>
                </label>
                <div className="phone-input-group">
                  <span className="phone-prefix">+91</span>
                  <input
                    id="modal-phone"
                    type="tel"
                    className={`modal-input phone-input ${errors.phone ? 'has-error' : ''}`}
                    placeholder="Enter 10-digit mobile number"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: null }));
                    }}
                    required
                  />
                </div>
                {errors.phone && <span className="enquiry-error-text">{errors.phone}</span>}
              </div>

              {/* Email (Optional) */}
              <div className="enquiry-field-group">
                <label htmlFor="modal-email" className="enquiry-label">
                  Email Address <span className="optional">(Optional)</span>
                </label>
                <input
                  id="modal-email"
                  type="email"
                  className={`modal-input ${errors.email ? 'has-error' : ''}`}
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                  }}
                />
                {errors.email && <span className="enquiry-error-text">{errors.email}</span>}
              </div>

              {/* Preferred Contact Method */}
              <div className="enquiry-field-group">
                <label className="enquiry-label">Preferred Contact Method</label>
                <div className="contact-method-options" role="radiogroup">
                  {['Phone', 'WhatsApp', 'Email'].map((method) => (
                    <label key={method} className="method-pill-label">
                      <input
                        type="radio"
                        name="preferredContact"
                        value={method}
                        checked={preferredContact === method}
                        onChange={(e) => setPreferredContact(e.target.value)}
                      />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => setIsModalOpen(false)}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button type="submit" className="modal-submit-btn" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="spinner" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm & Submit</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
