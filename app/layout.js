import "./globals.css";
import { Suspense } from "react";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";



export const metadata = {
  title: "Kickoff Anime Rating App",
  description: "Discover, rate, and discuss the best anime.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Suspense
            fallback={
              <div
                style={{
                  padding: "1rem",
                  textAlign: "center",
                  color: "var(--text-dim)",
                }}
              >
                Loading...
              </div>
            }
          >
            <Navbar />
          </Suspense>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
