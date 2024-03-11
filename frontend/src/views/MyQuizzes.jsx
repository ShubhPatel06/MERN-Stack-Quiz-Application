import React, { useState } from "react";
import CreatedQuizzes from "../components/CreatedQuizzes";
import AttemptedQuizzes from "../components/AttemptedQuizzes";

const MyQuizzes = () => {
  const [activeTab, setActiveTab] = useState("created");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const fetchQuizzes = async () => {
    // Fetch quizzes based on the active tab
    if (activeTab === "created") {
      // Fetch quizzes created by the user
      // Implement your logic to fetch created quizzes from the backend
    } else if (activeTab === "attempted") {
      // Fetch attempted quizzes
      // Implement your logic to fetch attempted quizzes from the backend
    }
  };

  return (
    <main className="p-3 mx-auto max-w-7xl">
      <h1 className="my-6 text-3xl font-semibold text-center">My Quizzes</h1>
      <div className="flex items-center justify-center gap-7">
        <button
          className={`${
            activeTab === "created"
              ? "border-2 border-blue-500 "
              : "bg-gray-200 text-gray-700 border-2"
          } hover:border-blue-800 bg-gray-200 rounded-md px-4 py-2 font-semibold`}
          onClick={() => handleTabChange("created")}
        >
          Created
        </button>
        <button
          className={`${
            activeTab === "attempted"
              ? "border-2 border-blue-500 "
              : "bg-gray-200 text-gray-700 border-2"
          } hover:border-blue-800 bg-gray-200 rounded-md px-4 py-2 font-semibold`}
          onClick={() => handleTabChange("attempted")}
        >
          Attempted
        </button>
      </div>
      <section className="tab-content">
        {activeTab === "created" && <CreatedQuizzes />}
        {activeTab === "attempted" && <AttemptedQuizzes />}
      </section>
    </main>
  );
};

export default MyQuizzes;
