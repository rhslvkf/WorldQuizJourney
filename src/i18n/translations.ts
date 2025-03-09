import en from "./languages/en";
import ko from "./languages/ko";
import ja from "./languages/ja";
import zh from "./languages/zh";
import fr from "./languages/fr";
import es from "./languages/es";
import pt from "./languages/pt";

export const translations = {
  en,
  ko,
  ja,
  zh,
  fr,
  es,
  pt,
};

export type TranslationKeys = keyof typeof translations;
