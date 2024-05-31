import React from "react";
import { Link } from "react-router-dom";

function QuickAccess() {
  return (
    <div>
      <ul>
        <li className="hover:text-red-500">
          <Link to="/recharge">Recharge</Link>
        </li>
        <li className="hover:text-red-500">
          <Link to="/faq">Support</Link>
        </li>
        <li className="hover:text-red-500">
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
}

export default QuickAccess;
