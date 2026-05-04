"use client";
import AccountsSection from "@/app/ui/accountsSection";
import DangerZone from "@/app/ui/dangerZone";
import LinkDefaultsSection from "@/app/ui/linksDefault";
import { useEffect, useState } from "react";

const SettingsPage = () => {
  const [name, setName] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");
  const [userId, setUserId] = useState<string | null>();
  useEffect(() => {
    const userId = localStorage.getItem("userID");
    if (!userId) {
      console.error("User ID not found in localStorage");
    }
    setUserId(userId);
  }, []);
  console.log(name, email);
  const HandleSubmit = async () => {
    const response = await fetch("/api/update-user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        updatedName: name,
        updatedEmail: email,
        userId: userId,
      }),
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
  };
  return (
    <div className="text-black">
      <div className="h-13 w-full p-3 border-b-2 border-gray-200 bg-white font-bold text-md">
        Settings
      </div>
      <AccountsSection
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
      />
      <LinkDefaultsSection />
      <DangerZone />
      <div className="px-5 flex justify-end">
        <button
          className="text-black bg-white font-extralight flex text-shadow-gray-600 p-2 rounded-xl border border-gray-400 cursor-pointer hover:bg-gray-300 "
          onClick={() => {
            HandleSubmit();
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
