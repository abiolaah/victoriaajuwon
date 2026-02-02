import { Header } from "@/components/header";
import { HistoryList } from "@/components/history-list";
import { Education, Experience } from "@/lib/data/test";
import React from "react";

const ExperiencePage = () => {
  return (
    <>
      <Header />
      <HistoryList workHistory={Experience} educationHistory={Education} />
    </>
  );
};

export default ExperiencePage;
