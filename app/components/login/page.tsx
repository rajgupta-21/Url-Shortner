"use client";
import Button from "@/app/ui/button";
import Input from "@/app/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const FetchLoginData = async () => {
    const response = await fetch("/api/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    localStorage.setItem("userID", data.userId);
    localStorage.setItem("email", data.email);
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white text-black  p-8 rounded-xl shadow-md max-w-150 flex flex-col gap-4 border-black border">
        <h1 className="text-xl font-bold text-center">Welcome To LinkSnap</h1>
        <p className="text-center text-gray-500">
          Login To you&apos;re account
        </p>
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

        <Button
          className="w-fit mx-auto px-10 py-2"
          buttonText="Login"
          onClick={FetchLoginData}
        ></Button>
        <div className="flex flex-col">
          <span className="mx-auto">Or</span>
          <div className="mx-auto">
            <span className="">Dont have an account? </span>
            <span
              className="text-blue-700 cursor-pointer underline"
              onClick={() => {
                router.push("/components/home");
              }}
            >
              Sign Up
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

export default LoginPage;
