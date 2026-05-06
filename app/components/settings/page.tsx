"use client";

import AccountsSection from "@/app/ui/accountsSection";
import DangerZone from "@/app/ui/dangerZone";
import LinkDefaultsSection from "@/app/ui/linksDefault";
import { useEffect, useState } from "react";

const SettingsPage = () => {
  const [name, setName] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");
  const [userId, setUserId] = useState<string | null>(null);

  const [isOpenDialogBox, setIsOpenDialogBox] = useState<boolean>(false);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userID");

    if (!storedUserId) {
      console.error("User ID not found in localStorage");
      return;
    }

    setUserId(storedUserId);
  }, []);

  const HandleDeleteLinks = async () => {
    try {
      setIsDeleting(true);

      const response = await fetch("/api/delete-links", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      console.log(data);

      setIsOpenDialogBox(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const HandleSubmit = async () => {
    try {
      setIsSaving(true);

      const response = await fetch("/api/update-user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updatedName: name,
          updatedEmail: email,
          userId,
        }),
        credentials: "include",
      });

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Modal */}
      {isOpenDialogBox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-red-500">
                Delete all links?
              </h2>

              <p className="text-sm text-gray-500 leading-relaxed">
                This action will permanently delete all your shortened links and
                analytics. This cannot be undone.
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                className="rounded-xl border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100"
                onClick={() => setIsOpenDialogBox(false)}
              >
                Cancel
              </button>

              <button
                className={`rounded-xl bg-red-500 px-4 py-2 text-sm text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 `}
                disabled={isDeleting}
                onClick={HandleDeleteLinks}
              >
                {isDeleting ? "Deleting..." : "Delete All Links"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-5 py-4">
        <h1 className="text-lg font-semibold">Settings</h1>
      </div>

      {/* Sections */}
      <AccountsSection
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
      />

      <LinkDefaultsSection />

      <DangerZone setIsOpenDialogBox={setIsOpenDialogBox} />

      {/* Footer */}
      <div className="flex justify-end px-5 py-5">
        <button
          className="rounded-xl border border-gray-300 bg-white px-5 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSaving}
          onClick={HandleSubmit}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
