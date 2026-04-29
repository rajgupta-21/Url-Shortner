import { Calendar, Key, Link2, Mail, Shield } from "lucide-react";

type AccountDetailsProps = {
  name: string;
  email: string;
  plan: string;
  domain: string;
  joinedAt: string;
  lastLogin: string;
};

const AccountDetails: React.FC<AccountDetailsProps> = ({
  name,
  email,
  plan,
  domain,
  joinedAt,
  lastLogin,
}) => {
  return (
    <div className="bg-white text-black m-10 border border-gray-200 rounded-2xl shadow-sm">
      {/* 🔹 Header */}
      <div className="p-8 border-b border-gray-100">
        <h2 className="text-xl font-semibold">Account Details</h2>
        <p className="text-sm text-gray-500">
          Manage your account information and settings
        </p>
      </div>

      {/* 🔹 Content */}
      <div className="p-8 space-y-6">
        {/* Name */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-600">
            <Shield size={18} />
            <span>Name</span>
          </div>
          <span className="font-medium">{name}</span>
        </div>

        {/* Email */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-600">
            <Mail size={18} />
            <span>Email</span>
          </div>
          <span className="font-medium">{email}</span>
        </div>

        {/* Plan */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-600">
            <Shield size={18} />
            <span>Plan</span>
          </div>
          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium">
            {plan}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-600">
            <Link2 size={18} />
            <span>Domain</span>
          </div>
          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium">
            {domain}
          </span>
        </div>

        {/* Joined */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-600">
            <Calendar size={18} />
            <span>Joined</span>
          </div>
          <span className="font-medium">{joinedAt}</span>
        </div>

        {/* Last Login */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-600">
            <Calendar size={18} />
            <span>Last Login</span>
          </div>
          <span className="font-medium">{lastLogin}</span>
        </div>
      </div>

      {/* 🔹 Actions */}
      <div className="p-8 border-t border-gray-100 flex justify-end gap-3">
        <button className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition">
          <Key size={16} />
          Change Password
        </button>

        <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default AccountDetails;
