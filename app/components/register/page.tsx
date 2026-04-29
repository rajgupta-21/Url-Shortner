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
  const router = useRouter();

  const FetchLoginData = async () => {
    const response = await fetch("/api/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: firstname,
        lastName: lastName,
        email: email,
        password: password,
      }),
    });
    const data = response.json();
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white text-black  p-8 rounded-xl shadow-md max-w-[600px] flex flex-col gap-4 border border-black">
        <h1 className="text-xl font-bold text-center">Welcome To LinkSnap</h1>
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

        <Button
          className="w-fit px-10 py-2 mx-auto"
          buttonText="Create Account"
          onClick={FetchLoginData}
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
