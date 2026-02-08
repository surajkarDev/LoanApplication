'use client';
import React, { useState, useEffect,useCallback,useRef } from "react";
import Header from "../components/DashboardHeader";
import { useSelector } from "react-redux";
import LoanDetail from "../components/LoanDetail";

const MyLoans = () => {
  const [loanData, setLoanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const storeEmail = useSelector(state => state.user.loginInformation);
  const [email,setEmail] = useState('');
  const loanDetailRef = useRef();

  const loanInformation = async () => {
    try {
      const response = await fetch("http://localhost:3001/loanDetails?email="+storeEmail.email, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Please check API link or user email");
      }

      const data = await response.json();
      setLoanData(data);
    } catch (error) {
      console.error("Loan API Error:", error);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN",{
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
  }
  useEffect(() => {
    loanInformation();
  }, []);

  const throttling = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };
  const handleThrottledInput = useCallback(
    throttling((value) => {
      console.log("Your entered Value is:", value ? value : "Empty Input");
    }, 1000),
    []
  );

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        
        {/* Sidebar */}
        <div className="col-lg-2 p-0 border-end bg-light">
          <Header />
        </div>

        {/* Main Content */}
        <div className="col-lg-10 p-4 pt-0 mt-3">

          {loading && <p>Loading loan details...</p>}

          {errorMsg && (
            <p className="text-danger fw-bold">Error: {errorMsg}</p>
          )}

          {!loading && !errorMsg && (
            // <pre>{JSON.stringify(loanData, null, 2)}</pre>
            <table className="table table-bordered">
              <thead>
                <tr>
                    <th>Loan ID</th>
                    <th>Loan Type</th>
                    <th>Amount</th>
                    <th>Interest Rate</th>
                    <th>Tenure (Months)</th>
                    <th>Start Date</th>
                    <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loanData && loanData.length > 0 ? (
                  loanData.map((loan) => (
                    <tr key={loan.id}>
                        <td>{loan.id}</td>
                        <td>{loan.loanType}</td>
                        <td>{loan.loanAmount}</td>
                        <td>{loan.rateOfInterest}%</td>
                        <td>{loan.loanTenure}</td>
                        <td>{formatDate(loan.createdAt)}</td>
                        <td className={loan.status == 'active'? `text-capitalize bg-success text-white `: loan.status == 'pending' ? `text-capitalize bg-warning text-white` : `text-capitalize bg-secondary text-white`}>{loan.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">No loan data available.</td>
                  </tr>
                )}
              </tbody>
            </table>
        )}
        {email}<br/>
        <input className="border py-2 px-3" type="text" placeholder="Type Anything" value={email} onChange={(e)=>{setEmail(e.target.value),handleThrottledInput(e.target.value)}} />
        <LoanDetail ref={loanDetailRef} />

        <button onClick={()=> loanDetailRef.current.loanDataCLick()}>Click Child Fun</button>
        </div>
      </div>
    </div>
  );
};

export default MyLoans;
