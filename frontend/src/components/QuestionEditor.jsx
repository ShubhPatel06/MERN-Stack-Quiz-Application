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
    // Check if the deleted option was selected as a correct answer
    const wasCorrectAnswer =
      model.data.correctAnswer && model.data.correctAnswer.includes(op.text);

    // Remove the option
    model.data.options = model.data.options.filter(
      (option) => option.uuid !== op.uuid
    );

    // If the deleted option was selected as a correct answer, remove it from the correctAnswer array
    if (wasCorrectAnswer) {
      model.data.correctAnswer = model.data.correctAnswer.filter(
        (item) => item !== op.text
      );
    }

    setModel({ ...model });
  };

  const handleCorrectAnswerChange = (ev, questionIndex) => {
    const value = ev.target.value;
    const type = model.type;
    const newModel = { ...model };

    if (questionIndex !== index) {
      return; // Ignore changes for other questions
    }

    if (!newModel.data.correctAnswer) {
      newModel.data.correctAnswer = [];
    }

    if (type === "text") {
      newModel.data.correctAnswer = [value];
    } else {
      if (ev.target.checked) {
        if (type === "checkbox") {
          // For checkbox type, add the value if it's not already present
          if (!newModel.data.correctAnswer.includes(value)) {
            newModel.data.correctAnswer.push(value);
          }
        } else {
          // For radio buttons, only the selected value should be added
          newModel.data.correctAnswer = [value];
        }
      } else {
        if (type === "checkbox") {
          // For checkbox type, remove the value if it's present
          newModel.data.correctAnswer = newModel.data.correctAnswer.filter(
            (item) => item !== value
          );
        }
        // For radio buttons, unchecking is not applicable, so no action is needed here
      }
    }
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
          <div className="flex-grow">
            <label
              htmlFor={`question-${index}`}
              className="text-sm font-medium text-gray-700"
            >
              Question
            </label>
            <input
              type="text"
              name={`question-${index}`}
              id={`question-${index}`}
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
          <div className="flex justify-between gap-3 mb-3">
            <div className="flex-grow">
              <label
                htmlFor={`marks-${index}`}
                className="text-sm font-medium text-gray-700"
              >
                Marks
              </label>
              <input
                type="number"
                name={`marks-${index}`}
                id={`marks-${index}`}
                value={model.marks}
                min={1}
                max={15}
                onChange={(ev) =>
                  setModel({
                    ...model,
                    marks: parseInt(ev.target.value), // Convert the value to integer
                  })
                }
                className="w-full px-3 py-1 mt-1 border border-gray-300 rounded-md shadow-sm bg-slate-50"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor={`questionType-${index}`}
              className="w-40 text-sm font-medium text-gray-700"
            >
              Question Type
            </label>
            <select
              id={`questionType-${index}`}
              name={`questionType-${index}`}
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
        </div>

        <div>
          {shouldHaveOptions() && (
            <div>
              <label className="flex items-center justify-between mb-2 text-sm font-semibold text-gray-700">
                Options
                <button
                  onClick={addOption}
                  type="button"
                  className="flex items-center px-2 py-1 text-xs text-white bg-blue-600 rounded-sm hover:bg-blue-700"
                >
                  Add Option
                </button>
              </label>
              {model.data.options.length === 0 && (
                <div className="py-3 text-xs text-center text-gray-600">
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
                        name={`option-${ind}`}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md shadow-sm bg-slate-50"
                        onChange={(ev) => {
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

        {model.type === "text" && (
          <div className="mb-3">
            <label className="mt-4 mb-1 text-sm text-gray-700">
              Enter Correct Answer
            </label>
            <input
              type="text"
              name={`correctAnswer-${index}`}
              id={`correctAnswer-${index}`}
              value={model.data.correctAnswer}
              onChange={(e) => handleCorrectAnswerChange(e, null, index)}
              className="w-full px-2 py-1 mt-1 border border-gray-300 rounded-md shadow-sm bg-slate-50"
            />
          </div>
        )}

        {shouldHaveOptions() && model.type !== "text" && (
          <div className="mb-3">
            <label className="mt-4 mb-2 text-sm font-semibold text-gray-700">
              Select Correct Answer
            </label>
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
                        value={op.text || ""}
                        name={`correctAnswer-${ind}`}
                        onChange={(e) =>
                          handleCorrectAnswerChange(e, op, index)
                        }
                      />
                    ) : (
                      <input
                        type="radio"
                        value={op.text || ""}
                        name={`correctAnswer-${index}`}
                        onChange={(e) =>
                          handleCorrectAnswerChange(e, op, index)
                        }
                      />
                    )}
                    <label>{op.text}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <hr />
    </>
  );
}
