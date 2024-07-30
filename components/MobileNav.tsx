'use client'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants/constants"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { icons } from "@/constants/constants"
import { UserButton, useUser, useClerk } from "@clerk/nextjs"

const MobileNav = () => {
  const pathname = usePathname()
  const { user } = useUser()
  const { signOut } = useClerk();
  const email = user?.emailAddresses[0].emailAddress
  const url = user?.imageUrl

  return (
    <section className="w-full">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white flex flex-col h-full">
          <Link href="/" className="flex items-center gap-1 px-4 py-4">
            <h1 className="text-3xl font-mono font-semibold text-[#3A5AFF] tracking-wide">AcaData</h1>
          </Link>
          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex flex-col gap-6 pt-4 px-4 text-black">
              {sidebarLinks.map((item) => {
                const isActive = pathname === item.route
                const IconComponent = icons[item.icon]

                return (
                  <SheetClose asChild key={item.route}>
                    <Link href={item.route} key={item.label} className={`flex items-center gap-4 py-2 px-4 rounded ${isActive ? 'bg-blue-500' : 'bg-inherit'}`}>
                      <IconComponent className="sidebar-icon" color={`${isActive ? 'white' : 'black'}`} />
                      <p className={`text-lg font-semibold ${isActive ? 'text-white' : 'text-black'}`}>{item.label}</p>
                    </Link>
                  </SheetClose>
                )
              })}
            </nav>
          </div>
          <div className="border-t border-gray-200 pt-3">
            <div className="flex items-center gap-3">
              <Link href='/user-profile' className="inline-block rounded-full overflow-hidden border-2 border-gray-300 hover:border-blue-500 focus:border-blue-500 transition">
                <img src={url} alt="Profile Image" className="object-cover w-8 h-8" />
              </Link>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="text-black font-semibold text-sm">{user?.fullName}</p>
                  <button 
                    onClick={() => signOut({ redirectUrl: '/' })}  
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    <Image src="/icons/logout.svg" width={20} height={20} alt="logout" />
                  </button>
                </div>
                <p className="text-gray-600 text-xs">{email}</p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav
