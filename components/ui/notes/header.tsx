import { siteMetadata } from "@/data/siteMetaData";
import Logo from "@/data/logo.svg";
import Link from "../Link";
import ThemeSwitch from "../ThemeSwitch";
import MobileNav from "../MoblieNav";
import headerNavLinks from "@/data/headerNavLinks";
import Image from "next/image";

const Header = () => {
  let headerClass =
    "flex  px-4 items-center w-full bg-white dark:bg-gray-950 justify-between py-4 border-b-2 border-gray-200 dark:border-gray-700"; // 将 py-10 改为 py-4
  if (siteMetadata.stickyNav) {
    headerClass += " sticky top-0 z-50 ";
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="mr-5">
            <Image priority src={Logo} height={24} width={24} alt="Home" />{" "}
            {/* 将高度和宽度改小一些 */}
          </div>
          {typeof siteMetadata.headerTitle === "string" ? (
            <div className="hidden h-4 text-xl font-semibold sm:block">
              {" "}
              {/* 将 h-6 和 text-2xl 改为 h-4 和 text-xl */}
              Lavachen's Notes
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <div className="no-scrollbar hidden max-w-40 items-center space-x-4 overflow-x-auto sm:flex sm:space-x-6 md:max-w-72 lg:max-w-96 py-2">
          {headerNavLinks
            .filter((link) => link.href !== "/")
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="block font-semibold text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
              >
                {link.title}
              </Link>
            ))}
        </div>
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
