"use client";
import React from "react";
import { useNavigation } from "../../../../../hooks/useNavigation";
import { Card } from "@/components/ui/card";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useConversation } from "../../../../../hooks/useConversation";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import CustomDiv from "@/components/ui/CustomDiv";
import { Badge } from "@/components/ui/badge";

type Props = {};

const MobileNav = (props: Props) => {
  const path = useNavigation();
  const { isActive } = useConversation();
  if (isActive) return null;
  return (
    <Card className="fixed bottom-4 w-[calc(100vw-32px)] flex items-center h-16 p-2 lg:hidden">
      <nav className="w-full ">
        <ul className="flex justify-evenly items-center">
          {path.map((path: any, id: any) => {
            return (
              <li key={id} className="relative">
                <Link href={path.href}>
                  <Tooltip>
                    <TooltipTrigger>
                    <CustomDiv active={path.active} icon={path.icon} />
                    {path.count ? (<Badge className="absolute left-6 bottom-7 px-2">{path.count}</Badge>):null}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{path.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>
              </li>
            );
          })}
          <li>
            <ThemeToggle />
          </li>
          <li>
            <UserButton />
          </li>
        </ul>
      </nav>
    </Card>
  );
};

export default MobileNav;
