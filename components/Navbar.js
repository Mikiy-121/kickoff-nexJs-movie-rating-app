"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

function NavbarContent() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="brand">
          Kickoff <span>Anime</span>
        </Link>
        <nav className="nav-links">
          <Link
            href="/"
            style={{
              color: pathname === "/" ? "var(--text)" : "var(--text-dim)",
            }}
          >
            Home
          </Link>
          {/* Added Leaderboard Link */}
          <Link
            href="/leaderboard"
            style={{
              color:
                pathname === "/leaderboard" ? "var(--text)" : "var(--text-dim)",
            }}
          >
            Leaderboard
          </Link>
        </nav>
        <div className="nav-auth">
          {user ? (
            <>
              <span className="nav-username">{user.email}</span>
              <button className="btn btn-ghost" onClick={logout}>
                Log out
              </button>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary">
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense
      fallback={
        <header className="navbar">
          <div className="navbar-inner">
            <Link href="/" className="brand">
              Kickoff <span>Anime</span>
            </Link>
          </div>
        </header>
      }
    >
      <NavbarContent />
    </Suspense>
  );
}
