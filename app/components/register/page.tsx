"use client";
import Button from "@/app/ui/button";
import Input from "@/app/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
const RegisterPage = () => {
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const FetchRegisterData = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: firstname,
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      localStorage.setItem("userID", data.userId);
      localStorage.setItem("email", data.email);
      router.push("/components/overview");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="flex w-full max-w-md flex-col gap-4 rounded-xl border border-black bg-white p-6 text-black shadow-md sm:p-8">
        <h1 className="text-center text-xl font-bold">Welcome To LinkSnap</h1>
        <p className="text-center text-gray-500">Create your free account</p>

        <Input
          name="Name"
          placeholder="First Name"
          type="text"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          name="Last Name"
          placeholder="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          name="Email"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          name="Password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <div className="text-center text-sm text-red-500">{error}</div>
        )}

        <Button
          className="mx-auto w-fit px-10 py-2 text-white disabled:opacity-50"
          buttonText={loading ? "Creating..." : "Create Account"}
          onClick={FetchRegisterData}
          disabled={loading}
        ></Button>
        <div className="flex flex-col">
          <span className="mx-auto">Or</span>
          <div className="mx-auto">
            <span className="">Already have an account? </span>
            <span
              className="text-blue-700 cursor-pointer underline"
              onClick={() => {
                router.push("/components/login");
              }}
            >
              Sign In
            </span>
          </div>
          <span>
            {" "}
            By signing up you agree to our Terms of Service and Privacy Policy.
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
