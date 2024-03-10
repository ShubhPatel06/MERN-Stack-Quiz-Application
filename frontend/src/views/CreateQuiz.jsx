import { useEffect, useState } from "react";
import QuizQuestions from "../components/QuizQuestions";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAddNewQuizMutation } from "../features/quiz/quizApiSlice";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

const CreateQuiz = () => {
  const [addNewQuiz, { isLoading, isSuccess, isError, error }] =
    useAddNewQuizMutation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    opensOn: "",
    closesOn: "",
    startTime: "",
    endTime: "",
    password: "",
    questions: [],
  });

  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      navigate("/home");
    }
  }, [isSuccess, navigate]);

  const onQuestionsUpdate = (questions) => {
    setFormData({
      ...formData,
      questions,
    });
  };

  // Add validation logic to ensure start and end times are within open and close dates
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addNewQuiz(formData);
      setFormData({
        title: "",
        description: "",
        opensOn: "",
        closesOn: "",
        startTime: "",
        endTime: "",
        password: "",
        questions: [],
      });
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg(err.data.message);
      } else if (err.status === 401) {
        setErrMsg(err.data.message);
      } else {
        setErrMsg(err.data.message);
      }
      errRef.current.focus();
    }
  };

  return (
    <main className="p-3 mx-auto max-w-7xl">
      <h1 className="my-6 text-3xl font-semibold text-center">Create a Quiz</h1>
      <form onSubmit={handleSubmit}>
        {/*Title*/}
        <div className="">
          <label htmlFor="title" className="text-lg font-medium text-gray-700">
            Quiz Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
            placeholder="Quiz Title"
            className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm bg-slate-50"
          />
        </div>
        {/* Description */}
        <div className="mt-3">
          <label
            htmlFor="description"
            className="text-lg font-medium text-gray-700"
          >
            Quiz Description
          </label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            placeholder="Describe your quiz"
            className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm bg-slate-50"
          ></textarea>
        </div>
        <div className="flex flex-col w-full gap-3 mt-2 sm:flex-row">
          {/* Opens On */}
          <div className="flex-1">
            <label
              htmlFor="opensOn"
              className="text-lg font-medium text-gray-700"
            >
              Opens On
            </label>
            <input
              type="date"
              name="opensOn"
              id="opensOn"
              value={formData.opensOn}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  opensOn: e.target.value,
                })
              }
              placeholder="Opening Date"
              min={new Date().toISOString().split("T")[0]}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm bg-slate-50"
            />
          </div>
          {/* Closes On */}
          <div className="flex-1">
            <label
              htmlFor="closesOn"
              className="text-lg font-medium text-gray-700"
            >
              Closes On
            </label>
            <input
              type="date"
              name="closesOn"
              id="closesOn"
              value={formData.closesOn}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  closesOn: e.target.value,
                })
              }
              min={new Date().toISOString().split("T")[0]}
              placeholder="Closing Date"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm bg-slate-50"
            />
          </div>
        </div>
        <div className="flex flex-col w-full gap-3 mt-3 sm:flex-row">
          {/* Start Time */}
          <div className="flex-1">
            <label
              htmlFor="startTime"
              className="text-lg font-medium text-gray-700"
            >
              Start Time <span className="text-xs">(optional)</span>
            </label>
            <input
              type="datetime-local"
              name={`startTime`}
              id={`startTime`}
              value={formData.startTime}
              onChange={(ev) =>
                setFormData({
                  ...formData,
                  startTime: ev.target.value,
                })
              }
              min={formData.opensOn ? `${formData.opensOn}T00:00` : ""}
              max={formData.closesOn ? `${formData.closesOn}T23:59` : ""}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm bg-slate-50"
            />
          </div>
          {/* End Time */}
          <div className="flex-1">
            <label
              htmlFor="endTime"
              className="text-lg font-medium text-gray-700"
            >
              End Time <span className="text-xs">(optional)</span>
            </label>
            <input
              type="datetime-local"
              name={`endTime`}
              id={`endTime`}
              value={formData.endTime}
              onChange={(ev) =>
                setFormData({
                  ...formData,
                  endTime: ev.target.value,
                })
              }
              min={formData.opensOn ? `${formData.opensOn}T00:00` : ""}
              max={formData.closesOn ? `${formData.closesOn}T23:59` : ""}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm bg-slate-50"
            />
          </div>
          {/* Password */}
          <div className="flex-1">
            <div className="relative">
              <label
                htmlFor="password"
                className="text-lg font-medium text-gray-700"
              >
                Password <span className="text-xs">(optional)</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm bg-slate-50"
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
              />
              <button
                type="button"
                className="absolute text-gray-400 transform -translate-y-1/2 top-2/3 right-2 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <QuizQuestions
            questions={formData.questions}
            onQuestionsUpdate={onQuestionsUpdate}
          />
        </div>
        <div className="flex items-center justify-end mt-3 w-100">
          <button
            className="px-4 py-2 font-semibold text-white rounded-md bg-emerald-500 hover:bg-emerald-600 sm:px-6"
            type="submit"
          >
            {isLoading ? <PulseLoader color={"#FFF"} /> : "Save"}
          </button>
        </div>
      </form>
      <p className="p-1 mb-2 text-red-600">{errMsg}</p>
      <p className="p-1 mb-2 text-center text-red-600">
        {error?.data?.message}
      </p>
    </main>
  );
};

export default CreateQuiz;
