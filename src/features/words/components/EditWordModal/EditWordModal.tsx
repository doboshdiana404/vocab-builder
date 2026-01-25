import { Platform } from "react-native";
import type { EditWordModalProps } from "./types";

import EditWordModalAndroid from "./EditWordModal.android";
import EditWordModalIOS from "./EditWordModal.ios";

export default function EditWordModal(props: EditWordModalProps) {
  if (Platform.OS === "ios") {
    return <EditWordModalIOS {...props} />;
  }

  return <EditWordModalAndroid {...props} />;
}
