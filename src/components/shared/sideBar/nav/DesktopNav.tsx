"use client";
import React from "react";
import { useNavigation } from "../../../../../hooks/useNavigation";
import { Card } from "@/components/ui/card";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";

type Props = {};

const DesktopNav = (props: Props) => {
  const paths = useNavigation();
  return (
    <Card className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-4">
      <nav>
      <ul className="flex flex-col items-center gap-4">
        {paths.map((path: any, id: any) => {
          return (
            <li key={id} className="relative">
              <Link href={path.href}>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      size="icon"
                      variant={path.active ? "default" : "outline"}
                    >
                      {path.icon}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{path.name}</p>
                  </TooltipContent>
                </Tooltip>
              </Link>
            </li>
          );
        })}
        </ul>
      </nav>
      <div className="flex flex-col items-center gap-4">
        <ThemeToggle/>
        <UserButton />
      </div>
    </Card>
  );
};

export default DesktopNav;
