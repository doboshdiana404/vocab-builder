import { Platform } from "react-native";
import type { EditWordModalProps } from "./types";

import EditWordModalIOS from "./EditWordModal.ios";
import EditWordModalAndroid from "./EditWordModal.android";

export default function EditWordModal(props: EditWordModalProps) {
  if (Platform.OS === "ios") {
    return <EditWordModalIOS {...props} />;
  }

  return <EditWordModalAndroid {...props} />;
}
