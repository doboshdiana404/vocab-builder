import { baseApi } from "../baseApi";

export const trainingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTrainingTasks: builder.query<
      { tasks: { _id: string; ua: string; en: string; task: "en" | "ua" }[] },
      void
    >({
      query: () => "/words/tasks",
      providesTags: ["Words"],
    }),

    sendTrainingAnswers: builder.mutation<
      any,
      {
        _id: string;
        task: "en" | "ua";
        ua: string;
        en?: string;
      }[]
    >({
      query: (answers) => ({
        url: "/words/answers",
        method: "POST",
        body: answers,
      }),
      invalidatesTags: ["Words"],
    }),
  }),
});

export const { useGetTrainingTasksQuery, useSendTrainingAnswersMutation } =
  trainingApi;
