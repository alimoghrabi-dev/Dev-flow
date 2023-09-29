import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

interface Props {
  route: string;
  iconPosition: "left" | "right";
  imgSrc: string;
  placeHolder: string;
  otherClasses: string;
}

const GlobalSearch = ({
  route,
  iconPosition,
  imgSrc,
  placeHolder,
  otherClasses,
}: Props) => {
  return (
    <div
      className={`${otherClasses} background-light800_darkgradient relative flex min-h-[36px] grow items-center gap-4 rounded-[10px] px-4`}>
      {iconPosition === "left" && (
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        placeholder={placeHolder}
        value=""
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
      />

      {iconPosition === "right" && (
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default GlobalSearch;
