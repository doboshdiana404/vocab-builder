import { baseApi } from "../baseApi";
import type {
  GetTrainingTasksResponse,
  SendTrainingAnswersRequest,
  SendTrainingAnswersResponse,
} from "./types";
export const trainingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTrainingTasks: builder.query<GetTrainingTasksResponse, void>({
      query: () => "/words/tasks",
      providesTags: ["Words"],
    }),

    sendTrainingAnswers: builder.mutation<
    SendTrainingAnswersResponse,
    SendTrainingAnswersRequest[]
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
