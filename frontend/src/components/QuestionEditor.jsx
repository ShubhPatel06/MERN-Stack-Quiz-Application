import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

export default function QuestionEditor({
  index = 0,
  question,
  addQuestion,
  deleteQuestion,
  questionChange,
}) {
  const [model, setModel] = useState({ ...question });

  const [questionTypes] = useState(["text", "select", "radio", "checkbox"]);

  const shouldHaveOptions = (type = null) => {
    type = type || model.type;
    return ["select", "radio", "checkbox"].includes(type);
  };

  const onTypeChange = (ev) => {
    const newModel = {
      ...model,
      type: ev.target.value,
    };
    if (!shouldHaveOptions(model.type) && shouldHaveOptions(ev.target.value)) {
      if (!model.data.options) {
        newModel.data = {
          options: [{ uuid: uuidv4(), text: "" }],
        };
      }
    }
    setModel(newModel);
  };

  const addOption = () => {
    model.data.options.push({
      uuid: uuidv4(),
      text: "",
    });
    setModel({ ...model });
  };

  const deleteOption = (op) => {
    model.data.options = model.data.options.filter(
      (option) => option.uuid != op.uuid
    );
    setModel({ ...model });
  };

  const handleCorrectAnswerChange = (ev) => {
    const value = ev.target.value;
    const type = model.type;
    const newModel = { ...model };

    // If the question type is select, radio, or checkbox
    if (!newModel.data.correctAnswer) {
      // If correctAnswer is not yet initialized, initialize it as an empty array
      newModel.data.correctAnswer = [];
    }

    if (type === "text") {
      // If the question type is text, directly set the correct answer value
      newModel.data.correctAnswer = [value];
    } else {
      if (ev.target.checked) {
        // If the option is checked, add its value to the correct answer array
        newModel.data.correctAnswer.push(value);
      } else {
        // If the option is unchecked, remove its value from the correct answer array
        const index = newModel.data.correctAnswer.indexOf(value);
        if (index !== -1) {
          newModel.data.correctAnswer.splice(index, 1);
        }
      }
    }
    // Set the updated model
    setModel(newModel);
  };

  useEffect(() => {
    questionChange(model);
  }, [model]);

  const upperCaseFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      <div>
        <div className="flex justify-between mt-2 mb-3">
          <h4>
            {index + 1}. {model.question}
          </h4>
          <div className="flex items-center">
            <button
              type="button"
              className="flex items-center px-3 py-1 mr-2 text-xs text-white bg-blue-600 rounded-sm hover:bg-blue-700"
              onClick={() => addQuestion(index + 1)}
            >
              <FaPlus className="w-4" />
              Add
            </button>
            <button
              type="button"
              className="flex items-center px-3 py-1 text-xs font-semibold text-red-500 border border-transparent rounded-sm hover:border-red-600"
              onClick={() => deleteQuestion(question)}
            >
              <FaTrash className="w-4" />
              Delete
            </button>
          </div>
        </div>
        <div className="flex justify-between gap-3 mb-3">
          {/* Question Text */}
          <div className="flex-grow">
            <label
              htmlFor="question"
              className="text-sm font-medium text-gray-700 "
            >
              Question
            </label>
            <input
              type="text"
              name="question"
              id="question"
              value={model.question}
              onChange={(ev) =>
                setModel({
                  ...model,
                  question: ev.target.value,
                })
              }
              className="w-full px-3 py-1 mt-1 border border-gray-300 rounded-md shadow-sm bg-slate-50"
            />
          </div>
          {/* Question Text */}

          {/* Question Type */}
          <div>
            <label
              htmlFor="questionType"
              className="w-40 text-sm font-medium text-gray-700 "
            >
              Question Type
            </label>
            <select
              id="questionType"
              name="questionType"
              value={model.type}
              onChange={onTypeChange}
              className="w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm sm:text-sm"
            >
              {questionTypes.map((type) => (
                <option value={type} key={type}>
                  {upperCaseFirst(type)}
                </option>
              ))}
            </select>
          </div>
          {/* Question Type */}
        </div>

        <div>
          {shouldHaveOptions() && (
            <div>
              <h4 className="flex items-center justify-between mb-2 text-sm font-semibold text-gray-700">
                Options
                <button
                  onClick={addOption}
                  type="button"
                  className="flex items-center px-2 py-1 text-xs text-white bg-blue-600 rounded-sm hover:bg-blue-700"
                >
                  Add
                </button>
              </h4>
              {model.data.options.length === 0 && (
                <div className="text-xs text-gray-600 text-center py-3}">
                  You don't have options defined
                </div>
              )}
              {model.data.options.length > 0 && (
                <div>
                  {model.data.options.map((op, ind) => (
                    <div key={op.uuid} className="flex items-center mb-1">
                      <span className="w-6 text-sm">{ind + 1}.</span>
                      <input
                        type="text"
                        value={op.text ? op.text : ""}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md shadow-sm bg-slate-50 "
                        onInput={(ev) => {
                          op.text = ev.target.value;
                          setModel({ ...model });
                        }}
                      />
                      <button
                        onClick={(ev) => deleteOption(op)}
                        type="button"
                        className="flex items-center justify-center w-6 h-6 transition-colors border border-transparent rounded-full hover:border-red-100"
                      >
                        <FaTrash className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        {/* {model.type === "select" && <div></div>} */}

        {/* Correct Answer */}
        {model.type === "text" && (
          <div className="mb-3">
            <h4 className="mt-4 mb-1 text-sm text-gray-700">
              Select Correct Answer
            </h4>
            <input
              type="text"
              value={model.data.correctAnswer || ""}
              onChange={(e) => handleCorrectAnswerChange(e)}
              className="w-full px-2 py-1 mt-1 border border-gray-300 rounded-md shadow-sm bg-slate-50"
            />
          </div>
        )}

        {shouldHaveOptions() && model.type !== "text" && (
          <div className="mb-3">
            <h4 className="mt-4 mb-2 text-sm font-semibold text-gray-700">
              Select Correct Answer
            </h4>
            {model.data.options.length === 0 ? (
              <div className="text-gray-600">
                Add options to select the correct answer
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                {model.data.options.map((op, ind) => (
                  <div key={op.uuid} className="flex items-center gap-1">
                    {model.type === "checkbox" ? (
                      <input
                        type="checkbox"
                        id={`correct-answer-${ind}`}
                        value={op.text || ""}
                        checked={model.data.correctAnswer?.includes(op.text)}
                        onChange={handleCorrectAnswerChange}
                      />
                    ) : (
                      <input
                        type="radio"
                        id={`correct-answer-${ind}`}
                        value={op.text || ""}
                        checked={model.data.correctAnswer?.includes(op.text)}
                        onChange={handleCorrectAnswerChange}
                      />
                    )}
                    <label htmlFor={`correct-answer-${ind}`}>{op.text}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Correct Answer */}
      </div>
      <hr />
    </>
  );
}
