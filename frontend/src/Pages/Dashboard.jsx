import React from "react";
import Recipient from "./Dashboard/Recipient";
import Donor from "./Dashboard/Donor";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user.user_type === "donor") {
    return <Donor />;
  }

  return <Recipient />;
}
