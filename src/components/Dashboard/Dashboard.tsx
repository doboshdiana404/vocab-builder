import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import ArrowHorizontal from "@/assets/icons/arrow-horizontal.svg";
import Plus from "@/assets/icons/plus.svg";
import Search from "@/assets/icons/search.svg";

import { useGetCategoriesQuery, useGetStatisticsQuery } from "@/src/store/api";
import { useRouter, useSegments } from "expo-router";
import CategoryPicker from "../ui/CategoryPicker/CategoryPicker";
import VerbTypeSelector from "../ui/VerbTypeSelector/VerbTypeSelector";
import { dashboardStyles as styles } from "./dashboardStyles";

interface Category {
  name: string;
}

interface DashboardProps {
  search: string;
  setSearch: (v: string) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  category: string | null;
  setCategory: (v: string | null) => void;
  verbType: string | null;
  setVerbType: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Dashboard({
  search,
  setSearch,
  open,
  setOpen,
  category,
  setCategory,
  verbType,
  setVerbType,
}: DashboardProps) {
  const router = useRouter();
  const segments = useSegments();
  const currentScreen = segments[segments.length - 1];

  const { data: categories = [], isLoading: isCategoriesLoading } =
    useGetCategoriesQuery(null);
  const { data: stats } = useGetStatisticsQuery(null);
  const [items, setItems] = useState<{ label: string; value: string | null }[]>(
    []
  );
  const [tempSearch, setTempSearch] = useState(search);
  useEffect(() => {
    if (!isCategoriesLoading && categories.length) {
      const mapped = [
        { label: "All", value: null },
        ...categories.map((cat: Category) => ({
          label: cat,
          value: cat,
        })),
      ];

      setItems(mapped);

      if (!category) setCategory(null);
    }
  }, [categories, isCategoriesLoading]);
  useEffect(() => {
    const timeout = setTimeout(() => setSearch(tempSearch), 400);
    return () => clearTimeout(timeout);
  }, [tempSearch]);
  useEffect(() => {
    setTempSearch("");
    setSearch("");
  }, [currentScreen]);
  const handleCategoryChange = (selectedCategory: string | null) => {
    setCategory(selectedCategory);
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TouchableOpacity
          onPress={() => setSearch(tempSearch)}
          style={styles.searchIcon}
        >
          <Search width={20} height={20} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Find the word"
          placeholderTextColor="#121417"
          value={tempSearch}
          onChangeText={setTempSearch}
        />
      </View>
      <CategoryPicker
        open={open}
        setOpen={setOpen}
        value={category}
        setValue={handleCategoryChange}
        items={items}
      />
      {category?.toLowerCase() === "verb" ? (
        <>
          <VerbTypeSelector verbType={verbType} setVerbType={setVerbType} />

          <View style={{ marginTop: 8 }}>
            {verbType === "irregular" ? (
              <Text
                style={{
                  color: "#121417",
                  fontSize: 10,
                  fontFamily: "FixelDisplayRegular",
                }}
              >
                Such data must be entered in the format I form-II form-III form.
              </Text>
            ) : (
              <Text style={{ opacity: 0, height: 6 }}></Text>
            )}
          </View>
        </>
      ) : (
        <View style={{ height: 40 }}></View>
      )}

      <View style={styles.statistics}>
        <Text style={styles.studyText}>
          To study:
          <Text style={styles.studyCount}>{stats?.totalCount ?? 0}</Text>
        </Text>
      </View>

      <View style={styles.actions}>
        {currentScreen !== "recommend" && (
          <TouchableOpacity onPress={() => router.push("/add-word")}>
            <Text style={styles.addWord}>
              Add word <Plus width={20} height={20} />
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => router.push("/training")}>
          <Text style={styles.train}>
            Train oneself <ArrowHorizontal width={20} height={20} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
