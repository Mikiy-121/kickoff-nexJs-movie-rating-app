"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    login(email);
    router.push("/");
  };

  return (
    <div className="page">
      <div className="login-container">
        <h2>Welcome to Kickoff Anime</h2>
        <p>Enter your email to start rating and commenting.</p>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="e.g., animefan@example.com"
              required
              autoFocus
            />
            {error && <p className="error-text">{error}</p>}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
