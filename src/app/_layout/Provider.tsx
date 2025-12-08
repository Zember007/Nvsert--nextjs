import { ReactNode } from "react";
import ClientProvider from "./ClientProvider";
import { NavigationItem } from "@/types/navigation";

export default function Provider({
  children,
  initialNavigation
}: {
  children: ReactNode;
  initialNavigation: NavigationItem[];
}) {
  return (
    <ClientProvider initialNavigation={initialNavigation}>
      {children}
    </ClientProvider>
  );
}
