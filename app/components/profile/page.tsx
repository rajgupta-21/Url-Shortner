"use client";

import { useApiCall } from "@/app/hooks/apicallhook";
import AccountDetails from "@/app/ui/accountDetailsCard";
import Button from "@/app/ui/button";
import ProfileCard from "@/app/ui/profileCard";

const ProfilePage = () => {
  type UserResponse = {
    user: {
      _id: string;
      name: string;
      email: string;
      createdAt: string;
    };
  };
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userID") : null;

  const { data, error, loading } = useApiCall<UserResponse>(
    userId ? `/api/get-user?userId=${userId}` : null,
    {
      method: "GET",
    },
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching user</div>;

  const user = data?.user;

  return (
    <div className="flex flex-col text-black">
      <div className="h-14 bg-white border-b-2 border-gray-200 flex justify-between items-center px-4">
        <span className="font-bold">Profile</span>
        <Button
          buttonText="Edit Profile"
          className="p-2 bg-white border border-gray-200 text-black"
        />
      </div>

      <div className="bg-gray-100">
        <div className="text-white">
          <ProfileCard
            name={user?.name || "undefined"}
            email={user?.email || "undefined"}
            timeline={user?.createdAt || "undefined"}
            linksCreated={10}
            linksLimit={100}
            clicksTracked={100}
            clicksLimit={200}
          />

          <AccountDetails
            name={user?.name || "undefined"}
            email={user?.email || "undefined"}
            plan="Free plan"
            domain="linkSnap.io"
            joinedAt={user?.createdAt || "undefined"}
            lastLogin="today"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
