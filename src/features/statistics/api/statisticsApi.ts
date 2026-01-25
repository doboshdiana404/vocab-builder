import { baseApi } from "../../../store/baseApi";

export const statisticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStatistics: builder.query({
      query: () => "/words/statistics",
      providesTags: ["Statistics"],
    }),
  }),
});

export const { useGetStatisticsQuery } = statisticsApi;
