import { useRouter } from "next/router";

export const useLocale = () => {
  const router = useRouter();

  const changeLocale = (locale: string) => {
    const { pathname, query } = router;
    router.push(
      {
        pathname,
        query,
      },
      undefined,
      { locale },
    );
  };

  return { changeLocale, locale: router.locale };
};
