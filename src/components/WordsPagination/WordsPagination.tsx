import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./WordsPagination.styles";
interface Props {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export default function WordsPagination({ page, totalPages, setPage }: Props) {
  const renderPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <TouchableOpacity
          key={p}
          onPress={() => setPage(p)}
          style={[styles.pageBtn, p === page && styles.activePage]}
        >
          <Text style={[p === page && styles.activeText]}>{p}</Text>
        </TouchableOpacity>
      ));
    }

    const pagesToShow: (number | string)[] = [1];

    if (page > 3) pagesToShow.push("...");

    const middlePages = [page - 1, page, page + 1].filter(
      (p) => p > 1 && p < totalPages
    );
    pagesToShow.push(...middlePages);

    if (page < totalPages - 2) pagesToShow.push("...");
    pagesToShow.push(totalPages);

    return pagesToShow.map((p, idx) =>
      typeof p === "number" ? (
        <TouchableOpacity
          key={p}
          onPress={() => setPage(p)}
          style={[styles.pageBtn, p === page && styles.activePage]}
        >
          <Text style={[p === page && styles.activeText]}>{p}</Text>
        </TouchableOpacity>
      ) : (
        <Text key={`dots-${idx}`} style={styles.dots}>
          {p}
        </Text>
      )
    );
  };

  return (
    <View style={styles.pagination}>
      <TouchableOpacity
        disabled={page === 1}
        onPress={() => setPage(1)}
        style={[styles.pageBtn, page === 1 && styles.disabled]}
      >
        <Text>{"<<"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={page === 1}
        onPress={() => setPage(page - 1)}
        style={[styles.pageBtn, page === 1 && styles.disabled]}
      >
        <Text>{"<"}</Text>
      </TouchableOpacity>

      {renderPages()}

      <TouchableOpacity
        disabled={page === totalPages}
        onPress={() => setPage(page + 1)}
        style={[styles.pageBtn, page === totalPages && styles.disabled]}
      >
        <Text>{">"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={page === totalPages}
        onPress={() => setPage(totalPages)}
        style={[styles.pageBtn, page === totalPages && styles.disabled]}
      >
        <Text>{">>"}</Text>
      </TouchableOpacity>
    </View>
  );
}
