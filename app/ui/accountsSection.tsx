"use client";

import { Mail, Shield, User, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useApiCall } from "../hooks/apicallhook";
import { UserResponse } from "../utils/types";
import Button from "./button";
import Input from "./input";

type AccountsSectionProps = {
  name: string | null;
  setName: Dispatch<SetStateAction<string | null>>;
  email: string | null;
  setEmail: Dispatch<SetStateAction<string | null>>;
};

const AccountsSection = ({
  name,
  setName,
  email,
  setEmail,
}: AccountsSectionProps) => {
  const [userId] = useState<string | null>(() =>
    typeof window !== "undefined" ? localStorage.getItem("userID") : null,
  );

  const { data, error, loading } = useApiCall<UserResponse>(
    userId ? `/api/get-user/?userId=${userId}` : null,
    {
      method: "GET",
      credentials: "include",
    },
  );

  // Password Dialog States
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (data?.user.name) {
      setName(data.user.name);
    }

    if (data?.user.email) {
      setEmail(data.user.email);
    }
  }, [data, setName, setEmail]);

  const [validationErrors, setValidationErrors] = useState<{
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
    apiError?: string;
  }>({});

  const handlePasswordChange = async () => {
    const errors: {
      oldPassword?: string;
      newPassword?: string;
      confirmPassword?: string;
      apiError?: string;
    } = {};

    if (!oldPassword.trim()) {
      errors.oldPassword = "Old password is required";
    }

    if (!newPassword.trim()) {
      errors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});

    try {
      const response = await fetch("/api/change-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId,
          oldPassword,
          newPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setValidationErrors({
          apiError: result.message || "Failed to update password",
        });

        return;
      }

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsDialogOpen(false);

      setValidationErrors({});
    } catch (error) {
      setValidationErrors({
        apiError:
          error instanceof Error ? error.message : "Something went wrong",
      });
    }
  };

  return (
    <>
      <div className="m-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {/* Header */}
        {error && (
          <div className="text-lg text-red-500">Something went wrong</div>
        )}

        {loading && <div className="text-lg text-black">Loading...</div>}

        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-900">Account</h2>

          <p className="mt-1 text-sm font-extralight text-gray-500">
            Manage your personal information and account security.
          </p>
        </div>

        <div className="space-y-6">
          {/* Display Name */}
          <div className="flex flex-col gap-4 border-b border-gray-200 pb-6 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                <User size={16} className="text-gray-600" />
              </div>

              <div className="max-w-md">
                <h3 className="text-sm font-bold text-gray-900">
                  Display Name
                </h3>

                <p className="mt-1 text-sm font-extralight text-gray-500">
                  Shown on your public profile and shared links.
                </p>
              </div>
            </div>

            <div className="w-full md:w-80">
              <Input
                className="border-gray-300 bg-gray-50 text-sm font-extralight focus:bg-white"
                value={name ?? ""}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-4 border-b border-gray-200 pb-6 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                <Mail size={16} className="text-gray-600" />
              </div>

              <div className="max-w-md">
                <h3 className="text-sm font-bold text-gray-900">
                  Email Address
                </h3>

                <p className="mt-1 text-sm font-extralight text-gray-500">
                  Used for login and notifications. Changes require
                  verification.
                </p>
              </div>
            </div>

            <div className="w-full md:w-80">
              <Input
                className="border-gray-300 bg-gray-50 text-sm font-extralight focus:bg-white"
                value={email ?? ""}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                <Shield size={16} className="text-gray-600" />
              </div>

              <div className="max-w-md">
                <h3 className="text-sm font-bold text-gray-900">Password</h3>

                <p className="mt-1 text-sm font-extralight text-gray-500">
                  Minimum 8 characters. We recommend using a password manager.
                </p>
              </div>
            </div>

            <Button
              buttonText="Change Password"
              onClick={() => setIsDialogOpen(true)}
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-extralight text-gray-700 transition hover:bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Change Password
                </h2>

                <p className="mt-1 text-sm font-extralight text-gray-500">
                  Update your account password securely.
                </p>
              </div>

              <button
                onClick={() => setIsDialogOpen(false)}
                className="rounded-lg p-2 transition hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Old Password
                </label>

                <Input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => {
                    setOldPassword(e.target.value);

                    setValidationErrors((prev) => ({
                      ...prev,
                      oldPassword: "",
                      apiError: "",
                    }));
                  }}
                  className={`bg-gray-50 focus:bg-white ${
                    validationErrors.oldPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {validationErrors.oldPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {validationErrors.oldPassword}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  New Password
                </label>

                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);

                    setValidationErrors((prev) => ({
                      ...prev,
                      newPassword: "",
                      apiError: "",
                    }));
                  }}
                  className={`bg-gray-50 focus:bg-white ${
                    validationErrors.newPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {validationErrors.newPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {validationErrors.newPassword}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>

                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);

                    setValidationErrors((prev) => ({
                      ...prev,
                      confirmPassword: "",
                      apiError: "",
                    }));
                  }}
                  className={`bg-gray-50 focus:bg-white ${
                    validationErrors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {validationErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {validationErrors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-3">
              <Button
                buttonText="Cancel"
                onClick={() => setIsDialogOpen(false)}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              />

              <Button
                buttonText="Update Password"
                onClick={handlePasswordChange}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountsSection;
