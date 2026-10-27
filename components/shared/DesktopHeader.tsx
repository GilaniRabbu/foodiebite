"use client";
import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import Logo from "./Logo";
import ContainerWrapper from "../common/ContainerWrapper";
import { selectCurrentUser } from "@/redux/slice/authSlice";
import useLogout from "@/hooks/useLogout";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Meals", href: "/meals" },
    { name: "Booking", href: "/booking" },
    { name: "About us", href: "/about-us" },
    { name: "Contact", href: "/contact" },
];

const DesktopHeader = () => {
    const user = useSelector(selectCurrentUser);
    const handleLogout = useLogout();

    return (
        <ContainerWrapper className="py-5 hidden lg:block">
            <div className="flex items-center justify-between">
                <Logo />
                <nav className="flex items-center space-x-8">
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="font-medium text-gray-500 hover:text-orange-500"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <Link
                                href={
                                    user.role === "ADMIN"
                                        ? "/admin/dashboard"
                                        : "/user/dashboard"
                                }
                                className="px-4 py-2 rounded text-black"
                            >
                                Dashboard
                            </Link>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="px-4 py-2 rounded text-white bg-orange-400 hover:bg-orange-500 cursor-pointer"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/signup"
                                className="px-4 py-2 rounded text-black"
                            >
                                Sign Up
                            </Link>
                            <Link
                                href="/login"
                                className="px-4 py-2 rounded text-white bg-orange-400 hover:bg-orange-500"
                            >
                                Log In
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </ContainerWrapper>
    );
};

export default DesktopHeader;
