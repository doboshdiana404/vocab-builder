import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import ArrowHorizontal from "@/assets/icons/arrow-horizontal.svg";
import Plus from "@/assets/icons/plus.svg";
import Search from "@/assets/icons/search.svg";

import { useGetStatisticsQuery } from "@/src/store/api";
import { useRouter, useSegments } from "expo-router";
import { dashboardStyles as styles } from "./dashboardStyles";

interface Category {
  name: string;
}

interface DashboardProps {
  search: string;
  setSearch: (v: string) => void;
}

export default function Dashboard({ search, setSearch }: DashboardProps) {
  const router = useRouter();
  const segments = useSegments();
  const currentScreen = segments[segments.length - 1];

  const { data: stats } = useGetStatisticsQuery(null);

  const [tempSearch, setTempSearch] = useState(search);

  useEffect(() => {
    setTempSearch("");
    setSearch("");
  }, [currentScreen]);

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

      <View style={styles.statistics}>
        <Text style={styles.studyText}>
          To study:{" "}
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
