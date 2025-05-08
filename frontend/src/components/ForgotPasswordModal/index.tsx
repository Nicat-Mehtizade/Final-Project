import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from "../../constant";
import toast from 'react-hot-toast';

type ForgotPasswordModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const ForgotPasswordModal = ({ isOpen, closeModal }: ForgotPasswordModalProps) => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/forgot-password`, { email });
      if (response.data.message === "Reset email sent successfully") {
        closeModal();
        toast.success("Password reset email has been sent.");
      } else {
        toast.error("Failed to send reset email. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <div className="flex flex-col gap-4">
          <label htmlFor="email" className="font-semibold">Enter your email address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="border p-2 rounded-lg border-gray-400"
            required
          />
          <button 
            type="button" 
            onClick={handleForgotPassword} 
            className="bg-yellow-500 text-white py-2 rounded-lg cursor-pointer"
          >
            Reset Password
          </button>
          <button
            type="button"
            className="text-red-500 mt-4 text-center cursor-pointer"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
