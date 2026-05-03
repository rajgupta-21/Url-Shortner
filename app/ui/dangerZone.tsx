import Button from "./button";

const DangerZone = () => {
  return (
    <div>
      <div className="m-5 p-5 rounded-xl border-[0.8px] border-red-400 ">
        <div className="flex flex-col">
          <span className="text-red-500 text-sm font-semibold">
            Danger Zone
          </span>
          <span className="w-full h-[0.5px] bg-red-400 mt-2"></span>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mt-5">
          <div className="flex gap-3">
            <div className="max-w-md">
              <h3 className="text-sm font-bold text-gray-900">
                Delete all links
              </h3>
              <p className="mt-1 text-sm font-extralight text-gray-500">
                Permanently removes all your short links and their analytics.
                This cannot be undone.
              </p>
            </div>
          </div>

          <Button
            buttonText="Delete All Links"
            className="rounded-xl border border-red-400 bg-gray-50 text-red-500 px-3 py-2 text-sm font-extralight transition hover:bg-gray-100"
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mt-5">
          <div className="flex gap-3">
            <div className="max-w-md">
              <h3 className="text-sm font-bold text-gray-900">
                Delete account
              </h3>
              <p className="mt-1 text-sm font-extralight text-gray-500">
                Permanently deletes your account, all links, and all data.
                Irreversible.
              </p>
            </div>
          </div>

          <Button
            buttonText="Delete Account"
            className="rounded-xl border border-red-400 text-red-500 bg-gray-50 px-3 py-2 text-sm font-extralight  transition hover:bg-gray-100"
          />
        </div>
      </div>
      <div className="px-5 flex justify-end">
        <button className="text-black bg-white font-extralight flex text-shadow-gray-600 p-2 rounded-xl border border-gray-400 cursor-pointer hover:bg-gray-300 ">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default DangerZone;
