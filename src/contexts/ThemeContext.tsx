import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 테마 타입 정의
export type ThemeMode = "light" | "dark";

// 테마 색상 정의
export interface ThemeColors {
  background: string;
  text: string;
  textSecondary: string;
  primary: string;
  secondary: string;
  accent: string;
  border: string;
  cardBackground: string;
  success: string;
  error: string;
}

// 라이트 모드 색상
export const lightTheme: ThemeColors = {
  background: "#f0f8ff",
  text: "#333333",
  textSecondary: "#555555",
  primary: "#2a6cbf",
  secondary: "#4f9ef8",
  accent: "#f0f7ff",
  border: "#e1e1e1",
  cardBackground: "#ffffff",
  success: "#4CAF50",
  error: "#F44336",
};

// 다크 모드 색상
export const darkTheme: ThemeColors = {
  background: "#121212",
  text: "#e0e0e0",
  textSecondary: "#a0a0a0",
  primary: "#4f9ef8",
  secondary: "#2a6cbf",
  accent: "#1f2937",
  border: "#2c2c2c",
  cardBackground: "#1e1e1e",
  success: "#43A047",
  error: "#E53935",
};

// 테마 컨텍스트 인터페이스
interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  colors: ThemeColors;
  isDark: boolean;
}

// 테마 컨텍스트 생성
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 테마 제공자 컴포넌트
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>(systemColorScheme === "dark" ? "dark" : "light");
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // 저장된 테마 모드 불러오기
  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("themeMode");
        if (savedTheme) {
          setThemeMode(savedTheme as ThemeMode);
          setIsFirstLoad(false);
        } else {
          // 처음 실행 시 시스템 테마 설정을 적용하고 저장
          const systemTheme = systemColorScheme === "dark" ? "dark" : "light";
          setThemeMode(systemTheme);
          await AsyncStorage.setItem("themeMode", systemTheme);
          setIsFirstLoad(false);
        }
      } catch (error) {
        console.error("테마 설정을 불러오는 중 오류 발생:", error);
      }
    };

    loadSavedTheme();
  }, [systemColorScheme]);

  // 테마 모드 변경 함수
  const changeThemeMode = async (mode: ThemeMode) => {
    setThemeMode(mode);
    try {
      await AsyncStorage.setItem("themeMode", mode);
    } catch (error) {
      console.error("테마 설정을 저장하는 중 오류 발생:", error);
    }
  };

  // 현재 테마가 다크 모드인지 확인
  const isDarkMode = themeMode === "dark";

  // 현재 테마 색상 선택
  const colors = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        setThemeMode: changeThemeMode,
        colors,
        isDark: isDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// 테마 훅
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme는 ThemeProvider 내부에서 사용해야 합니다");
  }
  return context;
};
