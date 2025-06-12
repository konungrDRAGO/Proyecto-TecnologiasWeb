import { NavbarAdmin } from "@/components/NavbarAdmin";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarAdmin />
      <main className="flex-1">{children}</main>
    </div>
  );
}
