import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const quizAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = quizAdapter.getInitialState();

export const quizApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNewQuiz: builder.mutation({
      query: (initialNote) => ({
        url: "/quiz/create",
        method: "POST",
        body: {
          ...initialNote,
        },
      }),
      invalidatesTags: [{ type: "Quiz", id: "LIST" }],
    }),
    getQuizzes: builder.query({
      query: () => ({
        url: "/quiz/",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedQuizzes = responseData.map((quiz) => {
          quiz.id = quiz._id;
          return quiz;
        });
        return quizAdapter.setAll(initialState, loadedQuizzes);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Quiz", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Quiz", id })),
          ];
        } else return [{ type: "Quiz", id: "LIST" }];
      },
    }),
    getMyCreatedQuizzes: builder.query({
      query: () => ({
        url: "/quiz/myQuizzes",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedQuizzes = responseData.map((quiz) => {
          quiz.id = quiz._id;
          return quiz;
        });
        return quizAdapter.setAll(initialState, loadedQuizzes);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Quiz", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Quiz", id })),
          ];
        } else return [{ type: "Quiz", id: "LIST" }];
      },
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useAddNewQuizMutation,
  useGetMyCreatedQuizzesQuery,
} = quizApiSlice;

// returns the query result object
export const selectQuizResult = quizApiSlice.endpoints.getQuizzes.select();

// creates memoized selector
const selectQuizData = createSelector(
  selectQuizResult,
  (quizResult) => quizResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllQuizzes,
  selectById: selectQuizById,
  selectIds: selectQuizIds,
  // Pass in a selector that returns the notes slice of state
} = quizAdapter.getSelectors((state) => selectQuizData(state) ?? initialState);
