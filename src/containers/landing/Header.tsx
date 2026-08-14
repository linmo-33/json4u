import Link from "next/link";
import LinkButton from "@/components/LinkButton";
import Logo from "@/components/icons/Logo";
import { Badge } from "@/components/ui/badge";
import { version } from "@/lib/env";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("Home");
  return (
    <div className="sticky top-0 z-10 bg-white flex md:h-12 h-14 items-center justify-center w-full border-b">
      <nav className="flex items-center w-full h-full max-w-page-header md:px-8 px-4">
        <Link prefetch={false} href="/" className="flex items-center gap-2 pointer mr-2">
          <Logo />
          <span className="font-bold">{"JSON For You"}</span>
        </Link>
        <Badge variant="secondary">{`v${version}`}</Badge>
        <div className="ml-auto" />
        <div className="flex items-center h-full py-3 gap-4">
          <LinkButton href="/editor" variant="default">
            {t("Editor")}
          </LinkButton>
        </div>
      </nav>
    </div>
  );
}
