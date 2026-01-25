import ArrowHorizontal from "@/assets/icons/arrow-horizontal.svg";
import Close from "@/assets/icons/close.svg";
import Dictionary from "@/assets/icons/dictionary.svg";
import Recommend from "@/assets/icons/recommend.svg";
import Training from "@/assets/icons/training.svg";
import User from "@/assets/icons/user.svg";
import { logout } from "@/src/features/auth/api/authSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "@/src/features/auth/hooks/useAuth";
import { capitalizeName } from "@/utils/capitalizeName";
import { Href, usePathname, useRouter } from "expo-router";
import React from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./NavigationMenu.styles";

type NavigationMenuProps = {
  visible: boolean;
  onClose: () => void;
};

type MenuItem = {
  id: string;
  title: string;
  icon: React.FC<any>;
  path: Href;
  isActive: boolean;
};

export default function NavigationMenu({
  visible,
  onClose,
}: NavigationMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };

  const menuItems: MenuItem[] = [
    {
      id: "dictionary",
      title: "Dictionary",
      icon: Dictionary,
      path: "/",
      isActive: pathname === "/",
    },
    {
      id: "recommend",
      title: "Recommend",
      icon: Recommend,
      path: "/(tabs)/recommend",
      isActive: pathname.includes("/recommend"),
    },
    {
      id: "training",
      title: "Training",
      icon: Training,
      path: "/(tabs)/training",
      isActive: pathname.includes("/training"),
    },
  ];

  const handleNavigate = (path: Href) => {
    router.push(path);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.modalRoot}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <View style={styles.menu} onStartShouldSetResponder={() => true}>
          <View style={styles.navHeader}>
            <View style={styles.user}>
              <Text style={styles.name}>
                {capitalizeName(user?.name) || "User"}
              </Text>
              <View style={styles.userIconWrap}>
                <User width={20} height={20} fill="#85aa9f" />
              </View>
            </View>

            <TouchableOpacity onPress={onClose} hitSlop={10}>
              <Close width={32} height={32} />
            </TouchableOpacity>
          </View>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleNavigate(item.path)}
              style={[styles.menuItem, item.isActive && styles.menuItemActive]}
            >
              <Text
                style={[
                  styles.menuItemText,
                  item.isActive && styles.menuItemTextActive,
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.logout} onPress={handleLogout}>
            <Text style={styles.logOutText}>Log out</Text>
            <ArrowHorizontal width={16} height={16} stroke="white" />
          </TouchableOpacity>

          <Image
            source={require("@/assets/images/menu-illustration.png")}
            style={styles.bottomImage}
            resizeMode="contain"
          />
        </View>
      </View>
    </Modal>
  );
}
