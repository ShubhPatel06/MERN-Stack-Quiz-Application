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

export const updateQuiz = async (req, res, next) => {
  try {
    const {
      id,
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
          "Title, Description, Opens On, Closes On, Time Limit, and Questions fields are required",
      });
    }

    const updatedQuizData = {
      title,
      description,
      opensOn,
      closesOn,
      timeLimit,
      startTime,
      endTime,
      password,
    };

    // Find the quiz by ID
    const quiz = await Quiz.findById(id).exec();

    // If quiz not found
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Check if the user is authorized to update the quiz
    if (quiz.createdBy.toString() !== createdBy) {
      return res.status(403).json({
        message: "Forbidden. You are not authorized to update this quiz.",
      });
    }

    // Update quiz details
    Object.assign(quiz, updatedQuizData);

    // Update or create questions associated with the quiz
    const updatedQuestionIds = [];
    const processedQuestions = new Set(); // Use a Set to keep track of processed question IDs
    for (const q of questions) {
      let question;
      if (q._id) {
        // If question already exists, find it by ID and update it
        question = await Question.findById(q._id);
        if (!question) {
          // Handle case where question with given ID is not found
          return res.status(404).json({ message: "Question not found" });
        }
        // Update question fields
        question.type = q.type;
        question.question = q.question;
        question.marks = q.marks;
        question.data = q.data;
        // Save the updated question
        await question.save();
        // Push the question ID only if it hasn't been processed before
        if (!processedQuestions.has(q._id.toString())) {
          updatedQuestionIds.push(q._id);
          processedQuestions.add(q._id.toString()); // Add the processed question ID to the Set
        }
      } else {
        // If question is new, create it and push its ID to the quiz
        question = new Question({
          type: q.type,
          question: q.question,
          marks: q.marks,
          data: q.data,
        });
        // Save the question to get its ID
        await question.save();
        // Push the new question ID only if it hasn't been processed before
        if (!processedQuestions.has(question._id.toString())) {
          updatedQuestionIds.push(question._id);
          processedQuestions.add(question._id.toString()); // Add the processed question ID to the Set
        }
      }
    }

    // Merge existing question IDs into updatedQuestionIds
    quiz.questions.forEach((q) => {
      if (!processedQuestions.has(q.toString())) {
        updatedQuestionIds.push(q);
        processedQuestions.add(q.toString());
      }
    });

    // Update the quiz with the updated question references
    quiz.questions = updatedQuestionIds;
    await quiz.save();

    res.json({ success: true, quiz });
  } catch (error) {
    next(error);
  }
};

// export const updateQuiz = async (req, res, next) => {
//   try {
//     const {
//       id,
//       title,
//       description,
//       opensOn,
//       closesOn,
//       timeLimit,
//       startTime,
//       endTime,
//       password,
//       questions,
//     } = req.body;

//     const createdBy = req.id;

//     if (
//       !title ||
//       !description ||
//       !opensOn ||
//       !closesOn ||
//       !timeLimit ||
//       !questions
//     ) {
//       return res.status(400).json({
//         message:
//           "Title, Description, Opens On, Closes On, Time Limit, and Questions fields are required",
//       });
//     }

//     const updatedQuizData = {
//       title,
//       description,
//       opensOn,
//       closesOn,
//       timeLimit,
//       startTime,
//       endTime,
//       password,
//     };

//     // Find the quiz by ID
//     const quiz = await Quiz.findById(id).exec();

//     // If quiz not found
//     if (!quiz) {
//       return res.status(404).json({ message: "Quiz not found" });
//     }

//     // Check if the user is authorized to update the quiz
//     if (quiz.createdBy.toString() !== createdBy) {
//       return res.status(403).json({
//         message: "Forbidden. You are not authorized to update this quiz.",
//       });
//     }

//     // Update quiz details
//     Object.assign(quiz, updatedQuizData);

//     questions.forEach(q => {
//       if (q._id) {

//       }
//     });

//     // Update the quiz with the updated question references
//     quiz.questions = updatedQuestionIds;
//     await quiz.save();

//     res.json({ success: true, quiz });
//   } catch (error) {
//     next(error);
//   }
// };
