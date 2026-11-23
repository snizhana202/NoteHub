"use client";

import { useState } from "react";
import css from "./Header.module.css";
import Link from "next/link";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>

      <button
        type="button"
        className={css.burger}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        aria-label="Main Navigation"
        className={`${css.nav} ${isOpen ? css.navOpen : ""}`}
      >
        <ul className={css.navigation} onClick={() => setIsOpen(false)}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/notes/filter/all">Notes</Link>
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
