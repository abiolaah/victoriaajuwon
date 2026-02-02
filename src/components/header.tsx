import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { adminNavMenuItem, navMenuItem } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  isAdmin?: boolean;
}

export const Header = ({ isAdmin }: HeaderProps) => {
  const isMobile = false; // Placeholder for useIsMobile hook
  return (
    <div className="flex gap-3 justify-between">
      <div className="flex-1 flex items-center justify-center md:justify-start py-4">
        <Image
          className="dark:invert"
          //   src="/logo/logo.svg"
          src="https://res.cloudinary.com/dixwarqdb/image/upload/v1747635236/logo_i14b9d.svg"
          alt="Portfolio logo"
          width={100}
          height={20}
          priority
        />
      </div>
      <div className="flex items-center justify-evenly pb-4">
        <NavigationMenu viewport={isMobile}>
          {isAdmin ? (
            <NavigationMenuList className="flex flex-row gap-4">
              {adminNavMenuItem.map((item, index) => (
                <NavigationMenuItem
                  key={index}
                  className="border-0 text-zinc-600"
                >
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href={item.link}>{item.name}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          ) : (
            <NavigationMenuList className="flex flex-row gap-4">
              {navMenuItem.map((item, index) => (
                <NavigationMenuItem
                  key={index}
                  className="border-0 text-zinc-600"
                >
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href={item.link}>{item.name}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          )}
        </NavigationMenu>
      </div>
    </div>
  );
};
