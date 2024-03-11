import React from "react";
import { useGetMyCreatedQuizzesQuery } from "../features/quiz/quizApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import { Link } from "react-router-dom";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";

const CreatedQuizzes = () => {
  const {
    data: quizzes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMyCreatedQuizzesQuery("quizList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  return (
    <>
      {isLoading ? (
        <PulseLoader color={"#FFF"} />
      ) : (
        <>
          {isError && (
            <p className="p-1 mb-2 text-red-600">{error?.data?.message}</p>
          )}
          {isSuccess && (
            <div className="mt-4">
              {Object.values(quizzes.entities).map((quiz) => (
                <div
                  key={quiz.id}
                  className="p-2 mb-3 border rounded-md bg-slate-50"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-gray-700 sm:text-xl">
                      {quiz.title}
                    </h2>
                    <div className="flex items-center gap-3">
                      {/* <Link className="p-2 rounded-md bg-cyan-400 hover:bg-cyan-500">
                        <FaEye color="FFF" />
                      </Link> */}
                      <Link
                        to={`/edit-quiz/${quiz.id}`}
                        className="p-2 rounded-md bg-emerald-500 hover:bg-emerald-600"
                      >
                        <FaPen color="FFF" />
                      </Link>
                      <Link className="p-2 bg-red-500 rounded-md hover:bg-red-600">
                        <FaTrash color="FFF" />
                      </Link>
                    </div>
                  </div>
                  <p className="my-2">{quiz.description}</p>
                  <div className="flex flex-col items-start gap-2 font-semibold text-gray-600 sm:flex-row sm:gap-4">
                    <p className="my-1">
                      Opens on:
                      <span className="text-emerald-600">
                        {" "}
                        {new Date(quiz.startTime).toLocaleString()}
                      </span>
                    </p>
                    <p className="my-1">
                      Closes on:{" "}
                      <span className="text-red-600">
                        {new Date(quiz.endTime).toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CreatedQuizzes;
