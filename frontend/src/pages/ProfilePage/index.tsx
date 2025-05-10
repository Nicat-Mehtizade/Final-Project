import axios from "axios";
import getTokenFromCookie from "../../context/services/getTokenFromCookie";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../../constant";
import { useEffect, useState } from "react";
import JwtType from "../../types/jwtType";
import userType from "../../types/userType";
import { FaUser } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const ProfilePage = () => {
  const [user, setUser] = useState<userType | null>(null);
  const [updatedUser, setUpdatedUser] = useState({
    email: "",
    username: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const token=getTokenFromCookie()

  const getUser = async () => {
    const token = getTokenFromCookie();
    if (!token) {
      console.log("Token not found");
      return;
    }
    const decoded = jwtDecode<JwtType>(token);

    try {
      const response = await axios(`${BASE_URL}/users/${decoded.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.data);
      setUpdatedUser({
        email: response.data.data.email,
        username: response.data.data.username,
        image: response.data.data.image || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedUser({ ...updatedUser, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then(async(result) => {
      if (result.isConfirmed) {
        const token = getTokenFromCookie();
        if (!token) {
          console.log("Token not found");
          return;
        }
        console.log(updatedUser);
    
        const formData = new FormData();
        formData.append("username", updatedUser.username);
        formData.append("email", updatedUser.email);
    
        if (imageFile) {
          formData.append("image", imageFile);
        }
        try {
          const response = await axios.patch(
            `${BASE_URL}/users/${user?._id}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log(response.data.data);
          getUser();
        } catch (error) {
          console.log(error);
        }
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const handleDeleteAcc=async(id:string)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${BASE_URL}/users/${id}`,
            {headers:{
              Authorization:`Bearer ${token}`
            }}
          )
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

          setTimeout(()=>{
            window.location.href="/"
          },2000)
        } catch (error) {
          console.log(error);
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"

        });
      }
    });
  }

  return (
    <div className="py-8 w-full">
      <h1 className="text-3xl font-semibold">Personal Data</h1>
      <div className="p-5">
        <div className="mb-5">
          <label htmlFor="imageInput" className="relative inline-block group">
            {user?.image ? (
              <div>
                <img
                  className="w-35 h-35 rounded-full cursor-pointer group-hover:opacity-60"
                  src={user?.image}
                  alt="profile photo"
                />
                <IoMdImages className="absolute cursor-pointer text-5xl hidden group-hover:block top-0 left-0 right-0 bottom-0 m-auto" />
              </div>
            ) : (
              <div className="bg-[#A9A9A9] rounded-full group-hover:opacity-60 cursor-pointer group-hover:bg-gray-500 w-35 h-35 flex justify-center items-center relative">
                <FaUser className="text-white text-7xl" />
                <IoMdImages className="absolute text-5xl cursor-pointer hidden group-hover:block top-0 left-0 right-0 bottom-0 m-auto" />
              </div>
            )}
            <input
              type="file"
              className="hidden"
              id="imageInput"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>

          <input
            type="file"
            className="hidden"
            id="imageInput"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-4 mb-5">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-gray-500 font-semibold">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, username: e.target.value })
              }
              value={updatedUser.username}
              className="border border-gray-300 rounded-lg p-2 focus:outline-0 focus:bg-gray-100"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-500 font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, email: e.target.value })
              }
              value={updatedUser.email}
              className="border border-gray-300 rounded-lg p-2 focus:outline-0 focus:bg-gray-100"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-3 justify-between py-3">
          <button
            onClick={handleSaveChanges}
            className="bg-yellow-300 font-bold py-3 rounded-lg lg:w-[45%] text-xl cursor-pointer"
          >
            Save Changes
          </button>
          <button onClick={() => user?._id && handleDeleteAcc(user._id)} className="bg-[#9CA3AF] text-white font-bold text-lg py-1 cursor-pointer px-5 rounded-lg hover:bg-red-500">
            Delete my account
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
