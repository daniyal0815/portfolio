import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: token,
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  // ✅ Fetch Messages
  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/contact?search=${search}&isRead=${
          filter === "all" ? "" : filter === "read"
        }`,
        { headers }
      );

      setContacts(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Fetch Stats
  const fetchStats = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/contact/stats/overview`,
        { headers }
      );
      setStats(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await axios.delete(`${API_URL}/api/contact/${id}`, { headers });
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Mark as Read
  const markAsRead = async (id) => {
    try {
      await axios.put(`${API_URL}/api/contact/${id}/read`, {}, { headers });

      setContacts((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, isRead: true } : c
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Promise.all([fetchMessages(), fetchStats()]).finally(() =>
      setLoading(false)
    );
  }, [search, filter]);

  if (loading)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-black p-6 text-black dark:text-white">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded text-white"
        >
          Logout
        </button>
      </div>

      {/* 🔥 STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow">
          <p className="text-sm text-gray-400">Total</p>
          <h2 className="text-xl font-bold">{stats.total || 0}</h2>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow">
          <p className="text-sm text-gray-400">Unread</p>
          <h2 className="text-xl font-bold">{stats.unread || 0}</h2>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow">
          <p className="text-sm text-gray-400">Today</p>
          <h2 className="text-xl font-bold">{stats.today || 0}</h2>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow">
          <p className="text-sm text-gray-400">This Week</p>
          <h2 className="text-xl font-bold">{stats.week || 0}</h2>
        </div>
      </div>

      {/* 🔍 SEARCH + FILTER */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border dark:bg-zinc-900"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border dark:bg-zinc-900"
        >
          <option value="all">All</option>
          <option value="true">Read</option>
          <option value="false">Unread</option>
        </select>
      </div>

      {/* 📩 MESSAGES */}
      <div className="space-y-4 max-w-5xl mx-auto">
        {contacts.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          contacts.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-zinc-900 p-5 rounded-xl shadow border dark:border-zinc-800"
            >
              <div className="flex justify-between">
                
                <div>
                  <h2 className="font-semibold text-lg">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {item.email}
                  </p>
                </div>

                <div className="flex gap-2">
                  
                  {!item.isRead && (
                    <button
                      onClick={() => markAsRead(item._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Mark Read
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Message */}
              <p className="mt-3 text-gray-700 dark:text-gray-300">
                {item.message}
              </p>

              {/* Status */}
              <div className="flex justify-between items-center mt-3">
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    item.isRead
                      ? "bg-green-500 text-white"
                      : "bg-yellow-400 text-black"
                  }`}
                >
                  {item.isRead ? "Read" : "Unread"}
                </span>

                <p className="text-xs text-gray-400">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;