import { Mail, Shield, User } from "lucide-react";
import Button from "./button";
import Input from "./input";

const AccountsSection = () => {
  return (
    <div className="m-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-900">Account </h2>
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
              <h3 className="text-sm font-bold text-gray-900">Display Name</h3>
              <p className="mt-1 text-sm font-extralight text-gray-500">
                Shown on your public profile and shared links.
              </p>
            </div>
          </div>

          <div className="w-full md:w-80">
            <Input className="border-gray-300 bg-gray-50 text-sm font-extralight focus:bg-white" />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-4 border-b border-gray-200 pb-6 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
              <Mail size={16} className="text-gray-600" />
            </div>

            <div className="max-w-md">
              <h3 className="text-sm font-bold text-gray-900">Email Address</h3>
              <p className="mt-1 text-sm font-extralight text-gray-500">
                Used for login and notifications. Changes require verification.
              </p>
            </div>
          </div>

          <div className="w-full md:w-80">
            <Input className="border-gray-300 bg-gray-50 text-sm font-extralight focus:bg-white" />
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
            className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-extralight text-gray-700 transition hover:bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

export default AccountsSection;
