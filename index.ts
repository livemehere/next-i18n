import i18n from "i18next";
import { DEFAULT_LOCALE } from "./constant";
import bundle from "./bundle";

i18n.init({
  resources: bundle,
  interpolation: {
    escapeValue: false,
  },
  fallbackLng: DEFAULT_LOCALE,
});

export const getInstance = (locale: string) =>
  i18n.cloneInstance({ lng: locale });
