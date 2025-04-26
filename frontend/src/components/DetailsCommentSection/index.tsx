import getTokenFromCookie from "../../context/services/getTokenFromCookie";
import { BASE_URL } from "../../constant";
import axios from "axios";
import { useEffect, useState } from "react";
import userType from "../../types/userType";
import { FaUserLarge } from "react-icons/fa6";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { Activity } from "../../types/activityType";
import toast, { Toaster } from "react-hot-toast";
import { Comment } from "../../types/commentType";
import { BsThreeDots } from "react-icons/bs";

const DetailsCommentSection = ({
  activity,
  user,
}: {
  activity: Activity;
  user: userType | null;
}) => {
  const controls = useAnimation();
  const [isFocused, setIsFocused] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [showOptions, setShowOptions] = useState<string | null>(null);
  const handleFocus = () => {
    setIsFocused(true);
    controls.start({ height: 150 });
  };

  const handleBlur = () => {
    setIsFocused(false);
    controls.start({ height: 50 });
  };

  const getAllComments = async () => {
    try {
      const response = await axios(
        `${BASE_URL}/comments?activityId=${activity._id}`
      );
      // console.log(response.data.data);
      setAllComments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const handleComment = async () => {
    const token = getTokenFromCookie();
    if (!token) {
      toast.error("You need to be logged in to comment.");
      setComment("");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/comments`,
        {
          text: comment,
          userId: user?._id,
          activity: activity._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getAllComments();
      setComment("");
      toast.success("Your comment has been successfully added!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const token = getTokenFromCookie();
    if (!token) {
      toast.error("You need to be logged in to delete a comment.");
      return;
    }

    try {
      await axios.delete(`${BASE_URL}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAllComments();
      toast.success("Your comment has been deleted successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete the comment.");
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-3xl font-bold mb-10">Comments</h1>
      <div className="max-w-[900px] mx-auto">
        <div className="border-b border-gray-300">
          <div className="flex items-center gap-3 mb-3">
            {user?.image ? (
              <img
                className="w-10 h-10 rounded-full"
                src={user?.image}
                alt=""
              />
            ) : (
              <p>
                {" "}
                <FaUserLarge
                  className={`bg-yellow-300 w-12 h-12 p-3 rounded-full text-black
                              }`}
                />
              </p>
            )}
            <p className="font-semibold">{user?.username}</p>
          </div>
          <div className="relative mb-5">
            <motion.textarea
              initial={{ height: 100 }}
              animate={controls}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-gray-100 rounded-lg p-3 w-full resize-none outline-none"
              placeholder="What are your thoughts?"
            />
            <AnimatePresence>
              {isFocused && (
                <div>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={handleComment}
                    className="absolute bottom-3 right-3 bg-gray-400 cursor-pointer text-white px-4 py-2 rounded-full"
                  >
                    Respond
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setIsFocused(false)}
                    className="absolute bottom-3 right-28 text-black cursor-pointer px-4 py-2 rounded-full"
                  >
                    Cancel
                  </motion.button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="mt-10 space-y-8">
          {allComments.map((comment) => (
            <div
              key={comment._id}
              className="border-b pb-5 flex justify-between"
            >
              <div className="">
                <div className="flex items-center gap-4 mb-3">
                  {comment.userId?.image ? (
                    <img
                      src={comment.userId.image}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <FaUserLarge className="bg-yellow-300 w-10 h-10 p-2 rounded-full text-black" />
                  )}
                  <div>
                    <p className="font-semibold">{comment.userId?.username}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>
                <p className="text-gray-800 ml-14">{comment.text}</p>
              </div>

              <div className="relative">
                {user?._id === comment.userId._id && (
                  <button
                    onClick={() =>
                      setShowOptions(
                        showOptions === comment._id ? null : comment._id
                      )
                    }
                    className="text-gray-500 hover:text-gray-800"
                  >
                    <BsThreeDots />
                  </button>
                )}

                {showOptions === comment._id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md z-10"
                  >
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                    >
                      Delete
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsCommentSection;
