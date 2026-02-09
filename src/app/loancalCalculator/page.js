'use client';
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import '../css/styles.css';
import LoanChart from "../components/LoanChart";
import Form from 'react-bootstrap/Form';
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Home() {

  // ------------------- STATES -------------------
  const [loanAmount, setLoanAmount] = useState(5000);
  const [rateInterest, setRateInterest] = useState(6);
  const [loanTenureMonths, setLoanTenureMonths] = useState(3);
  const [loanTenureYears, setLoanTenureYears] = useState(1);
  const [switchMonthsYears, setSwitchMonthsYears] = useState("months");
  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [totalAmountShow, setTotalAmountShow] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [loanRecords, setLoanRecords] = useState([]);

  const loginInformation = useSelector((state) => state.user.loginInformation) || "";

  const rateOfInterestInput = useCallback((e) => {
    let value = Number(e.target.value);
    if ( value < 6) setRateInterest(value);
    else if (value > 36) setRateInterest(36);
    else setRateInterest(value);
  },[rateInterest])

  // ----------------- EMI CALCULATION (useCallback) -----------------
  const calculateMonthlyEMI = useCallback((amount, annualRate, tenure, mode) => {
    const n = mode === "years" ? tenure * 12 : tenure;
    const r = annualRate / 12 / 100;

    const emi =
      (amount * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const interest = totalPayment - amount;

    setMonthlyEMI(Math.round(emi));
    setTotalAmountShow(Math.round(totalPayment));
    setTotalInterest(Number(interest.toFixed(2)));
  }, []);

  // ----------------- MEMOIZED SLIDER BACKGROUND (useMemo) -----------------
  const getBackgroundStyle = useCallback((value, min, max) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return {
      background: `linear-gradient(to right, #4CAF50 ${percentage}%, #d3d3d3 ${percentage}%)`
    };
  }, []);

  // ----------------- FETCH LOAN RECORDS -----------------
  const getLoanDetails = useCallback(async () => {
    try {
      const email = loginInformation.email;
      const response = await fetch(`http://localhost:3001/loanDetails?userEmail=${email}`);
      if (!response.ok) throw new Error("API error");

      const res = await response.json();
      setLoanRecords(res);
    } catch (error) {
      console.error("Loan API error:", error);
    }
  }, [loginInformation.email]);

  // Load loan data once
  useEffect(() => {
    getLoanDetails();
  }, [getLoanDetails]);

  // ----------------- APPLY FOR LOAN -----------------
  const applyforloan = async () => {
    if (!loanAmount || !rateInterest || (!loanTenureMonths && !loanTenureYears)) {
      alert("Please fill all required fields.");
      return;
    }

    const loanData = {
      loanAmount: Number(loanAmount),
      rateOfInterest: Number(rateInterest),
      loanTenure:
        switchMonthsYears === "months"
          ? `${loanTenureMonths} Months`
          : `${loanTenureYears} Years`,
      monthlyEmi: Number(monthlyEMI),
      totalInterest: Number(totalInterest),
      totalAmount: Number(totalAmountShow),
      createdAt: new Date().toISOString(),
      userName: loginInformation.username,
      userEmail: loginInformation.email
    };

    try {
      const response = await fetch("http://localhost:3001/loanDetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loanData)
      });

      if (!response.ok) throw new Error("Submit failed");

      await getLoanDetails(); // refresh table  
      alert("Loan Application Submitted Successfully!");
    } catch (error) {
      console.error("Loan submission error:", error);
      alert("Something went wrong.");
    }
  };

  // ----------------- RECALCULATE EMI -----------------
  useEffect(() => {
    const tenure =
      switchMonthsYears === "years" ? loanTenureYears : loanTenureMonths;

    calculateMonthlyEMI(loanAmount,rateInterest,tenure,switchMonthsYears);
  }, [loanAmount,rateInterest,loanTenureMonths,loanTenureYears,switchMonthsYears,calculateMonthlyEMI]);


  return (
    <div>
      <main>
        <h2 className="text-3xl font-bold text-center my-5">
          Personal Loan EMI Calculator
        </h2>

        <div className="container">
          <div className="row">

            {/* ---------------- LEFT PANEL (RESULT) ---------------- */}
            <div className="col-lg-5">
              <div className="bg-white shadow p-5 mx-4 text-center">
                <h4>Your Monthly EMI is</h4>
                <p className="fs-3 fw-bold text-success">$ {monthlyEMI}</p>
                for {switchMonthsYears === "years"
                  ? `${loanTenureYears} Year`
                  : `${loanTenureMonths} Month`}
                <hr />
                <div className="row">
                  <div className="col-6">
                    <p>Total Interest</p>
                    <p>$ {totalInterest}</p>
                  </div>
                  <div className="col-6">
                    <p>Total Amount</p>
                    <p>$ {totalAmountShow}</p>
                  </div>
                </div>
                <hr />
                <LoanChart loanAmount={loanAmount} totalInterest={totalInterest} />
              </div>
            </div>

            {/* ---------------- RIGHT PANEL (SLIDERS) ---------------- */}
            <div className="col-lg-7">

              {/* Loan Amount */}
              <div className="mb-4 border p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <label>Loan Amount</label>
                  <div>
                    $ <input
                      type="number"
                      className="border p-2 text-center"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      min="5000"
                    />
                  </div>
                </div>

                <input
                  type="range"
                  className="custom-slider"
                  value={loanAmount}
                  min="5000"
                  max="6000000"
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  style={getBackgroundStyle(loanAmount, 5000, 6000000)}
                />

                <p className="d-flex justify-content-between">
                  <span>Min $5,000</span>
                  <span>Max $6,000,000</span>
                </p>
              </div>

              {/* Rate of Interest */}
              <div className="mb-4 border p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <label>Rate of Interest</label>
                  <div>
                    <input
                      type="number"
                      className="border p-2 text-center"
                      value={rateInterest}
                      onChange={(e) => rateOfInterestInput(e)}
                      min="6"
                    /> %
                  </div>
                </div>

                <input
                  type="range"
                  className="custom-slider"
                  value={rateInterest}
                  min="6"
                  max="36"
                  onChange={(e) => setRateInterest(Number(e.target.value))}
                  style={getBackgroundStyle(rateInterest, 6, 36)}
                />

                <p className="d-flex justify-content-between">
                  <span>Min 6%</span>
                  <span>Max 36%</span>
                </p>
              </div>

              {/* Loan Tenure */}
              <div className="border p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <label>Loan Tenure</label>

                  <div>
                    {switchMonthsYears === "months" ? (
                      <input
                        type="number"
                        className="border p-2 text-center"
                        value={loanTenureMonths}
                        min="3"
                        onChange={(e) => setLoanTenureMonths(Number(e.target.value))}
                      />
                    ) : (
                      <input
                        type="number"
                        className="border p-2 text-center"
                        value={loanTenureYears}
                        min="1"
                        onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                      />
                    )}

                    <Form.Select
                      value={switchMonthsYears}
                      onChange={(e) => setSwitchMonthsYears(e.target.value)}
                      className="d-inline-block w-auto ms-2"
                    >
                      <option value="months">Months</option>
                      <option value="years">Years</option>
                    </Form.Select>
                  </div>
                </div>

                {switchMonthsYears === "months" ? (
                  <input
                    type="range"
                    className="custom-slider"
                    value={loanTenureMonths}
                    min="3"
                    max="72"
                    onChange={(e) => setLoanTenureMonths(Number(e.target.value))}
                    style={getBackgroundStyle(loanTenureMonths, 3, 72)}
                  />
                ) : (
                  <input
                    type="range"
                    className="custom-slider"
                    value={loanTenureYears}
                    min="1"
                    max="6"
                    onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                    style={getBackgroundStyle(loanTenureYears, 1, 6)}
                  />
                )}

                <p className="d-flex justify-content-between">
                  {switchMonthsYears === "months"
                    ? (<><span>Min 3 months</span><span>Max 72 months</span></>)
                    : (<><span>Min 1 year</span><span>Max 6 years</span></>)}
                </p>
              </div>

              <div className="text-center mt-4">
                <button className="btn btn-outline-success" onClick={applyforloan}>
                  Apply Now
                </button>
              </div>
            </div>

            {/* ---------------- TABLE ---------------- */}
            <div className="col-12 mt-5">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Loan Amount</th>
                    <th>Rate of Interest</th>
                    <th>Loan Tenure</th>
                    <th>Monthly EMI</th>
                    <th>Total Interest</th>
                    <th>Total Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {loanRecords.length > 0 ? (
                    loanRecords.map((x, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{x.loanAmount}</td>
                        <td>{x.rateOfInterest}</td>
                        <td>{x.loanTenure}</td>
                        <td>{x.monthlyEmi}</td>
                        <td>{x.totalInterest}</td>
                        <td>{x.totalAmount}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center">
                        NO Data Available
                      </td>
                    </tr>
                  )}
                </tbody>

              </Table>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
