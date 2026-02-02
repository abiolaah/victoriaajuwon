import { SummaryView } from "@/components/admin/summary-view";
import { Header } from "@/components/header";
import React from "react";

const AdminSummaryPage = () => {
  return (
    <>
      <Header isAdmin />
      <SummaryView />
    </>
  );
};

export default AdminSummaryPage;
