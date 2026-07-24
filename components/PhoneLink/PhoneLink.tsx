"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { MetrikaGoals, reachGoal } from "@/lib/metrika";
import { PHONE_TEL } from "@/lib/phone";

type Props = Omit<ComponentPropsWithoutRef<"a">, "href" | "onClick"> & {
  children: ReactNode;
  goalParams?: Record<string, unknown>;
};

export default function PhoneLink({
  children,
  goalParams,
  ...rest
}: Props) {
  return (
    <a
      {...rest}
      href={PHONE_TEL}
      onClick={() => {
        reachGoal(MetrikaGoals.phoneClick, goalParams);
      }}
    >
      {children}
    </a>
  );
}
