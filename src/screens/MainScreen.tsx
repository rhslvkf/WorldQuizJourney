import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLanguage } from "../i18n/LanguageContext";
import SettingsScreen from "./SettingsScreen";

const MainScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Text style={styles.title}>{t("main.title")}</Text>
      <Text style={styles.subtitle}>{t("main.subtitle")}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{t("main.startGame")}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => setIsSettingsVisible(true)}>
          <Text style={styles.secondaryButtonText}>{t("main.settings")}</Text>
        </TouchableOpacity>
      </View>

      {/* 설정 모달 */}
      <Modal
        visible={isSettingsVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setIsSettingsVisible(false)}
      >
        <SettingsScreen onClose={() => setIsSettingsVisible(false)} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2a6cbf",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 300,
  },
  button: {
    backgroundColor: "#4f9ef8",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#4f9ef8",
  },
  secondaryButtonText: {
    color: "#4f9ef8",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MainScreen;
