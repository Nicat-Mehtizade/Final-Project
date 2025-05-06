import axios from "axios";
import { useEffect, useState } from "react";
import userType from "../../types/userType";
import { BASE_URL } from "../../constant";
import getTokenFromCookie from "../../context/services/getTokenFromCookie";
import { FaUserLarge } from "react-icons/fa6";
import { RiSettings4Line } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";

const AdminUsersPage = () => {
  const [users, getUsers] = useState<userType[]>([]);

  const getAllUsers = async () => {
    const token = getTokenFromCookie();
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
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="bg-[#24292d] w-full p-5 h-screen">
      <div>
        <h1 className="text-white font-bold text-3xl py-5 mb-3">
          User Management
        </h1>
        <div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">User Role</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => {
                  return (
                    <tr key={user._id} className="border-b border-gray-700">
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
                        <p>{user.role}</p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2 items-center text-lg">
                          <button className="flex items-center gap-2 cursor-pointer text-blue-400 hover:text-blue-300">
                            <RiSettings4Line />
                            <p>Modify Roles</p>
                          </button>
                          <button className="flex items-center gap-2 cursor-pointer text-red-400 hover:text-red-300">
                            <TiDelete className="text-xl" />
                            <p>Delete</p>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
