import { baseApi } from "../baseApi";
import { setCredentials } from "./authSlice";

const CURRENT_USER_URL =
  "https://vocab-builder-backend.p.goit.global/api/users/current";

interface AuthResponse {
  token: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({
        url: "/users/signup",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const token = data.token;

          const res = await fetch(CURRENT_USER_URL, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const user = await res.json();
          dispatch(setCredentials({ token, user }));
        } catch (err) {
          console.error("Signup failed:", err);
        }
      },
      invalidatesTags: ["Auth"],
    }),

    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: "/users/signin",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const token = data.token;

          const res = await fetch(CURRENT_USER_URL, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const user = await res.json();
          dispatch(setCredentials({ token, user }));
        } catch (err) {
          console.error("Login failed:", err);
        }
      },
      invalidatesTags: ["Auth"],
    }),

    getProfile: builder.query<any, void>({
      query: () => "/users/current",
      providesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetProfileQuery } =
  authApi;
