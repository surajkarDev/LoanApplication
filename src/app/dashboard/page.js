"use client";

import React from "react";
import Header from "./components/DashboardHeader";
import DashboardOverview from "./components/DashboardOverview";
import { useSelector } from "react-redux";
import { useState,useEffect,useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const storeEmail = useSelector(state => state.user.loginInformation);
  const [loanInformation,setLoanInformation] = useState([]);
  const userInformation = [
  { heading: "Total Active Loans", value: "2", color: "text-primary", icon: "loans" },
  { heading: "Pending Payments", value: "14,500", color: "text-danger", icon: "pending" },
  { heading: "Next EMI Date", value: "25 Nov 2025", color: "text-warning", icon: "calendar" },
  { heading: "Total Outstanding Balance", value: "80,000", color: "text-info", icon: "balance" },
  { heading: "EMIs Paid", value: "8", color: "text-success", icon: "check" },
  { heading: "Loan Approval Status", value: "Approved", color: "text-secondary", icon: "approval" },

  { heading: "Upcoming EMIs (Next 30 Days)", value: "2", color: "text-primary", icon: "calendar" },
  { heading: "Total Loans Taken", value: "5", color: "text-success", icon: "loans" },
  { heading: "Last EMI Paid On", value: "10 Nov 2025", color: "text-info", icon: "clock" },
  { heading: "Overdue EMI Count", value: "0", color: "text-danger", icon: "warning" },
  { heading: "Total Amount Paid Till Date", value: "₹1,20,000", color: "text-success", icon: "money" },
  { heading: "Interest Paid Till Date", value: "₹18,000", color: "text-warning", icon: "interest" },
  { heading: "Current Loan Type", value: "Personal Loan", color: "text-secondary", icon: "type" },
  { heading: "Loan Tenure Used", value: "8 / 24 months", color: "text-primary", icon: "tenure" },
  { heading: "Credit Score", value: "780", color: "text-info", icon: "score" },
  { heading: "Account Completion Status", value: "95%", color: "text-success", icon: "progress" },
];
const getLoanInformation = useCallback(async ()=> {
    try{
      const email = storeEmail?.email;
      if (!email) return [];
      const response = await fetch(`http://localhost:3001/loanDetails?userEmail=${email}`,{
        method:'GET',
        headers:{'Content-Type':'application/json'}
      })
      if(!response.ok){
        throw new Error("Please check Api link and userEmail");
      }
      const res = await response.json();
      setLoanInformation(res);
      return res;
    }catch (error){
      console.log("loan api error",error)
      throw error;
    }
  },[storeEmail?.email]);
  // useEffect(()=>{
  //   getLoanInformation();
  // },[])
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['loanDetails', storeEmail?.email],
    queryFn: getLoanInformation,
    enabled: !!storeEmail?.email,
  });
if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading users</p>;
  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        <ul className="sowData">
      {loanInformation.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
        {/* Sidebar Section */}
        <div className="col-lg-2 p-0 border-end bg-light">
          <Header />
        </div>

        {/* Main Dashboard Content */}
        <div className="col-lg-10 p-4 pt-0 mt-3">
          <h2 className="fw-bold mb-4">Dashboard Overview</h2>
          {/* {JSON.stringify(loanInformation)} */}
          <DashboardOverview userInformation={userInformation} />
          <ul>
            {data.map(user => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
