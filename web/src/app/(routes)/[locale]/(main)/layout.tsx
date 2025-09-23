import "../../../globals.css";
import { ReactNode } from "react";
import { getServerSession, Session } from "next-auth";
import MainLayout from "@/app/_layouts/MainLayout";
import { redirect } from "next/navigation";

type Props = {
  children: ReactNode;
  session: Session;
};

export default async function MainWrapperLayout({ children }: Readonly<Props>) {
  const session = await getServerSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}
