import ChevronLeft from "@/assets/icons/chevron-left.svg";
import LogOut from "@/assets/icons/log-out.svg";
import User from "@/assets/icons/user.svg";
import { logout } from "@/src/store/api/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks/useAuth";
import { capitalizeName } from "@/src/utils/capitalizeName";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { headerStyles as styles } from "./Header.styles";

export default function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((s) => s.auth);
  const pathname = usePathname();
  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };
  const handleGoBack = () => {
    router.back();
  };
  const isAddWordScreen = pathname.includes("/add-word");
  return (
    <View style={styles.container}>
      {isAddWordScreen && (
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <ChevronLeft width={12} height={20} />
        </TouchableOpacity>
      )}

      <View style={styles.user}>
        <View style={styles.userIconWrap}>
          <User width={24} height={24} style={styles.avatar} />
        </View>
        <Text style={styles.name}>{capitalizeName(user?.name) || "User"}</Text>
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutLink}>
        <Text style={styles.logout}>
          Log out <LogOut width={16} height={16} />
        </Text>
      </TouchableOpacity>
    </View>
  );
}
