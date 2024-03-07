import { useState } from "react";

const CreateQuiz = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    opensOn: "",
    closesOn: "",
    startTime: "",
    endTime: "",
    password: "",
    questions: [{ question: "", answers: ["", ""], correctAnswerIndex: null }],
  });

  return (
    <main className="p-3 mx-auto max-w-7xl">
      <h1 className="my-6 text-3xl font-semibold text-center">Create a Quiz</h1>
      <form>
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
              placeholder="Date"
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
              placeholder="Date"
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
              type="time"
              name="startTime"
              id="startTime"
              value={formData.startTime}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  startTime: e.target.value,
                })
              }
              placeholder="Start Time"
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
              type="time"
              name="endTime"
              id="endTime"
              value={formData.endTime}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  endTime: e.target.value,
                })
              }
              placeholder="End Time"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm bg-slate-50"
            />
          </div>
          {/* Password */}
          <div className="flex-1">
            <label
              htmlFor="password"
              className="text-lg font-medium text-gray-700"
            >
              Password <span className="text-xs">(optional)</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              placeholder="Password"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm bg-slate-50"
            />
          </div>
        </div>
        <div className="mt-3">
          <label
            htmlFor="questions"
            className="text-lg font-medium text-gray-700"
          >
            Questions
          </label>
        </div>
      </form>
    </main>
  );
};

export default CreateQuiz;
