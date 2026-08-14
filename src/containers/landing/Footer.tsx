import Link from "next/link";
import { type Href } from "@/components/LinkButton";
import Logo from "@/components/icons/Logo";
import { isCN } from "@/lib/env";

export default function Footer() {
  return (
    <footer className="flex sm:h-12 min-h-12 py-4 sm:py-0 items-center justify-center w-full border-t">
      <div className="flex flex-col sm:flex-row items-center w-full max-w-page-header sm:px-8 px-4 gap-y-3 sm:gap-x-8 text-xs text-slate-500">
        <div className="flex items-center gap-2 shrink-0">
          <Logo className="w-[20px] h-[20px] text-slate-500" />
          <span className="whitespace-nowrap">{`© ${new Date().getFullYear()} JSON For You`}</span>
        </div>
        <div className="flex items-center gap-4 sm:gap-8 sm:ml-0">
          <Legal />
        </div>
      </div>
    </footer>
  );
}

function Legal() {
  return (
    <div className="flex items-center lg:gap-8 lg:ml-0 ml-auto gap-4">
      {isCN && <FooterLink nofollow href="https://beian.miit.gov.cn" title={"粤ICP备16007488号"} />}
    </div>
  );
}

interface FooterLinkProps {
  href: string;
  title: string | JSX.Element;
  nofollow?: boolean;
}

function FooterLink({ href, title, nofollow }: FooterLinkProps) {
  return (
    <Link
      prefetch={false}
      href={href as Href}
      target={href.startsWith("/") ? "" : "_blank"}
      rel={nofollow ? "nofollow noopener" : "noopener"}
      className="pointer block w-fit hover:text-slate-900"
    >
      {title}
    </Link>
  );
}
