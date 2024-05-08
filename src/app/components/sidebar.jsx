"use client";
import { useState } from "react";
import Link from "next/link";
import "../../src/app/styles/sidebar.css";

export default function SideBar() {
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <section className="flex items-left bg-black text-white p-8">
      <ul>
        <li>
          <Link href="#">Sign In</Link>
        </li>
        <li>
          <Link href="#">Sign Up</Link>
        </li>
      </ul>
    </section>
  );
}
