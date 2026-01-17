import { Platform } from "react-native";
import IosHeader from "./IosHeader";
import AndroidHeader from "./AndroidHeader";

export default function Header() {
  if (Platform.OS === "android") {
    return <AndroidHeader />;
  }

  return <IosHeader />;
}
