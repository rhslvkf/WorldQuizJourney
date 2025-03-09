import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { translations, TranslationKeys } from "./translations";

// 기본 언어 설정 (언어 코드가 지원되지 않을 경우 사용)
const fallback = { languageTag: "en", isRTL: false };

// 기기 언어 가져오기
const locale = Localization.getLocales()[0] || fallback;

// 기기 언어 코드 단순화 (지역 정보 제거)
const getLanguageCode = (localeCode: string): TranslationKeys => {
  // 언어 코드 단순화 (en-US -> en)
  const simplifiedCode = localeCode.split("-")[0] as TranslationKeys;

  // 지원하는 언어인지 확인
  return translations[simplifiedCode] ? simplifiedCode : "en";
};

// i18n 초기화
const i18n = new I18n(translations);

// 기본값 설정
i18n.defaultLocale = "en";
i18n.locale = getLanguageCode(locale.languageTag);
i18n.enableFallback = true;

export default i18n;
