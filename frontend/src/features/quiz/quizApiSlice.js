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
  }),
});

export const { useAddNewQuizMutation } = quizApiSlice;
