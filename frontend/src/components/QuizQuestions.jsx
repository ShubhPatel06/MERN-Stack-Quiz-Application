import { useEffect, useState } from "react";
import QuestionEditor from "./QuestionEditor";
import { v4 as uuidv4 } from "uuid";
import { FaPlus } from "react-icons/fa";

const QuizQuestions = ({ questions, onQuestionsUpdate }) => {
  const [myQuestions, setMyQuestions] = useState({ ...questions });

  const addQuestion = (index) => {
    index = index !== undefined ? index : myQuestions?.length;
    myQuestions?.splice(index, 0, {
      id: uuidv4(),
      type: "text",
      question: "",
      marks: "",
      data: { correctAnswer: [] },
    });
    setMyQuestions([...myQuestions]);
    onQuestionsUpdate(myQuestions);
  };

  const questionChange = (question) => {
    if (!question) return;
    const newQuestions = myQuestions.map((q) => {
      if (q.id == question.id) {
        return { ...question };
      }
      return q;
    });
    setMyQuestions(newQuestions);
    onQuestionsUpdate(newQuestions);
  };

  const deleteQuestion = (question) => {
    const newQuestions = myQuestions.filter((q) => q.id !== question.id);

    setMyQuestions(newQuestions);
    onQuestionsUpdate(newQuestions);
  };

  useEffect(() => {
    setMyQuestions(questions);
  }, [questions]);

  return (
    <>
      <div className="flex justify-between mb-3">
        <h3 className="text-lg font-medium text-gray-700">Questions</h3>
        <button
          type="button"
          className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-blue-600 rounded-sm hover:bg-blue-700"
          onClick={() => addQuestion()}
        >
          <FaPlus size={15} />
          <span className="">Add</span>
        </button>
      </div>
      {myQuestions?.length ? (
        myQuestions?.map((q, ind) => (
          <QuestionEditor
            key={q.id}
            index={ind}
            question={q}
            questionChange={questionChange}
            addQuestion={addQuestion}
            deleteQuestion={deleteQuestion}
          />
        ))
      ) : (
        <div className="py-4 text-center text-gray-400">
          You don't have any questions created
        </div>
      )}
    </>
  );
};

export default QuizQuestions;
