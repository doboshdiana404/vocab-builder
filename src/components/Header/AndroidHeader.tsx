import Craftwork from "@/assets/icons/craftwork.svg";
import Nav from "@/assets/icons/nav.svg";
import User from "@/assets/icons/user.svg";
import { useAppSelector } from "@/src/store/hooks/useAuth";
import { capitalizeName } from "@/src/utils/capitalizeName";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import NavigationMenu from "../NavigationMenu/NavigationMenu";
import { styles } from "./AndroidHeader.styles";

export default function AndroidHeader() {
  const { user } = useAppSelector((s) => s.auth);
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.left}>
          <Craftwork width={36} height={36} />
          <Text style={styles.title}>VocabBuilder</Text>
        </View>

        <View style={styles.right}>
          <View style={styles.user}>
            <Text style={styles.name}>
              {capitalizeName(user?.name) || "User"}
            </Text>
            <View style={styles.userIconWrap}>
              <User width={20} height={20} fill="#fcfcfc" />
            </View>
          </View>

          <TouchableOpacity onPress={() => setMenuVisible(true)} hitSlop={10}>
            <Nav width={32} height={22} />
          </TouchableOpacity>
        </View>
      </View>
      <NavigationMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />
    </View>
  );
}
