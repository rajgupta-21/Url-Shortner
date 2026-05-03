import { Clock3, Link2, Tags } from "lucide-react";
import Input from "./input";

const LinkDefaultsSection = () => {
  return (
    <div className="m-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-900">Link Defaults</h2>
        <p className="mt-1 text-sm font-extralight text-gray-500">
          Configure default settings for newly created shortened links.
        </p>
      </div>

      <div className="space-y-6">
        {/* Link Expiry */}
        <div className="flex flex-col gap-4 border-b border-gray-200 pb-6 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
              <Clock3 size={16} className="text-gray-600" />
            </div>

            <div className="max-w-md">
              <h3 className="text-sm font-bold text-gray-900">
                Default Link Expiry
              </h3>
              <p className="mt-1 text-sm font-extralight text-gray-500">
                Newly created links will expire after this duration unless
                overridden.
              </p>
            </div>
          </div>

          <div className="w-full md:w-80">
            <select className="w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-3 text-sm font-extralight text-gray-700 outline-none focus:bg-white">
              <option>7 days</option>
              <option>30 days</option>
              <option>90 days</option>
              <option>Never expire</option>
            </select>
          </div>
        </div>

        {/* UTM Tagging */}
        <div className="flex flex-col gap-4 border-b border-gray-200 pb-6 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
              <Link2 size={16} className="text-gray-600" />
            </div>

            <div className="max-w-md">
              <h3 className="text-sm font-bold text-gray-900">UTM Tagging</h3>
              <p className="mt-1 text-sm font-extralight text-gray-500">
                Automatically append UTM parameters to all shortened links.
              </p>
            </div>
          </div>

          <label className="relative inline-flex cursor-pointer items-center">
            <input type="checkbox" className="peer sr-only" />

            <div className="peer h-6 w-11 rounded-full bg-gray-300 transition-all after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-black peer-checked:after:translate-x-5"></div>
          </label>
        </div>

        {/* Custom Tags */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
              <Tags size={16} className="text-gray-600" />
            </div>

            <div className="max-w-md">
              <h3 className="text-sm font-bold text-gray-900">Custom Tags</h3>
              <p className="mt-1 text-sm font-extralight text-gray-500">
                Auto-label new links with these tags for easier filtering.
              </p>
            </div>
          </div>

          <div className="w-full md:w-80">
            <Input
              placeholder="Add a tag..."
              className="border-gray-300 bg-gray-50 text-sm font-extralight focus:bg-white"
            />

            <div className="mt-3 flex flex-wrap gap-2">
              {["work", "2024", "hihi"].map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-2 rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-xs font-extralight text-gray-700"
                >
                  <span>{tag}</span>
                  <button className="text-gray-500 hover:text-black">×</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkDefaultsSection;
