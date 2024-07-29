'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { sidebarLinks } from "@/constants/constants"
import { icons } from "@/constants/constants"
import { UserButton, useUser } from "@clerk/nextjs"

const Sidebar = () => {
  const pathname = usePathname()
  const { user } = useUser()
  const email = user?.emailAddresses[0].emailAddress

  return (
    <section className="sidebar no-scrollbar">
      <nav className="flex flex-col lg:gap-3 md:gap-6">
        <Link href="/" className="mb-10 cursor-pointer text-5xl font-mono font-semibold text-[#3A5AFF] tracking-wide">AcaData</Link>
        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
          const IconComponent = icons[item.icon]
          return (
            <Link href={item.route} key={item.label} className={`sidebar-link ${isActive ? 'bg-blue-500' : 'bg-inherit'}`}>
              <div className="relative size-6">
                <IconComponent className="sidebar-icon" color={`${isActive ? 'white' : 'black'}`} />
              </div>
              <p className={`sidebar-label ${isActive ? 'text-white' : 'text-black hover:text-[1.35rem]'}`}>
                {item.label}
              </p>
            </Link>
          )
        })}
        <div className="sidebar-footer">
          <hr />
          <div className="pt-4 pb-2 sidebar-user">
            <UserButton />
            <div className="sidebar-user-info">
              <p className="font-semibold">{user?.fullName}</p>
              <p>{email}</p>
            </div>
          </div>
        </div>
      </nav>
    </section>
  )
}

export default Sidebar
