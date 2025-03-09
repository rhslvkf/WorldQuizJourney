import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "./i18n";
import { TranslationKeys } from "./translations";

// 언어 설정 상수
const LANGUAGE_STORAGE_KEY = "user_language_preference";

// 컨텍스트 타입 정의
interface LanguageContextType {
  currentLanguage: TranslationKeys;
  changeLanguage: (language: TranslationKeys) => Promise<void>;
  t: (scope: string) => string;
}

// 컨텍스트 생성
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 컨텍스트 Provider 컴포넌트
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // 현재 언어 상태
  const [currentLanguage, setCurrentLanguage] = useState<TranslationKeys>(i18n.locale as TranslationKeys);

  // 언어 변경 함수
  const changeLanguage = useCallback(async (language: TranslationKeys) => {
    try {
      // i18n 설정 변경
      i18n.locale = language;
      // 상태 업데이트
      setCurrentLanguage(language);
      // 설정 저장
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (error) {
      console.error("Error changing language:", error);
    }
  }, []);

  // 번역 함수
  const t = useCallback(
    (scope: string): string => {
      return i18n.t(scope);
    },
    [currentLanguage]
  );

  // 앱 초기화 시 저장된 언어 설정 불러오기
  React.useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (savedLanguage && savedLanguage !== currentLanguage) {
          changeLanguage(savedLanguage as TranslationKeys);
        }
      } catch (error) {
        console.error("Error loading saved language:", error);
      }
    };

    loadSavedLanguage();
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        changeLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// 커스텀 훅
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
