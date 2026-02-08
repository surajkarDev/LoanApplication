"use client";
import React, { useState,useEffect } from "react";
import { Nav } from "react-bootstrap";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { dashboardActive } from "@/app/redux/userSlice";
import "../../css/styles.css";
import { usePathname } from "next/navigation";

const DashboardHeader = () => {
  const [navigateLinks] = useState([
    { text: "Dashboard Overview", link: "/dashboard" },
    { text: "My Loans", link: "/dashboard/MyLoans" },
    { text: "Pending Payments", link: "/dashboard/PendingPayment" },
    { text: "Loan Calculator", link: "/dashboard/LoanCalculator" },
    { text: "Transactions", link: "/dashboard/Transactions" },
    { text: "Reports & Analytics", link: "/dashboard/Reports" },
    { text: "Profile / Account Settings", link: "/dashboard/Profile" },
    { text: "Support / Help Center", link: "/dashboard/Support" },
    { text: "Logout", link: "/logout" },
  ]);

  const [hoverIndex, setHoverIndex] = useState(null);
  const activeLink = useSelector((state) => state.user.dashboardActiveLinks);
  const dispatch = useDispatch();
  const pathname = usePathname(); 

  const handleActiveClick = (link) => {
     // Redux handles localStorage internally
  };
  useEffect(()=>{
    dispatch(dashboardActive(pathname));
  },[])
  return (
    <ul className="p-0">
      {navigateLinks.map((item, index) => {
        const isHovered = hoverIndex === index;
        const isActive = activeLink === item.link;
        const liClasses = [
          "py-3 px-4 border",
          isActive ? "activeLink" : "",
          isHovered && !isActive ? "bg-black text-white" : ""
        ].join(" ").trim();
        return (
          <li
            key={index}
            className={liClasses}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => handleActiveClick(item.link)}
          >
            <Nav.Link as={Link} href={item.link}>
              {item.text}
            </Nav.Link>
          </li>
        );
      })}
    </ul>
  );
};

export default DashboardHeader;
