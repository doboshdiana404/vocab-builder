import { Ionicons } from "@expo/vector-icons";
import { Portal } from "@gorhom/portal";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { capitalizeName } from "@/utils/capitalizeName";
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
}: CategoryPickerProps) {
  const anchorRef = useRef<View>(null);
  const [anchor, setAnchor] = useState({ x: 0, y: 0, w: 0, h: 0 });

  const localItems: ItemType[] = useMemo(
    () =>
      items.map((it) => ({
        ...it,
        label: capitalizeName(it.label),
      })),
    [items],
  );

  const selectedLabel = useMemo(() => {
    const found = localItems.find((it) => it.value === value);
    return found?.label ?? "Select category";
  }, [localItems, value]);

  const measure = () => {
    anchorRef.current?.measureInWindow((x, y, w, h) => {
      setAnchor({ x, y, w, h });
    });
  };

  useEffect(() => {
    if (open) measure();
  }, [open, items.length]);

  if (!localItems.length) return <View style={{ height: 0 }} />;

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

  const top = shouldOpenUp
    ? Math.max(8, anchor.y - MAX_DROPDOWN_HEIGHT - GAP)
    : anchor.y + anchor.h + GAP;

  return (
    <View style={styles.wrapper}>
      <View ref={anchorRef} collapsable={false}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={toggle}
          style={styles.control}
        >
          <Text style={styles.controlText}>{selectedLabel}</Text>
          <Ionicons
            name={open ? "chevron-up" : "chevron-down"}
            size={18}
            color="#121417"
          />
        </TouchableOpacity>
      </View>

      {open && (
        <Portal>
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
                  scrollEnabled
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
        </Portal>
      )}
    </View>
  );
}
