import Quiz from "../models/quizModel.js";
import Question from "../models/questionModel.js";

export const getAllQuizzes = async (req, res) => {
  try {
    // Fetch quizzes
    const quizzes = await Quiz.find().populate("questions").lean();

    // If no quizzes found
    if (!quizzes?.length) {
      return res.status(404).json({ message: "No quizzes found!" });
    }

    res.json(quizzes);
  } catch (error) {
    next(error);
  }
};

export const getCreatedQuizzes = async (req, res) => {
  const createdBy = req.id;

  try {
    // Fetch quizzes created by the user
    const quizzes = await Quiz.find({ createdBy }).lean();

    // If no quizzes found
    if (!quizzes?.length) {
      return res.status(404).json({ message: "No quizzes found for the user" });
    }

    res.json(quizzes);
  } catch (error) {
    next(error);
  }
};

export const createQuiz = async (req, res, next) => {
  try {
    const {
      title,
      description,
      opensOn,
      closesOn,
      timeLimit,
      startTime,
      endTime,
      password,
      questions,
    } = req.body;

    const createdBy = req.id;

    if (
      !title ||
      !description ||
      !opensOn ||
      !closesOn ||
      !timeLimit ||
      !questions
    ) {
      return res.status(400).json({
        message:
          "Title, Description, Opens On, Closes On, Time Limit and Questions fields are required",
      });
    }

    // Create the quiz
    const quiz = new Quiz({
      title,
      description,
      opensOn,
      closesOn,
      timeLimit,
      startTime,
      endTime,
      password,
      createdBy,
    });

    // Save the quiz to the database
    await quiz.save();

    // Create and save each question associated with the quiz
    const questionIds = [];
    for (const q of questions) {
      const question = new Question({
        type: q.type,
        question: q.question,
        marks: q.marks,
        data: q.data,
      });
      await question.save();
      questionIds.push(question._id);
    }

    // Update the quiz with the question references
    quiz.questions = questionIds;
    await quiz.save();

    res.status(201).json({ success: true, quiz });
  } catch (error) {
    next(error);
  }
};
