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
import { UserButton, useUser } from "@clerk/nextjs"

const MobileNav = () => {
  const pathname = usePathname()
  const { user } = useUser()
  console.log(user)
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
                const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
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
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <UserButton />
              <div>
                <p className="text-black font-semibold text-sm">{user?.fullName}</p>
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
