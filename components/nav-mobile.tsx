'use client'
import { useRef, useState } from "react";
import { Spin as Hamburger } from "hamburger-react";
import { AnimatePresence, motion } from "framer-motion";
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';


export const NavMobile = () => {
    const [isOpen, setOpen] = useState(false);
    const ref = useRef(null);
    return (
        <div ref={ref} className="lg:hidden">
            <Hamburger toggled={isOpen} size={30} toggle={setOpen} />
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed left-0 right-0 top-[3.5rem] p-5 pt-0 bg-white shadow-lg"
                    >
                         <SignedOut>
                        <motion.a
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                type: 'spring',
                                stiffness: 260,
                                damping: 20,
                                delay: 0.2,
                                duration: 0.2
                            }}
                            href='/sign-up'
                            className="block w-full my-2 py-5 text-center rounded-xl bg-[#3A5AFF] text-white hover:bg-[#3A5AFF]/90"
                            onClick={() => setOpen(false)}
                        >
                            Sign Up
                        </motion.a>
                        <motion.a
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                type: 'spring',
                                stiffness: 260,
                                damping: 20,
                                delay: 0.2,
                                duration: 0.2
                            }}
                            href='/sign-in'
                            className="block w-full my-2 py-5 text-center rounded-xl bg-white border border-gray-300 text-gray-700 hover:bg-white/90"
                            onClick={() => setOpen(false)}
                        >
                            Log In
                        </motion.a>
                        </SignedOut>
                        <SignedIn>
                            <motion.a 
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                type: 'spring',
                                stiffness: 260,
                                damping: 20,
                                delay: 0.2,
                                duration: 0.2
                            }}
                            href="/dashboard"
                            className="block w-full my-5 py-5 text-center rounded-xl bg-[#3A5AFF] text-white hover:bg-[#3A5AFF]/90"
                            onClick={() => setOpen(false)}
                            >Dashboard</motion.a>
                        </SignedIn>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
