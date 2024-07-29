import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";;
import Image from "next/image";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <main className="flex h-screen w-full md:overflow-hidden">
      <Sidebar />
    <div className="flex size-full flex-col">
        <div className="root-layout">
          <h1>AcaData</h1>
          <div>
            <MobileNav />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}