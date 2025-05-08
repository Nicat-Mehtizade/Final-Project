import axios from "axios";
import { useEffect, useState } from "react";
import userType from "../../types/userType";
import { BASE_URL } from "../../constant";
import getTokenFromCookie from "../../context/services/getTokenFromCookie";
import { FaUserLarge } from "react-icons/fa6";
import { RiSettings4Line } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";
import { AnimatePresence, motion } from "motion/react";
import { IoSearch } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import JwtType from "../../types/jwtType";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from 'sweetalert2';

const AdminUsersPage = () => {
  const [users, getUsers] = useState<userType[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<userType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const token = getTokenFromCookie();
  const getAllUsers = async () => {
    if (!token) {
      console.log("Token not found");
      return;
    }
    try {
      const response = await axios(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getUsers(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(inputValue.toLowerCase().trim())
    );
    setFilteredUsers(filtered);
  }, [inputValue, users]);

  const handleDeleteUser = async (id?: string) => {
    if (!token) {
      toast.error("Authentication token not found.", {
        style: {
          backgroundColor: "#ef4444",
          color: "white",
          fontWeight: "700",
          borderRadius: "12px",
        },
      });
      return;
    }
  
    if (!id) {
      toast.error("User ID is missing. Cannot delete the user.", {
        style: {
          backgroundColor: "#ef4444",
          color: "white",
          fontWeight: "700",
          borderRadius: "12px",
        },
      });
      return;
    }
  
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: "#2f363e",
      color: "#fff"
    });
  
    if (result.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted.",
          icon: "success",
          background: "#2f363e",
          color: "#fff",
          confirmButtonColor: "#facc15",
        });
  
        getAllUsers();
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong during deletion.", {
          style: {
            backgroundColor: "#ef4444",
            color: "white",
            fontWeight: "700",
            borderRadius: "12px",
          },
        });
      }
    }
  };
  

  const handleRoleChange = async (id?: string, newRole?: string) => {
    if (!token) {
      toast.error("Authentication token not found.");
      return;
    }
    try {
      await axios.patch(
        `${BASE_URL}/users/${id}`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User role updated successfully.");

      if (id === jwtDecode<JwtType>(token).id) {
        document.cookie =
          "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/login";
        return;
      }
      setEditingUserId(null);
      getAllUsers();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user role.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen bg-[#24292d] z-50">
        <div className="relative w-[150px] h-[150px]">
          <ClipLoader
            loading={isLoading}
            size={150}
            color="#facc15"
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <img
            src="/1234-removebg-preview.png"
            alt="Logo"
            className="absolute top-1/2 left-1/2 w-23 h-23 object-contain transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#24292d] w-full p-5 h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-between items-center"
        >
          <h1 className="text-white font-bold text-3xl py-5 mb-3">
            User Management
          </h1>
          <div className="flex items-center w-[25%] justify-between bg-white py-2 px-3 rounded-xl">
            <input
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              placeholder="Search User"
              className="focus:outline-0"
            />
            <IoSearch className="text-gray-500 text-xl" />
          </div>
        </motion.div>
        <div className="bg-[#2f363e] p-4 rounded-xl shadow-lg">
          <motion.table
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full bg-[#2f363e] rounded-xl text-left min-w-full table-auto text-white"
          >
            <motion.thead
              initial={{ opacity: 0}}
              animate={{ opacity: 1}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <tr className="border-b  bg-[#444e56] text-sm uppercase tracking-wider">
                <th className="px-3 py-4">Name</th>
                <th className="py-3 px-4">User Role</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </motion.thead>
            <tbody>
              <AnimatePresence>
                {filteredUsers.length === 0 ? (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td colSpan={3} className="text-center text-white py-6">
                      No users found matching your search.
                    </td>
                  </motion.tr>
                ) : (
                  filteredUsers.map((user, index) => {
                    return (
                      <motion.tr
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                        key={user._id}
                        className="border-b border-gray-400 last:border-b-0"
                      >
                        <td className="flex items-center gap-3 py-4 px-4">
                          {user.image ? (
                            <img
                              className="w-12 h-12 rounded-full"
                              src={user.image}
                              alt=""
                            />
                          ) : (
                            <FaUserLarge className="bg-yellow-300 w-12 h-12 p-3 rounded-full cursor-pointer text-black" />
                          )}
                          <div>
                            <p className="font-bold text-white">
                              {user.username}
                            </p>
                            <p className="font-semibold text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p
                            className={`rounded-full text-center w-16 text-white font-semibold ${
                              user.role == "admin"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                          >
                            {user.role.slice(0, 1).toUpperCase() +
                              user.role.slice(1)}
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-3 items-center text-lg">
                            {editingUserId === user._id ? (
                              <div className="flex items-center gap-2">
                                <select
                                  value={selectedRole}
                                  onChange={(e) =>
                                    setSelectedRole(e.target.value)
                                  }
                                  className="bg-gray-700 text-white px-2 py-1 rounded-md"
                                >
                                  <option value="user">User</option>
                                  <option value="admin">Admin</option>
                                </select>
                                <button
                                  onClick={() =>
                                    handleRoleChange(user._id, selectedRole)
                                  }
                                  className="bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded-md"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingUserId(null)}
                                  className="bg-gray-500 hover:bg-gray-400 text-white px-3 py-1 rounded-md"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setEditingUserId(user._id!);
                                  setSelectedRole(user.role);
                                }}
                                className="flex items-center gap-2 cursor-pointer text-blue-400 hover:text-blue-300"
                              >
                                <RiSettings4Line />
                                <p>Modify Roles</p>
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="flex items-center gap-2 cursor-pointer text-red-400 hover:text-red-300"
                            >
                              <TiDelete className="text-xl" />
                              <p>Delete</p>
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </AnimatePresence>
            </tbody>
          </motion.table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
