//wordsApi

import { baseApi } from "../baseApi";

export const wordsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ---------------- OWN WORDS ----------------
    getWords: builder.query({
      query: ({
        keyword = "",
        category = null,
        isIrregular = null,
        page = 1,
        limit = 7,
      }) => {
        const params: Record<string, any> = { page, limit };

        if (keyword) params.keyword = keyword;
        if (category) params.category = category;
        if (isIrregular !== null) params.isIrregular = isIrregular;

        return {
          url: "/words/own",
          params,
        };
      },

      providesTags: (result) =>
        result?.results
          ? [
              ...result.results.map(({ _id }: { _id: string }) => ({
                type: "Words" as const,
                id: _id,
              })),
              { type: "Words", id: "LIST" },
            ]
          : [{ type: "Words", id: "LIST" }],
    }),

    // ---------------- ALL USERS' WORDS ----------------
    getAllWords: builder.query({
      query: ({
        keyword = "",
        category = null,
        isIrregular = null,
        page = 1,
        limit = 7,
      }) => {
        const params: Record<string, any> = { page, limit };

        if (keyword) params.keyword = keyword;
        if (category) params.category = category;
        if (isIrregular !== null) params.isIrregular = isIrregular;

        return {
          url: "/words/all",
          params,
        };
      },

      // використовуємо ті ж теги
      providesTags: (result) =>
        result?.results
          ? [
              ...result.results.map(({ _id }: { _id: string }) => ({
                type: "Words" as const,
                id: _id,
              })),
              { type: "Words", id: "LIST" },
            ]
          : [{ type: "Words", id: "LIST" }],
    }),

    // ---------------- CREATE WORD ----------------
    addWord: builder.mutation({
      query: (body) => ({
        url: "/words/create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Words", id: "LIST" }, "Statistics"],
    }),

    // ---------------- DELETE WORD ----------------
    deleteWord: builder.mutation({
      query: (id) => ({
        url: `/words/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Words", id },
        { type: "Words", id: "LIST" },
        "Statistics",
      ],
    }),
    updateWord: builder.mutation({
      query: ({ id, body }) => ({
        url: `/words/edit/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result, error, { id }) => [
        { type: "Words", id },
        { type: "Words", id: "LIST" },
        "Statistics",
      ],
    }),
  }),
});

export const {
  useGetWordsQuery,
  useGetAllWordsQuery,
  useAddWordMutation,
  useDeleteWordMutation,
  useUpdateWordMutation,
} = wordsApi;
