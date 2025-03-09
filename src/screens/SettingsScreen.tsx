import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLanguage } from "../i18n/LanguageContext";
import { TranslationKeys } from "../i18n/translations";

// 언어 옵션 정의
const languageOptions: { code: TranslationKeys; name: string }[] = [
  { code: "en", name: "English" },
  { code: "ko", name: "한국어" },
  { code: "ja", name: "日本語" },
  { code: "zh", name: "中文 (简体)" },
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
  { code: "pt", name: "Português" },
];

interface SettingsScreenProps {
  onClose: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onClose }) => {
  const insets = useSafeAreaInsets();
  const { t, currentLanguage, changeLanguage } = useLanguage();

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{t("settings.title")}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>{t("settings.language")}</Text>

      <ScrollView style={styles.scrollView}>
        {languageOptions.map((option) => (
          <TouchableOpacity
            key={option.code}
            style={[styles.languageOption, currentLanguage === option.code && styles.languageOptionSelected]}
            onPress={() => changeLanguage(option.code)}
          >
            <Text style={[styles.languageText, currentLanguage === option.code && styles.languageTextSelected]}>
              {option.name}
            </Text>
            {currentLanguage === option.code && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2a6cbf",
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#555",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 15,
  },
  scrollView: {
    flex: 1,
  },
  languageOption: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  languageOptionSelected: {
    backgroundColor: "#e6f2ff",
    borderColor: "#4f9ef8",
    borderWidth: 1,
  },
  languageText: {
    fontSize: 16,
    color: "#555",
  },
  languageTextSelected: {
    color: "#2a6cbf",
    fontWeight: "bold",
  },
  checkmark: {
    color: "#4f9ef8",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SettingsScreen;
