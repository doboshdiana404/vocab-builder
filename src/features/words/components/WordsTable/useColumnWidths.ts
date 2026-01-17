import { useWindowDimensions } from "react-native";

export default function useColumnWidths() {
  const { width } = useWindowDimensions();

  const tableWidth = width - 32;
  const scale = tableWidth / 343;

  return {
    colWord: 82 * scale,
    colTranslation: 116 * scale,
    colProgress: 95 * scale,
    colActions: 50 * scale,
  };
}
