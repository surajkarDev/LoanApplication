"use client";
import React from "react";
import "../../css/styles.css";

const DashboardOverview = ({ userInformation }) => {

  const icons = {
    "Total Active Loans": (
      <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 3h18v2H3V3zm2 4h14v14H5V7z" />
      </svg>
    ),

    "Pending Payments": (
      <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 11h-2V6h2v7zm0 4h-2v-2h2v2z" />
      </svg>
    ),

    "Next EMI Date": (
      <svg width="28" height="28" viewBox="0 0 24 24">
        <path d="M7 2v2H5v2h14V4h-2V2h-2v2H9V2H7zm12 6H5v12h14V8z" />
      </svg>
    ),

    "Total Outstanding Balance": (
      <svg width="28" height="28" viewBox="0 0 24 24">
        <path d="M12 1L3 5l9 4 9-4-9-1zm0 12l9-4-9-4-9 4 9 4zm-9 2l9 4 9-4" />
      </svg>
    ),

    "EMIs Paid": (
      <svg width="28" height="28" viewBox="0 0 24 24">
        <path d="M3 13h18v2H3zm0 4h12v2H3zm0-8h18v2H3zm0-4h12v2H3z" />
      </svg>
    ),

    "Loan Approval Status": (
      <svg width="28" height="28" viewBox="0 0 24 24">
        <path d="M9 16l-2.5-2.5L5 15l4 4 10-10-1.5-1.5z" />
      </svg>
    ),

    "Upcoming EMIs (Next 30 Days)": (
      <svg width="28" height="28" viewBox="0 0 24 24">
        <path d="M7 2v2H5v2h14V4h-2V2h-2v2H9V2zM5 8v12h14V8" />
      </svg>
    ),

    "Total Loans Taken": (
      <svg width="28" height="28" viewBox="0 0 24 24">
        <circle cx="12" cy="6" r="3" />
        <path d="M4 20v-2c0-3 3-5 8-5s8 2 8 5v2" />
      </svg>
    ),

    "Last EMI Paid On": (
      <svg width="28" height="28" viewBox="0 0 24 24">
        <path d="M12 8l6 6-1.5 1.5L12 11l-4.5 4.5L6 14z" />
      </svg>
    ),

    "Overdue EMI Count": (
      <svg width="28" height="28" fill="#ff4757" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 13h-2v-2h2v2zm0-4h-2V6h2v5z" />
      </svg>
    ),

    "Total Amount Paid Till Date": (
      <svg width="28" height="28" viewBox="0 0 24 24">
        <path d="M4 5h16v14H4zm8 3h6v2h-6zm-6 4h12v2H6zm0 4h8v2H6z" />
      </svg>
    ),

    "Interest Paid Till Date": (
      <svg width="28" height="28" fill="#ffa502" viewBox="0 0 24 24">
        <path d="M12 2C8 6 7 10 7 12s1 6 5 10c4-4 5-8 5-10s-1-6-5-10z" />
      </svg>
    ),

    "Current Loan Type": (
      <svg width="28" height="28" viewBox="0 0 24 24">
        <path d="M3 6l9-4 9 4v2H3zM3 10h18v10H3z" />
      </svg>
    ),

    "Loan Tenure Used": (
      <svg width="28" height="28" viewBox="0 0 24 24">
        <rect x="4" y="4" width="6" height="16" />
        <rect x="14" y="8" width="6" height="12" />
      </svg>
    ),

    "Credit Score": (
      <svg width="28" height="28" fill="#1e90ff" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2" fill="none" />
      </svg>
    ),

    "Account Completion Status": (
      <svg width="28" height="28" fill="#20bf6b" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm5 7l-6 6-3-3 1.5-1.5L11 12l4.5-4.5z" />
      </svg>
    ),
  };
  
 
  return (
    <div className="container-fluid">
      <div className="row g-4">

        {userInformation.map((info, index) => (
          <div className="col-xl-3 col-lg-4 col-md-6" key={index}>
            <div className="overview-card p-4 shadow-sm">

              {/* ICON */}
              <div className="overview-icon mb-2">
                {icons[info.heading]}
              </div>

              <p className="overview-title">{info.heading}</p>
              <h3 className={`overview-value ${info.color}`}>{info.value}</h3>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default DashboardOverview;
