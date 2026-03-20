import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRootNavigationState, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../store/store";
import { useGetProfileQuery } from "../api/authApi";
import { logout, setFromStorage } from "../api/authSlice";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSegments();
  const navState = useRootNavigationState();
  const navReady = !!navState?.key;

  const dispatch = useDispatch();
  const { token, isInitialized } = useSelector((s: RootState) => s.auth);

  useEffect(() => {
    if (isInitialized) return;
    (async () => {
      try {
        const json = await AsyncStorage.getItem("auth");
        dispatch(setFromStorage(json ? JSON.parse(json) : null));
      } catch {
        dispatch(setFromStorage(null));
      }
    })();
  }, [dispatch, isInitialized]);

  const { isSuccess, isError, error } = useGetProfileQuery(undefined, {
    skip: !isInitialized || !token,
  });

  const status = (error as any)?.status;
  const isAuthError = status === 401 || status === 403;

  useEffect(() => {
    if (!navReady || !isInitialized) return;

    const inAuth = segments[0] === "(auth)";

    if (!token) {
      if (!inAuth) router.replace("/(auth)/login");
      return;
    }

    if (isError && isAuthError) {
      dispatch(logout());
      router.replace("/(auth)/login");
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
