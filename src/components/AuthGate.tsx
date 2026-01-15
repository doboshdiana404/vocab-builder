import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRootNavigationState, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useGetProfileQuery } from "../store/api/auth/authApi";
import { logout, setFromStorage } from "../store/api/auth/authSlice";
import { RootState } from "../store/store";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSegments();
  const navState = useRootNavigationState();
  const navReady = !!navState?.key;

  const dispatch = useDispatch();
  const { token, isInitialized } = useSelector((s: RootState) => s.auth);

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem("auth");
        dispatch(setFromStorage(json ? JSON.parse(json) : null));
      } catch {
        dispatch(setFromStorage(null));
      }
    })();
  }, [dispatch]);

  const { isFetching, isSuccess, isError, error } = useGetProfileQuery(
    undefined,
    { skip: !isInitialized || !token }
  );

  const status = (error as any)?.status;
  const isAuthError = status === 401 || status === 403;

  useEffect(() => {
    if (!navReady || !isInitialized) return;

    const top = segments[0];
    const inAuth = top === "login" || top === "register";

    if (!token) {
      if (!inAuth) router.replace("/login");
      return;
    }

    if (isError && isAuthError) {
      dispatch(logout());
      router.replace("/login");
      return;
    }

    if (isSuccess && inAuth) {
      router.replace("/(tabs)");
    }
  }, [
    navReady,
    isInitialized,
    segments,
    token,
    isError,
    isAuthError,
    isSuccess,
    dispatch,
    router,
  ]);

  return <>{children}</>;
}
