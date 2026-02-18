import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/contact`,
        { headers: { Authorization: token } }
      );

      setContacts(res.data.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;

    try {
      await axios.delete(
        `${API_URL}/api/contact/${id}`,
        { headers: { Authorization: token } }
      );

      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading)
    return <p className="text-center mt-10">Loading messages...</p>;

  return (
    <section className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold">
          Total Messages: {contacts.length}
        </h2>
      </div>

      <div className="max-w-5xl mx-auto space-y-4">
        {contacts.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-white p-5 rounded-lg shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-lg">
                    {contact.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {contact.email}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(contact._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>

              <p className="mt-3">{contact.message}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(contact.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;
