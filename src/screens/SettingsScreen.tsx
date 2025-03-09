import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLanguage } from "../i18n/LanguageContext";
import { TranslationKeys } from "../i18n/translations";
import { useTheme, ThemeMode } from "../contexts/ThemeContext";

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

// 테마 옵션 정의
const themeOptions: { value: ThemeMode; iconLight: string; iconDark: string }[] = [
  { value: "light", iconLight: "☀️", iconDark: "☀️" },
  { value: "dark", iconLight: "🌙", iconDark: "🌙" },
];

interface SettingsScreenProps {
  onClose: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onClose }) => {
  const insets = useSafeAreaInsets();
  const { t, currentLanguage, changeLanguage } = useLanguage();
  const { themeMode, setThemeMode, colors, isDark } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundColor: colors.background,
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.primary }]}>{t("settings.title")}</Text>
        <TouchableOpacity onPress={onClose} style={[styles.closeButton, { backgroundColor: colors.border }]}>
          <Text style={[styles.closeButtonText, { color: colors.textSecondary }]}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{t("settings.language")}</Text>

        {languageOptions.map((option) => (
          <TouchableOpacity
            key={option.code}
            style={[
              styles.option,
              { backgroundColor: colors.cardBackground },
              currentLanguage === option.code && [styles.optionSelected, { borderColor: colors.primary }],
            ]}
            onPress={() => changeLanguage(option.code)}
          >
            <Text
              style={[
                styles.optionText,
                { color: colors.text },
                currentLanguage === option.code && [styles.optionTextSelected, { color: colors.primary }],
              ]}
            >
              {option.name}
            </Text>
            {currentLanguage === option.code && <Text style={[styles.checkmark, { color: colors.primary }]}>✓</Text>}
          </TouchableOpacity>
        ))}

        <Text style={[styles.sectionTitle, { color: colors.textSecondary, marginTop: 20 }]}>
          {t("settings.themeMode.title")}
        </Text>

        <View style={styles.themeContainer}>
          {themeOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.themeOption,
                { backgroundColor: colors.cardBackground },
                themeMode === option.value && [styles.themeOptionSelected, { borderColor: colors.primary }],
              ]}
              onPress={() => setThemeMode(option.value)}
            >
              <Text style={styles.themeIcon}>{isDark ? option.iconDark : option.iconLight}</Text>
              <Text
                style={[
                  styles.themeText,
                  { color: colors.text },
                  themeMode === option.value && { color: colors.primary, fontWeight: "bold" },
                ]}
              >
                {t(`settings.themeMode.${option.value}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  scrollView: {
    flex: 1,
  },
  option: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  optionSelected: {
    borderWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
  optionTextSelected: {
    fontWeight: "bold",
  },
  checkmark: {
    fontSize: 18,
    fontWeight: "bold",
  },
  themeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  themeOption: {
    width: "48%",
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  themeOptionSelected: {
    borderWidth: 1,
  },
  themeIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  themeText: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default SettingsScreen;
