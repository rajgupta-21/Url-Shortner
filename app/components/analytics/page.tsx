"use client";

import Button from "@/app/ui/button";
import {
  ArrowLeft,
  Ban,
  Calendar,
  Copy,
  Dot,
  ExternalLink,
  Globe,
  Globe2,
  Laptop,
  Monitor,
  MousePointerClick,
  Pencil,
  Smartphone,
} from "lucide-react";
import { useRouter } from "next/navigation";

const AnalyticsPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Header */}
      <div className="h-14 w-full px-5 flex items-center border-b border-gray-200 bg-white font-semibold text-lg shadow-sm">
        Link Analytics
      </div>

      <div className="p-5 flex flex-col gap-5">
        {/* Back Button */}
        <div
          className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-black transition"
          onClick={() => router.push("/components/overview")}
        >
          <ArrowLeft size={16} />
          <span>Back To Overview</span>
        </div>

        {/* Main Link Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          {/* Left */}
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500">Short Link</span>

            <span className="text-2xl font-bold">links/resume.io</span>

            <span className="text-sm text-gray-400">
              Redirects to https://resume.io
            </span>
          </div>

          {/* Right */}
          <div className="flex flex-wrap gap-3">
            {/* Status */}
            <div className="px-2 py-2 flex items-start gap-1 bg-green-100 border border-green-300 rounded-xl">
              <Dot className="text-green-600" size={20} />
              <span className="text-sm font-medium text-green-700">Active</span>
            </div>

            <Button
              buttonText="Copy"
              className="px-4 py-2 bg-white border border-gray-300 text-black flex items-center gap-2 hover:bg-gray-100"
            >
              <Copy size={16} />
            </Button>

            <Button
              buttonText="Edit"
              className="px-4 py-2 bg-white border border-gray-300 text-black flex items-center gap-2 hover:bg-gray-100"
            >
              <Pencil size={16} />
            </Button>

            <Button
              buttonText="Disable"
              className="px-4 py-2 bg-white border border-red-300 text-red-500 flex items-center gap-2 hover:bg-red-50"
            >
              <Ban size={16} />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col gap-2">
            <div className="flex items-center gap-2 text-gray-500">
              <MousePointerClick size={18} />
              <span className="text-sm">Total Clicks</span>
            </div>

            <span className="text-3xl font-bold">1,245</span>

            <span className="text-xs text-green-600">+12% this week</span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col gap-2">
            <div className="flex items-center gap-2 text-gray-500">
              <Globe size={18} />
              <span className="text-sm">Top Country</span>
            </div>

            <span className="text-3xl font-bold">India</span>

            <span className="text-xs text-gray-500">842 clicks</span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col gap-2">
            <div className="flex items-center gap-2 text-gray-500">
              <Monitor size={18} />
              <span className="text-sm">Top Device</span>
            </div>

            <span className="text-3xl font-bold">Desktop</span>

            <span className="text-xs text-gray-500">73% of traffic</span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col gap-2">
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar size={18} />
              <span className="text-sm">Created On</span>
            </div>

            <span className="text-xl font-bold">Apr 28, 2026</span>

            <span className="text-xs text-gray-500">5 days ago</span>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex flex-col gap-1 mb-5">
            <h2 className="text-lg font-semibold">Clicks Over Time</h2>

            <p className="text-sm text-gray-500">
              Track how your link performed over time.
            </p>
          </div>

          {/* Chart Placeholder */}
          <div className="h-75 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 mb-6">
            Chart goes here
          </div>
        </div>
        {/* Analytics Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* By Country */}
          <div className="border-2 bg-white border-gray-200 rounded-2xl p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">By Country</h3>
                <p className="text-sm text-gray-500">
                  Traffic distribution by location
                </p>
              </div>

              <Globe className="text-gray-400" size={20} />
            </div>

            <div className="flex flex-col gap-4">
              {[
                { country: "India", clicks: 842, percentage: "68%" },
                { country: "United States", clicks: 213, percentage: "17%" },
                { country: "Germany", clicks: 96, percentage: "8%" },
                { country: "Canada", clicks: 54, percentage: "4%" },
              ].map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.country}</span>
                    <span className="text-gray-500">{item.clicks} clicks</span>
                  </div>

                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-black h-full rounded-full"
                      style={{ width: item.percentage }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* By Device */}
          <div className="border-2 bg-white border-gray-200 rounded-2xl p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">By Device Type</h3>
                <p className="text-sm text-gray-500">
                  User devices accessing your link
                </p>
              </div>

              <Monitor className="text-gray-400" size={20} />
            </div>

            <div className="flex flex-col gap-4">
              {[
                {
                  icon: <Laptop size={18} />,
                  device: "Desktop",
                  value: "73%",
                },
                {
                  icon: <Smartphone size={18} />,
                  device: "Mobile",
                  value: "22%",
                },
                {
                  icon: <Monitor size={18} />,
                  device: "Tablet",
                  value: "5%",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      {item.icon}
                    </div>

                    <span className="font-medium">{item.device}</span>
                  </div>

                  <span className="text-sm text-gray-500">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Referrers */}
          <div className="border-2 bg-white border-gray-200 rounded-2xl p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Top Referrers</h3>
                <p className="text-sm text-gray-500">
                  Sources sending traffic to your link
                </p>
              </div>

              <ExternalLink className="text-gray-400" size={20} />
            </div>

            <div className="flex flex-col gap-3">
              {[
                {
                  source: "Google Search",
                  clicks: "542 clicks",
                },
                {
                  source: "LinkedIn",
                  clicks: "302 clicks",
                },
                {
                  source: "Twitter / X",
                  clicks: "189 clicks",
                },
                {
                  source: "Direct",
                  clicks: "112 clicks",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-black rounded-full" />

                    <span className="font-medium">{item.source}</span>
                  </div>

                  <span className="text-sm text-gray-500">{item.clicks}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Browser Usage */}
          <div className="border-2 bg-white border-gray-200 rounded-2xl p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">By Browser</h3>
                <p className="text-sm text-gray-500">
                  Browser usage statistics
                </p>
              </div>

              <Globe2 className="text-gray-400" size={20} />
            </div>

            <div className="flex flex-col gap-3">
              {[
                {
                  browser: "Chrome",
                  percentage: "71%",
                },
                {
                  browser: "Safari",
                  percentage: "14%",
                },
                {
                  browser: "Firefox",
                  percentage: "9%",
                },
                {
                  browser: "Edge",
                  percentage: "6%",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3"
                >
                  <span className="font-medium">{item.browser}</span>

                  <span className="text-sm text-gray-500">
                    {item.percentage}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
