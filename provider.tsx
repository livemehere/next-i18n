import { getInstance } from "@/src/i18n/index";
import { I18nextProvider } from "react-i18next";
import { useEffect } from "react";

export const I18nProvider = ({ children, locale }) => {
  useEffect(() => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/`;
  }, [locale]);

  return (
    <I18nextProvider i18n={getInstance(locale)}>{children}</I18nextProvider>
  );
};
