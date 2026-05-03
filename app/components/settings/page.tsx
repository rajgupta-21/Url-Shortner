import AccountsSection from "@/app/ui/accountsSection";
import DangerZone from "@/app/ui/dangerZone";
import LinkDefaultsSection from "@/app/ui/linksDefault";

const SettingsPage = () => {
  return (
    <div className="text-black">
      <div className="h-13 w-full p-3 border-b-2 border-gray-200 bg-white font-bold text-md">
        Settings
      </div>
      <AccountsSection />
      <LinkDefaultsSection />
      <DangerZone />
    </div>
  );
};

export default SettingsPage;
