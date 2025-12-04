import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFromStorage } from "../store/api/auth/authSlice";
import { RootState } from "../store/store";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSegments();
  const dispatch = useDispatch();
  const { token, isInitialized } = useSelector((s: RootState) => s.auth);

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const json = await AsyncStorage.getItem("auth");
        if (json) {
          dispatch(setFromStorage(JSON.parse(json)));
        } else {
          dispatch(setFromStorage(null));
        }
      } catch (e) {
        console.log("Failed to load auth", e);
        dispatch(setFromStorage(null));
      }
    };
    loadAuth();
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const inAuthGroup = segments[0] === "login" || segments[0] === "register";

    if (!token && !inAuthGroup) {
      router.replace("/login");
    } else if (token && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [token, isInitialized, segments]);

  if (!isInitialized) return null;

  return <>{children}</>;
}
