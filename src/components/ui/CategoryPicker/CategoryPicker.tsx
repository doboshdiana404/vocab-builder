import { Ionicons } from "@expo/vector-icons";
import { Portal } from "@gorhom/portal";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { capitalizeName } from "@/utils/capitalizeName";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./CategoryPicker.styles";
import type { CategoryPickerProps, ItemType } from "./types";

const MAX_DROPDOWN_HEIGHT = 237;
const GAP = 6;

export default function CategoryPicker({
  open,
  setOpen,
  value,
  setValue,
  items,
  changeBackground = "#f8f8f8",
  changeBorderColor = "rgba(18, 20, 23, 0.1)",
  textColor = "#121417",
}: CategoryPickerProps) {
  const anchorRef = useRef<View>(null);
  const [anchor, setAnchor] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const insets = useSafeAreaInsets();

  const localItems: ItemType[] = useMemo(
    () =>
      items.map((it) => ({
        ...it,
        label: capitalizeName(it.label),
      })),
    [items],
  );

  const selectedLabel = useMemo(() => {
    return (
      localItems.find((it) => it.value === value)?.label ?? "Select category"
    );
  }, [localItems, value]);

  const measure = () => {
    requestAnimationFrame(() => {
      anchorRef.current?.measureInWindow((x, y, w, h) => {
        setAnchor({ x, y, w, h });
      });
    });
  };

  useEffect(() => {
    if (open) measure();
  }, [open, items.length]);

  const toggle = () => {
    if (!open) measure();
    setOpen(!open);
  };

  const handleSelect = (v: any) => {
    setValue(v);
    setOpen(false);
  };

  const screenH = Dimensions.get("window").height;
  const spaceBelow = screenH - (anchor.y + anchor.h + GAP);
  const shouldOpenUp = spaceBelow < MAX_DROPDOWN_HEIGHT;
  const androidYOffset = Platform.OS === "android" ? insets.top - 15 : 0;

  const top = shouldOpenUp
    ? Math.max(
        insets.top + 8,
        anchor.y - MAX_DROPDOWN_HEIGHT - GAP - androidYOffset,
      )
    : anchor.y + anchor.h + GAP - androidYOffset;

  const dropdownContent = (
    <View style={styles.portalRoot} pointerEvents="auto">
      <Pressable style={styles.backdrop} onPress={() => setOpen(false)} />

      <View
        style={[
          styles.dropdown,
          {
            top,
            left: anchor.x,
            width: anchor.w,
            height: MAX_DROPDOWN_HEIGHT,
          },
        ]}
      >
        <View style={styles.dropdownInner}>
          <ScrollView
            bounces={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
          >
            {localItems.map((it) => {
              const isSelected = it.value === value;

              return (
                <TouchableOpacity
                  key={String(it.value)}
                  onPress={() => handleSelect(it.value)}
                  activeOpacity={0.7}
                  style={styles.item}
                >
                  <Text
                    style={[
                      styles.itemText,
                      isSelected && styles.itemTextSelected,
                    ]}
                  >
                    {it.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <View ref={anchorRef} collapsable={false}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={toggle}
          style={[
            styles.control,
            {
              backgroundColor: changeBackground,
              borderColor: changeBorderColor,
            },
          ]}
        >
          <Text style={[styles.controlText, { color: textColor }]}>
            {selectedLabel}
          </Text>
          <Ionicons
            name={open ? "chevron-up" : "chevron-down"}
            size={18}
            color={textColor}
          />
        </TouchableOpacity>
      </View>

      {open && Platform.OS === "ios" && (
        <Portal hostName="root">{dropdownContent}</Portal>
      )}

      {open && Platform.OS === "android" && (
        <Modal
          visible
          transparent
          animationType="fade"
          statusBarTranslucent={false}
          onRequestClose={() => setOpen(false)}
        >
          {dropdownContent}
        </Modal>
      )}
    </View>
  );
}
