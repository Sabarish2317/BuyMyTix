import React, { useState, useEffect } from "react";
import Layout from "../components/Global/Layout";
import axios from "../utils/axios";
import TickLoader from "../components/Global/LoadingIcon";
import { useProfile } from "../contexts/ProfileContext";
import { toast } from "react-toastify";
import { blockApi } from "../routes/apiRoutes";

interface Report {
  reportId: string;
  reporter: {
    id: string;
    name: string;
    email: string;
  };
  reported: {
    id: string;
    name: string;
    email: string;
  };
  reason: string;
  date: string;
}

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [terminating, setTerminating] = useState<string | null>(null); // Track loading per user

  const { userData, isError, isLoading } = useProfile();

  useEffect(() => {
    if (!isLoading && userData?.type !== "admin") {
      console.log(userData);
      toast.error("You are not authorized to access this page.");
    }
    if (!isLoading && isError) {
      toast.error("An error occured while fetching the data");
    }

    fetchReports();
  }, [userData]);

  const fetchReports = async () => {
    try {
      const response = await axios.get("/api/admin/reports");
      setReports(response.data);
      toast.success(response.data);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  const handleTerminateUser = async (email: string) => {
    if (!window.confirm(`Are you sure you want to terminate ${email}?`)) return;

    setTerminating(email);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        blockApi,
        { blockedEmail: email }, // Body
        {
          headers: {
            authorization: `Bearer ${token}`, // Headers go here
          },
        }
      );

      toast.success(response.data.message || "User terminated successfully");
      setReports(reports.filter((r) => r.reported.email !== email));
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to terminate user");
    } finally {
      setTerminating(null);
    }
  };

  if (isLoading || isLoading) {
    return (
      <Layout className="w-screen h-screen flex justify-center items-center bg-black">
        <TickLoader />
      </Layout>
    );
  }

  if (userData?.type !== "admin") {
    return (
      <Layout className="w-screen h-screen flex justify-center items-center bg-black">
        <div className="text-white text-xl">Unauthorized Access</div>
      </Layout>
    );
  }

  return (
    <Layout className="bg-gradient-to-b from-[#0D0B11] to-[#261349]">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-white">User Reports</h1>

        {loading ? (
          <div className="text-center py-8">Loading reports...</div>
        ) : reports.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No reports found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <div
                key={report.reportId}
                className="bg-gray-800 text-white rounded shadow-md p-4 relative"
              >
                <h2 className="text-lg font-semibold">{report.reason}</h2>

                <div className="mt-2 space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Reporter:</span>{" "}
                    {report.reporter.name} ({report.reporter.email})
                  </p>
                  <p>
                    <span className="font-medium">Reported User:</span>{" "}
                    {report.reported.name} ({report.reported.email})
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(report.date).toLocaleString()}
                  </p>
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleTerminateUser(report.reported.email)}
                    disabled={terminating === report.reported.email}
                    className={`px-3 py-1 text-xs rounded ${
                      terminating === report.reported.email
                        ? "bg-gray-500"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white`}
                  >
                    {terminating === report.reported.email
                      ? "Terminating..."
                      : "Terminate User"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReportsPage;
