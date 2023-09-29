"use client";

import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignedOut } from "@clerk/nextjs";

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <section className="background-light900_dark200 custom-scrollbar sticky left-0 top-0 flex h-screen flex-col items-center justify-between overflow-y-auto border-r border-gray-300 p-6 pt-36 shadow-light-300 dark:border-gray-800 dark:shadow-none max-sm:hidden lg:w-[276px]">
      <div className="flex flex-1 flex-col gap-4">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              key={link.label}
              href={link.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-center gap-2 bg-transparent p-4 md:justify-start lg:gap-4`}>
              <Image
                src={link.imgURL}
                alt={link.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p
                className={`max-lg:hidden ${
                  isActive ? "base-bold" : "base-medium"
                }`}>
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>

      <SignedOut>
        <div className="mt-16 flex w-full flex-col gap-3">
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/account.svg"
                alt="login"
                width={40}
                height={40}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">
                Log In
              </span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="signup"
                width={40}
                height={40}
                className="invert-colors lg:hidden"
              />
              <span className="max-lg:hidden">Sign Up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSideBar;
