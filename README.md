# Next.JS I18n

nextjs 는 i18n 처리를 내장하고있습니다. 그렇다 한들 react-i18next, i18next 를 사용하여 어느정도 세팅이 필요합니다.   

> 해당 레포의 파일을 모두 `/src/i18n/*` 으로 폴더를 복사해주고 아래 절차를 따릅니다.

## Install

```bash
yarn add i18next react-i18next
```

## next.config.js 수정

```js
const i18nConfig = require("./src/i18n/next-i18n.config");
/** @type {import('next').NextConfig} */
const config = {
    i18n: i18nConfig,
};

module.exports = config;
```

## constant.js 수정(optional)

> 한국어, 영어를 기본으로 세팅해 두었습니다. 여기서 변경하면, 여기저기 config 파일에서도 반영됩니다.

```js
const DEFAULT_LOCALE = "ko";
const LOCALES = ["ko", "en"];

module.exports = {
  DEFAULT_LOCALE,
  LOCALES,
};
```

## _app.tsx 프로바이더 추가

> 프로바이더에서는 locale 변경을 감지하여 `NEXT_LOCALE` 쿠키를 변경합니다.   
> nextjs 는 쿠키에서 `NEXT_LOCALE` 를 감지하여, 자동으로 subpath 로 redirect 합니다.

```jsx
import { I18nProvider } from "@/src/i18n/provider";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <I18nProvider locale={router.locale}>
          <Component {...pageProps} />
      </I18nProvider>
    </>
  );
}
```

## hooks 사용 예시

```jsx
import { useLocale } from "@/src/i18n/hooks/useLocale";
import { useTranslation } from "react-i18next";

const { locale, changeLocale } = useLocale(); // locale : 현재 언어, changeLocale : 언어 변경(native router hook 사용)
const { t } = useTranslation(["game"]); // react-i18next hook 사용 

return (
    <div>
        <h2>{t("lol.title")}</h2>
    </div>
);
```

## 번역 파일 관리

> 번역 파일은 `src/i18n/data` 에서 파일별로 네임스페이스가 분리되어 관리됩니다. 아래는 예시 폴더 구조입니다.   
> `src/i18n/bundle/index.js` 는 최종적인 번들 파일로 사용됩니다.

```bash
/src/i18n
  /data
    /common.js
    /game.js
  /bundle
    /index.js
```

### `scripts` 추가 하고 번들파일 생성하기

> 개발할때는 `i18n-watch` 를 또다른 터미널로 실행시켜 놓으면, 번들 파일이 자동으로 반영됩니다.   
> 꼭 nextjs 빌드 하기전 i18n-build 를 실행시켜 최신 상태로 동기화 해주는 것을 잊지마세요!

```json
"scripts": {
    // ...
    "i18n-watch": "node src/i18n/scripts/watch.js",
    "i18n-build": "node src/i18n/scripts/build.js"
}
```
