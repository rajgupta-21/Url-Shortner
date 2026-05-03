"use client";

export type LinkItem = {
  _id: string;
  shortCode: string;
  originalUrl: string;
  clicks: number;
  isActive: boolean;
  createdAt: string;
};

export type Props = {
  links: LinkItem[];
};

const MylinksTable: React.FC<Props> = ({ links }) => {
  const handleCopy = async (shortUrl: string) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 overflow-x-auto border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 text-black">My Links</h2>

      <table className="min-w-full border-collapse">
        {/* Header */}
        <thead>
          <tr className="text-left text-gray-500 text-sm border-b border-gray-300">
            <th className="py-3 px-2">Short URL</th>
            <th className="py-3 px-2">Original URL</th>
            <th className="py-3 px-2">Clicks</th>
            <th className="py-3 px-2">Created</th>
            <th className="py-3 px-2">isActive</th>
            <th className="py-3 px-2 text-right">Actions</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {links?.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-400">
                No links found
              </td>
            </tr>
          ) : (
            links?.map((link) => {
              const shortUrl = `http://localhost:3000/${link.shortCode}`;

              return (
                <tr
                  key={link._id}
                  className="border-b hover:bg-gray-50 transition border-gray-300"
                >
                  <td className="py-3 px-2 text-blue-600 font-medium">
                    {link.shortCode}
                  </td>

                  <td className="py-3 px-2 text-gray-700 truncate max-w-xs">
                    {link.originalUrl}
                  </td>

                  <td className="py-3 px-2 font-semibold text-black">
                    {link.clicks}
                  </td>
                  <td className="py-3 px-2 text-gray-500 text-sm">
                    {new Date(link.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-2 font-semibold text-black">
                    {link.isActive}
                  </td>

                  <td className="py-3 px-2 text-right flex gap-2 justify-end">
                    <button
                      onClick={() => handleCopy(shortUrl)}
                      className="px-3 py-1 text-sm bg-black text-white rounded-lg hover:bg-gray-800"
                    >
                      Copy
                    </button>

                    <a
                      href={shortUrl}
                      target="_blank"
                      className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-100"
                    >
                      Visit
                    </a>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MylinksTable;
