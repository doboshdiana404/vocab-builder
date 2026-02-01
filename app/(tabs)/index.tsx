import AddWordBottomSheet, {
  AddWordBottomSheetRef,
} from "@/src/components/ui/AddWordBottomSheet/AddWordBottomSheet";
import HomeScreen from "@/src/features/words/screens/HomeScreen";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { Platform } from "react-native";
export default function HomeTab() {
  const router = useRouter();
  const bottomSheetRef = useRef<AddWordBottomSheetRef>(null);

  const handleAddWord = () => {
    if (Platform.OS === "android") {
      bottomSheetRef.current?.open();
    } else {
      router.push("/(tabs)/add-word");
    }
  };
  return (
    <>
      <HomeScreen onAddWord={handleAddWord} />
      {Platform.OS === "android" && <AddWordBottomSheet ref={bottomSheetRef} />}
    </>
  );
}
