import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constant";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate(); // navigate hook-u
  const [token, setToken] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tokenFromUrl: string | null = urlParams.get("token");
    setToken(tokenFromUrl);
  }, [location]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      console.log("Token is missing.");
      return;
    }

    if (newPassword !== confirmPassword) {
      console.log("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/reset-password?token=${token}`,
        { newPassword }
      );
      console.log("Backend cavab:", response.data);

      if (response.data.message === "Password reset successfully.") {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        return;
      } else {
        setError(response.data.message || "Failed to reset password.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh] bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Reset Your Password
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success ? (
          <p className="text-green-500 text-center mb-4">
            Your password has been successfully reset!
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-medium"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
