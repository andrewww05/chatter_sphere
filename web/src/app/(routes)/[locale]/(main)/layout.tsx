'use client'

import "../../../globals.css";
import { ReactNode } from "react";
import { Session } from "next-auth";
import MainLayout from "@/app/_layouts/MainLayout";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type Props = {
  children: ReactNode;
  session: Session;
};

export default async function MainWrapperLayout({ children }: Readonly<Props>) {
  const { status } = useSession();

  if (status == "unauthenticated") {
    redirect('/sign-in');
  }

  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}
