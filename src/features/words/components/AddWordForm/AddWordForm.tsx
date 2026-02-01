import Ukraine from "@/assets/icons/ukraine.svg";
import UnitedKingdom from "@/assets/icons/united-kingdom.svg";
import React from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CategoryPicker from "@/src/components/ui/CategoryPicker/CategoryPicker";
import Input from "@/src/components/ui/Input/Input";
import VerbTypeSelector from "@/src/components/ui/VerbTypeSelector/VerbTypeSelector";

import { useAddWordForm } from "../../hooks/useAddWordForm";
import { styles } from "./AddWordForm.styles";

interface AddWordFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function AddWordForm({ onCancel, onSuccess }: AddWordFormProps) {
  const { state, actions } = useAddWordForm({ onSuccess });
  const isAndroid = Platform.OS === "android";
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Add word</Text>

      <Text style={styles.description}>
        Adding a new word to the dictionary is an important step in enriching
        the language base and expanding the vocabulary.
      </Text>

      <CategoryPicker
        open={state.open}
        setOpen={actions.setOpen}
        value={state.category}
        setValue={actions.setCategory}
        items={state.items}
        changeBackground={isAndroid ? "transparent" : "#f8f8f8"}
        changeBorderColor={isAndroid ? "#d1d5db" : "rgba(18, 20, 23, 0.1)"}
        textColor={isAndroid ? "#fcfcfc" : "#121417"}
      />

      {state.category?.toLowerCase() === "verb" ? (
        <>
          <VerbTypeSelector
            verbType={state.verbType}
            setVerbType={actions.setVerbType}
            activeColor={isAndroid ? "#fcfcfc" : "#85aa9f"}
            unActiveColor={isAndroid ? "#fbfbfb" : "#cacacb"}
            typeColor={isAndroid ? "#fcfcfc" : "#121417"}
          />

          <View style={styles.hintContainer}>
            {state.verbType === "irregular" ? (
              <Text style={styles.hint}>
                Such data must be entered in the format I form-II form-III form.
              </Text>
            ) : (
              <Text style={styles.hintPlaceholder}>placeholder</Text>
            )}
          </View>
        </>
      ) : (
        <View style={{ height: 40 }}></View>
      )}

      <View style={styles.fieldContainer}>
        <Input
          label="Ukrainian"
          icon={<Ukraine width={28} height={28} />}
          value={state.ua}
          onChangeText={actions.setUa}
          placeholder="Українське слово"
          error={state.errors.ua}
          changeColor={isAndroid ? "#fcfcfc" : "#121417"}
          borderChangeColor={isAndroid ? "#d1d5db" : "rgba(18, 20, 23, 0.1)"}
          stable={isAndroid ? true : false}
        />
      </View>

      <Input
        label="English"
        icon={<UnitedKingdom width={28} height={28} />}
        value={state.en}
        onChangeText={actions.setEn}
        placeholder="English word"
        error={state.errors.en}
        changeColor={isAndroid ? "#fcfcfc" : "#121417"}
        borderChangeColor={isAndroid ? "#d1d5db" : "rgba(18, 20, 23, 0.1)"}
        stable={isAndroid ? true : false}
      />

      <View style={styles.btnsWrap}>
        <TouchableOpacity
          onPress={actions.submit}
          disabled={state.isLoading}
          style={[
            styles.submitButton,
            state.isLoading && styles.submitButtonDisabled,
          ]}
        >
          <Text style={styles.submitText}>
            {state.isLoading ? "Додається..." : "Add"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
