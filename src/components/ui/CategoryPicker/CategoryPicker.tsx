import { capitalizeName } from "@/src/utils/capitalizeName";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { styles } from "./CategoryPicker.styles";
import { CategoryPickerProps, ItemType } from "./types";

export default function CategoryPicker({
  open,
  setOpen,
  value,
  setValue,
  items,
}: CategoryPickerProps) {
  const [localItems, setLocalItems] = useState<ItemType[]>([]);

  useEffect(() => {
    setLocalItems(
      items.map((item) => ({
        ...item,
        label: capitalizeName(item.label),
      }))
    );
  }, [items]);

  if (!localItems.length) return <View style={{ height: 0 }} />;

  return (
    <View style={styles.wrapper}>
      <DropDownPicker<string>
        open={open}
        value={value ?? "all"}
        items={localItems}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setLocalItems}
        placeholder="Select category"
        listMode="SCROLLVIEW"
        dropDownDirection="AUTO"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        textStyle={styles.text}
        labelStyle={styles.label}
        listItemLabelStyle={styles.listItemLabel}
        renderListItem={({ label, value: itemValue }) => {
          const isSelected = value === itemValue;

          return (
            <TouchableOpacity
              onPress={() => {
                setValue(itemValue);
                setOpen(false);
              }}
              style={styles.listItem}
            >
              <Text
                style={[
                  styles.listItemText,
                  isSelected && styles.listItemTextSelected,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
