import { headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "zh"];

function getBrowserLocale() {
  const acceptLanguage = headers().get("accept-language") ?? "";
  const languages = acceptLanguage
    .split(",")
    .map((value, index) => {
      const [tag, ...parameters] = value.trim().toLowerCase().split(";");
      const quality = parameters.find((parameter) => parameter.trim().startsWith("q="));
      const weight = quality ? Number.parseFloat(quality.trim().slice(2)) : 1;

      return { index, tag, weight: Number.isNaN(weight) ? 0 : weight };
    })
    .filter(({ tag, weight }) => tag && weight > 0)
    .sort((a, b) => b.weight - a.weight || a.index - b.index);

  const preferredLanguage = languages.find(
    ({ tag }) => tag === "zh" || tag.startsWith("zh-") || tag === "en" || tag.startsWith("en-"),
  );

  return preferredLanguage?.tag === "zh" || preferredLanguage?.tag.startsWith("zh-") ? "zh" : "en";
}

export default getRequestConfig(async () => {
  const locale = getBrowserLocale();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    defaultTranslationValues: {
      b: (children) => <b>{children}</b>,
      i: (children) => <i>{children}</i>,
      u: (children) => <u>{children}</u>,
      br: () => <br />,
    },
  };
});
