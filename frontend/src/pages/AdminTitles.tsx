import React, { useState, useEffect } from "react";
import Layout from "../components/Global/Layout";
import TopNavigationBar from "../components/Global/TopNavigationBar";
import { useProfile } from "../contexts/ProfileContext";
import TickLoader from "../components/Global/LoadingIcon";
import { toast } from "react-toastify";
import axios from "../utils/axios";
import imageCompression from "browser-image-compression";
import { ProfileResponse } from "@/types/Profile";

interface Title {
  _id: string;
  title: string;
  description: string;
  poster: string;
  type: "Movie" | "Sport" | "Event";
  year: string;
  source?: string;
  rating?: string;
  imdbID?: string;
}

const AdminTitles: React.FC = () => {
  const [titles, setTitles] = useState<Title[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [editingTitle, setEditingTitle] = useState<Title | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { userData, isError, isLoading } = useProfile();

  // Fetch titles based on filters and pagination
  const fetchTitles = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await axios.get("/api/admin/titles", {
        params: {
          page,
          limit: 6,
          type: selectedType || undefined,
          search: searchTerm || undefined,
        },
      });
      setTitles(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch titles:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData?.type !== "admin" && !isLoading) {
      toast.error("You are not authorized to access this page.");
    }

    if (isError && !isLoading) {
      toast.error("An error occurred while fetching profile.");
    }

    fetchTitles(currentPage);
  }, [selectedType, searchTerm, currentPage, userData]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const openEditModal = (title: Title) => {
    setEditingTitle({ ...title });
  };

  const closeEditModal = () => {
    setEditingTitle(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (!editingTitle) return;
    setEditingTitle({
      ...editingTitle,
      [name]: value,
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingTitle) return;

    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.onload = () => {
        setEditingTitle({
          ...editingTitle,
          poster: reader.result as string,
        });
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  };

  const handleUpdateTitle = async () => {
    if (!editingTitle) return;

    try {
      await axios.put(`/api/admin/titles/${editingTitle._id}`, editingTitle);
      fetchTitles(currentPage);
      closeEditModal();
      toast.success("Title updated successfully!");
    } catch (error) {
      console.error("Error updating title:", error);
      toast.error("Failed to update title");
    }
  };

  const handleDeleteTitle = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this title?")) return;

    try {
      await axios.delete(`/api/admin/titles`, {
        data: { id },
      });
      fetchTitles(currentPage);
      toast.success("Title deleted successfully!");
    } catch (error) {
      console.error("Error deleting title:", error);
      toast.error("Failed to delete title");
    }
  };

  if (isLoading) {
    return (
      <Layout
        className="w-screen h-screen flex justify-center items-center bg-black"
        isHomePage={true}
      >
        <TickLoader />
      </Layout>
    );
  }

  if (userData?.type !== "admin" && !isLoading) {
    return (
      <Layout
        className="w-screen h-screen flex justify-center items-center bg-black"
        isHomePage={true}
      >
        <div className="text-white text-xl">Unauthorized Access</div>
      </Layout>
    );
  }

  return (
    <Layout className="bg-gradient-to-b from-[#0D0B11] to-[#261349]">
      <TopNavigationBar
        userData={userData || ({} as ProfileResponse)}
        delay={0.2}
      />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-white">Manage Titles</h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border rounded p-2 bg-white"
          >
            <option value="">All Types</option>
            <option value="Movie">Movie</option>
            <option value="Sport">Sport</option>
            <option value="Event">Event</option>
          </select>
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded p-2 flex-grow bg-white"
          />
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-8 align-middle justify-center">
            <TickLoader />
          </div>
        ) : (
          <>
            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {titles.map((title) => (
                <div
                  key={title._id}
                  className="relative group bg-gray-800 text-white rounded overflow-hidden shadow-md transition-transform transform hover:scale-105"
                >
                  <img
                    src={title.poster}
                    alt={title.title}
                    className="w-full h-48 object-cover"
                  />

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-4">
                    <h2 className="text-lg font-semibold">{title.title}</h2>
                    <p className="text-sm text-gray-300 truncate w-full text-center mt-1">
                      {title.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {title.type} • {title.year}
                    </p>
                    <div className="mt-3 flex space-x-2">
                      <button
                        onClick={() => openEditModal(title)}
                        className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTitle(title._id)}
                        className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  disabled={currentPage === i + 1}
                  className={`px-3 py-1 border rounded ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100 bg-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Edit Modal */}
        {editingTitle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Edit Title</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateTitle();
                }}
              >
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editingTitle.title}
                    onChange={handleInputChange}
                    className="border rounded w-full p-2"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={editingTitle.description}
                    onChange={handleInputChange}
                    className="border rounded w-full p-2"
                    rows={2}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Poster Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border rounded w-full p-2"
                  />
                  {editingTitle.poster && (
                    <img
                      src={editingTitle.poster}
                      alt="Preview"
                      className="mt-2 h-32 object-contain border rounded"
                    />
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    name="type"
                    value={editingTitle.type}
                    onChange={handleInputChange}
                    className="border rounded w-full p-2"
                    required
                  >
                    <option value="Movie">Movie</option>
                    <option value="Sport">Sport</option>
                    <option value="Event">Event</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Year</label>
                  <input
                    type="text"
                    name="year"
                    value={editingTitle.year}
                    onChange={handleInputChange}
                    className="border rounded w-full p-2"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminTitles;
