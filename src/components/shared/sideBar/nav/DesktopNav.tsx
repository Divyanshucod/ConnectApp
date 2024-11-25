"use client";
import React from "react";
import { useNavigation } from "../../../../../hooks/useNavigation";
import { Card } from "@/components/ui/card";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

type Props = {};

const DesktopNav = (props: Props) => {
  const path:any = useNavigation();
  return (
    <Card className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-4">
      <nav className="flex flex-col items-center g-4">
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
                </Tooltip>
              </Link>
            </li>
          );
        })}
      </nav>
      <div className="flex flex-col items-center g-4">
        <UserButton />
      </div>
    </Card>
  );
};

export default DesktopNav;
