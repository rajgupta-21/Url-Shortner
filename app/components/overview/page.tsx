"use client";
import { useApiCall } from "@/app/hooks/apicallhook";
import Card from "@/app/ui/card";
import BarChart from "@/app/ui/chart";

const OverviewPage = () => {
  const { data, error, loading } = useApiCall(`/api/clicksPerLink`, {
    method: "GET",
    credentials: "include",
  });

  if (loading) return <div className="p-4">Loading...</div>;
  if (error)
    return <div className="p-4 text-red-500">Something went wrong</div>;

  const item = [
    {
      name: "Total Clicks",
      total: data?.totalClicks || 0,
      week: "All time",
    },
    {
      name: "Top Country",
      total: data?.clicksPerCountry?.[0]?.count || 0,
      week: data?.clicksPerCountry?.[0]?._id || "N/A",
    },
    {
      name: "Top Device",
      total: data?.clicksPerDevice?.[0]?.count || 0,
      week: data?.clicksPerDevice?.[0]?._id || "N/A",
    },
    {
      name: "Tracked Days",
      total: data?.clicksPerDay?.length || 0,
      week: "days",
    },
  ];

  return (
    <div className="text-black">
      <div className="h-13 w-full p-3 border-b-2 border-gray-200 bg-white font-bold text-md">
        Overview
      </div>

      <Card items={item} />

      <div className="m-4 h-96 border-2 border-gray-200 p-4 bg-white rounded-xl ">
        <BarChart />
      </div>
      <div>linksCard</div>
    </div>
  );
};

export default OverviewPage;
