import { Star } from "lucide-react";

type ProfileProps = {
  name: string;
  email: string;
  timeline: string;
  linksCreated: number;
  linksLimit: number;
  clicksTracked: number;
  clicksLimit: number;
};

const ProgressBar = ({ value, max }: { value: number; max: number }) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-500 transition-all"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

const ProfileCard: React.FC<ProfileProps> = ({
  name,
  email,
  timeline,
  linksCreated,
  linksLimit,
  clicksTracked,
  clicksLimit,
}) => {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  return (
    <div className="bg-white text-black m-10 border border-gray-200 rounded-2xl shadow-sm">
      {/* 🔹 Header */}
      <div className="flex items-center justify-between p-8">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="size-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-lg">
            {initials}
          </div>

          {/* User Info */}
          <div className="flex flex-col">
            <span className="font-semibold text-xl">{name}</span>
            <span className="text-sm text-gray-500">{email}</span>
            <span className="text-xs text-gray-400">{timeline}</span>
          </div>
        </div>

        {/* Plan Badge */}
        <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-lg">
          <Star size={16} className="text-blue-500" />
          <span className="text-blue-600 font-medium text-sm">Free Plan</span>
        </div>
      </div>

      {/* 🔹 Usage Section */}
      <div className="px-8 pb-8">
        <h3 className="font-semibold text-sm mb-4 text-gray-700">
          Usage this month
        </h3>

        <div className="space-y-5">
          {/* Links Created */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Links Created</span>
              <span className="font-medium">
                {linksCreated} / {linksLimit}
              </span>
            </div>
            <ProgressBar value={linksCreated} max={linksLimit} />
          </div>

          {/* Clicks Tracked */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Clicks Tracked</span>
              <span className="font-medium">
                {clicksTracked} / {clicksLimit}
              </span>
            </div>
            <ProgressBar value={clicksTracked} max={clicksLimit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
