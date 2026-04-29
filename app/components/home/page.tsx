"use client";

import Button from "@/app/ui/button";
import Input from "@/app/ui/input";
import { useState } from "react";

const HomePage = () => {
  const [url, setUrl] = useState<string>("");
  const [data, setData] = useState("");
  const [urlerror, seturlError] = useState<boolean>(false);
  const [urlValerror, setUrlValError] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [copy, setCopy] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const isValidUrl = (value: string) => {
    try {
      if (!value.startsWith("http://") && !value.startsWith("https://")) {
        return false;
      }

      new URL(value);
      return true;
    } catch {
      return false;
    }
  };
  const handleSubmit = async () => {
    seturlError(false);
    setUrlValError(false);
    setError(false);

    if (!url) {
      seturlError(true);
      return;
    }

    if (!isValidUrl(url)) {
      setUrlValError(true);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/url-shortner", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ url }),
        headers: { "Content-Type": "application/json" },
      });

      const { shortUrl } = await response.json();
      setData(shortUrl);
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleCopy = () => {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = data;

      // Prevent scrolling to bottom
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      document.execCommand("copy");

      document.body.removeChild(textarea);
      setCopy(true);
    } catch (err) {
      setCopy(false);
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="">
      <div className="min-h-screen bg-gray-100 w-full flex flex-col items-center pt-24">
        {/* Hero Section */}
        <div className="text-center max-w-2xl flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-black">Shorten links.</h1>
          <h1 className="text-4xl font-bold text-black"> Track every click.</h1>

          <p className="text-gray-600">
            Create short, memorable links and see exactly where your audience
            comes from.
          </p>

          {/* Input + Button */}
          <div className="flex gap-2 mt-4 mx-auto">
            <Input
              placeholder="Paste a long URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />

            <Button
              buttonText="Shorten It"
              className="px-6 text-white"
              onClick={() => {
                handleSubmit();
              }}
            />
          </div>
          {urlerror && <div className="text-red-500">Url Is not valid</div>}
          {loading && <div className="text-gray-500">Loading...</div>}
          {urlValerror && <div className="text-red-500">Not a Valid Url</div>}
          {error && <div className="text-red-500">Somthing Went Wrong</div>}
          {data && (
            <div className="flex gap-4 justify-between p-2 items-center bg-blue-100 rounded-xl border">
              <div className="text-black">{data}</div>

              <span
                className="text-white cursor-pointer p-2 rounded-xl bg-black"
                onClick={handleCopy}
              >
                {copy ? "Copied!" : "Copy"}
              </span>
            </div>
          )}
        </div>

        {/* Cards Section */}
        <div className="mt-12 text-black grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h2 className="font-semibold text-lg">Fast</h2>
            <p className="text-gray-500 mt-2">
              Instantly shorten your links with high performance.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h2 className="font-semibold text-lg">Trackable</h2>
            <p className="text-gray-500 mt-2">
              Monitor clicks and user engagement in real-time.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h2 className="font-semibold text-lg">Secure</h2>
            <p className="text-gray-500 mt-2">
              Your links are protected with modern security.
            </p>
          </div>
        </div>
        <div className="text-white size-full mt-auto">
          <div className="text-lg bg-blue-600 flex justify-center items-center p-4 ">
            Created By @Raj Gupta
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
