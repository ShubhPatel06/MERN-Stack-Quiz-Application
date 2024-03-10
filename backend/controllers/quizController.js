import Quiz from "../models/quizModel.js";
import Question from "../models/questionModel.js";

export const createQuiz = async (req, res, next) => {
  try {
    const {
      title,
      description,
      opensOn,
      closesOn,
      startTime,
      endTime,
      password,
      questions,
    } = req.body;

    const createdBy = req.id;

    // Create the quiz
    const quiz = new Quiz({
      title,
      description,
      opensOn,
      closesOn,
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
