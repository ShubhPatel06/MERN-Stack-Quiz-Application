import { useEffect, useState } from "react";
import QuizQuestions from "../components/QuizQuestions";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  useAddNewQuizMutation,
  useGetQuizzesQuery,
  useUpdateQuizMutation,
} from "../features/quiz/quizApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import toast, { Toaster } from "react-hot-toast";

const CreateQuiz = () => {
  const [
    addNewQuiz,
    {
      isLoading: isLoadingAdd,
      isSuccess: isSuccessAdd,
      isError: isErrorAdd,
      error: errorAdd,
    },
  ] = useAddNewQuizMutation();

  const [
    updateQuiz,
    {
      isLoading: isLoadingUpdate,
      isSuccess: isSuccessUpdate,
      isError: isErrorUpdate,
      error: errorUpdate,
    },
  ] = useUpdateQuizMutation();

  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    opensOn: "",
    closesOn: "",
    timeLimit: "",
    password: "",
    questions: [],
  });

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const notifyCreated = () =>
    toast.success("Quiz Created. Redirecting to your quizzes");
  const notifyUpdated = () =>
    toast.success("Quiz Updated. Redirecting to your quizzes");

  useEffect(() => {
    if (isSuccessAdd) {
      notifyCreated();

      setTimeout(() => {
        navigate("/my-quizzes");
      }, 2500);
    }

    if (isSuccessUpdate) {
      notifyUpdated();
      setTimeout(() => {
        navigate("/my-quizzes");
      }, 2500);
    }
  }, [isSuccessAdd, isSuccessUpdate, navigate]);

  const onQuestionsUpdate = (questions) => {
    setFormData({
      ...formData,
      questions,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      if (id) {
        // If ID exists, it means we're updating the quiz
        const updatedFormData = { ...formData, id }; // Include the id in the formData
        await updateQuiz(updatedFormData);
      } else {
        // Otherwise, it's a new quiz creation
        await addNewQuiz(formData);

        setFormData({
          // Reset the form data after submission
          title: "",
          description: "",
          opensOn: "",
          closesOn: "",
          timeLimit: "",
          password: "",
          questions: [],
        });
      }
    } catch (err) {
      // Handle errors
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

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const options = {
      timeZone: "Africa/Nairobi", // Set the time zone to Nairobi, Kenya
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDate = date.toLocaleString("en-KE", options);
    const [datePart, timePart] = formattedDate.split(", ");
    const [day, month, year] = datePart.split("/");
    const [hour, minute] = timePart.split(":");
    return `${year}-${month}-${day}T${hour}:${minute}`;
  };

  const { quiz } = useGetQuizzesQuery("quizList", {
    selectFromResult: ({ data }) => ({
      quiz: data?.entities[id],
    }),
    skip: !id,
  });

  useEffect(() => {
    if (id && quiz) {
      // console.log(quiz.questions);
      const updatedQuestions = quiz.questions.map((question) => {
        const { _id, ...rest } = question;
        return { id: _id, ...rest };
      });

      setFormData({
        title: quiz.title,
        description: quiz.description,
        opensOn: formatDateTime(quiz.opensOn),
        closesOn: formatDateTime(quiz.closesOn),
        timeLimit: quiz.timeLimit,
        questions: updatedQuestions,
      });
    }
  }, [id, quiz]);

  return (
    <main className="p-3 mx-auto max-w-7xl">
      <Toaster />
      <h1 className="my-6 text-3xl font-semibold text-center">
        {!id ? "Create a Quiz" : "Update Quiz"}
      </h1>
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
              htmlFor="startTime"
              className="text-lg font-medium text-gray-700"
            >
              Opens On
            </label>
            <input
              type="datetime-local"
              name={`startTime`}
              id={`startTime`}
              value={formData.opensOn}
              onChange={(ev) =>
                setFormData({
                  ...formData,
                  opensOn: ev.target.value,
                })
              }
              min={new Date().toISOString().split("T")[0]}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm bg-slate-50"
            />
          </div>
          {/* Closes On */}
          <div className="flex-1">
            <label
              htmlFor="endTime"
              className="text-lg font-medium text-gray-700"
            >
              Closes on
            </label>
            <input
              type="datetime-local"
              name={`endTime`}
              id={`endTime`}
              value={formData.closesOn}
              onChange={(ev) =>
                setFormData({
                  ...formData,
                  closesOn: ev.target.value,
                })
              }
              min={new Date().toISOString().split("T")[0]}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm bg-slate-50"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="timeLimit"
              className="text-lg font-medium text-gray-700"
            >
              Time Limit <span className="text-xs">(mins)</span>
            </label>
            <input
              type="number"
              name="timeLimit"
              id="timeLimit"
              value={formData.timeLimit}
              min={1}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  timeLimit: e.target.value,
                })
              }
              placeholder="Time Limit"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm bg-slate-50"
            />
          </div>
        </div>
        {/* Password */}
        <div className="mt-2">
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
              // value={formData.password}
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
            {isLoadingAdd || isLoadingUpdate ? (
              <PulseLoader color={"#FFF"} />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
      {isSuccessUpdate && (
        <p className="p-1 mb-2 text-center text-emerald-600">{successMsg}</p>
      )}
      <p className="p-1 mb-2 text-center text-red-600">{errMsg}</p>
      {isErrorAdd ||
        (isErrorUpdate && (
          <p className="p-1 mb-2 text-center text-red-600">
            {errorAdd?.data?.message || errorUpdate?.data?.message}
          </p>
        ))}
    </main>
  );
};

export default CreateQuiz;
