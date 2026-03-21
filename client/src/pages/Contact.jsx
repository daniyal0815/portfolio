import { useState } from "react";
import instance from "../api/axiosInstance";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setError("");
    setSuccess("");

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Simple validation
  const validate = () => {
    if (formData.name.length < 2) {
      return "Name must be at least 2 characters";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return "Invalid email address";
    }
    if (formData.message.length < 5) {
      return "Message must be at least 5 characters";
    }
    return null;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      return setError(validationError);
    }

    try {
      setLoading(true);
      setError("");

      await instance.post("/api/contact", formData);

      setSuccess("✅ Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        message: "",
      });

    } catch (error) {
      console.error(error);
      setError("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 pt-32
                 bg-white dark:bg-black
                 text-black dark:text-white"
    >
      <div
        className="w-full max-w-lg
                   bg-white dark:bg-gray-900
                   rounded-2xl shadow-xl p-8
                   border border-gray-200 dark:border-gray-800"
      >
        <h1 className="text-3xl font-bold text-center mb-2">
          Contact Me
        </h1>

        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Let’s build something great together 🚀
        </p>

        {/* Success */}
        {success && (
          <p className="bg-green-100 dark:bg-green-900/40
                        text-green-600 dark:text-green-400
                        text-sm text-center py-2 rounded mb-4">
            {success}
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="bg-red-100 dark:bg-red-900/40
                        text-red-600 dark:text-red-400
                        text-sm text-center py-2 rounded mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name */}
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
              Your Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border
                         bg-white dark:bg-gray-800
                         border-gray-300 dark:border-gray-700
                         focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
              Your Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border
                         bg-white dark:bg-gray-800
                         border-gray-300 dark:border-gray-700
                         focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
              Message
            </label>

            <textarea
              name="message"
              rows="5"
              maxLength="1000"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border resize-none
                         bg-white dark:bg-gray-800
                         border-gray-300 dark:border-gray-700
                         focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />

            {/* Character Counter */}
            <p className="text-xs text-gray-400 mt-1 text-right">
              {formData.message.length}/1000
            </p>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white
                       bg-gradient-to-r from-blue-500 to-purple-600
                       hover:opacity-90 transition
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;