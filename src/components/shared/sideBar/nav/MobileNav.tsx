"use client";
import React from "react";
import { useNavigation } from "../../../../../hooks/useNavigation";
import { Card } from "@/components/ui/card";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

type Props = {};

const MobileNav = (props: Props) => {
  const path = useNavigation();
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
         <li className="flex flex-col items-center g-4">
        <UserButton />
      </li>
      </ul>
      </nav>
    </Card>
  );
};

export default MobileNav;
