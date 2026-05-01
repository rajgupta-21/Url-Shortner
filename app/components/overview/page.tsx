"use client";
import { useApiCall } from "@/app/hooks/apicallhook";
import Card from "@/app/ui/card";
import BarChart from "@/app/ui/chart";
import MylinksTable, { LinkItem } from "@/app/ui/mylinks";
import { useEffect, useState } from "react";

const OverviewPage = () => {
  const { data, error, loading } = useApiCall(`/api/clicksPerLink`, {
    method: "GET",
    credentials: "include",
  });

  const [urlData, setUrlData] = useState<LinkItem[]>([]);
  const [urlError, setUrlError] = useState("");
  const [urlLoading, setUrlLoading] = useState(false);
  useEffect(() => {
    const Fetchdata = async () => {
      try {
        setUrlLoading(true);
        const data = await fetch("/api/get-user-links", {
          method: "GET",
          credentials: "include",
        });
        const response = await data.json();
        setUrlData(response.links);
        setUrlLoading(false);
        console.log(response);
      } catch (err) {
        setUrlError("Failed to fetch data");
        setUrlLoading(false);
        console.error("Failed to fetch data", err);
      }
    };
    Fetchdata();
  }, [data]);
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
      <div className="p-4  ">
        {urlError && <div className="text-red-500 mb-4">{urlError}</div>}
        {urlLoading ? <div>Loading...</div> : <MylinksTable links={urlData} />}
      </div>
    </div>
  );
};

export default OverviewPage;
