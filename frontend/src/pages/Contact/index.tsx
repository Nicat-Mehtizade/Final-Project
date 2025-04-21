import { motion } from "framer-motion";
import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BsSend } from "react-icons/bs";
import { FaRegEnvelope } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import styles from "./index.module.css";
const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm("service_bobjw48", "template_b6eodnj", form.current, {
        publicKey: "kUSUW87y0B9D3TMtO",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          toast.success("Message sent successfully.!", {
            duration: 2000,
          });
          form.current?.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error(
            "There was a problem sending the message, Please try again.",
            {
              duration: 2000,
            }
          );
        }
      );
  };
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-center gap-5 justify-evenly  flex-wrap py-15 ">
          <div className="flex flex-col items-center w-full lg:w-[45%]">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
              className="bg-[#FFF085] rounded-full w-16 h-16 flex justify-center items-center mb-5"
            >
              <FaRegEnvelope className="text-4xl text-yellow-500" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
              className="text-4xl font-bold mb-3"
            >
              Get in Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
              className="text-gray-500 text-lg mb-8"
            >
              Have a question or feedback? We'd love to hear from you.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
              className="shadow-[2px_2px_12px_rgba(0,0,0,0.35)] rounded-lg relative"
            >
              <div className="border-b-1 border-yellow-300 ">
                <div className={styles.yellowLine}></div>
                <h1 className="font-bold text-2xl mb-2 p-4">Contact Us</h1>
                <p className="text-gray-600 mb-3 px-4 font-semibold">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>
              <motion.form
                ref={form}
                onSubmit={sendEmail}
                className="flex flex-col p-4 border-b-1 border-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
              >
                <label className="font-semibold" htmlFor="name">
                  Name
                </label>
                <motion.input
                  className="border border-gray-400 p-2 rounded-lg mb-4 focus:outline-0 focus:border-yellow-300"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.4, ease: "easeOut" }}
                />
                <label className="font-semibold" htmlFor="email">
                  Email
                </label>
                <motion.input
                  className="border border-gray-400 p-2 rounded-lg mb-4 focus:outline-0 focus:border-yellow-300"
                  type="text"
                  name="email"
                  placeholder="your.email@example.com"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.7, duration: 0.4, ease: "easeOut" }}
                />
                <label className="font-semibold" htmlFor="message">
                  Message
                </label>
                <motion.textarea
                  className="border min-h-[150px] border-gray-400 p-2 focus:outline-0 rounded-lg mb-4 focus:border-yellow-300"
                  name="message"
                  placeholder="Tell us what you're thinking about..."
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.9, duration: 0.4, ease: "easeOut" }}
                />
                <button className="bg-[#fde047] w-full cursor-pointer py-2 rounded-lg font-semibold flex justify-center items-center gap-1">
                  <p>Send Message</p> <BsSend className="mt-1" />
                </button>
              </motion.form>
            </motion.div>
          </div>
          <div className="border border-gray-200 rounded-xl w-full lg:w-[45%] mt-10 pt-2">
            <div className="md:flex justify-between gap-5 p-4 ">
              <div className="md:w-[33%]">
                <h3 className="text-gray-400 text-sm mb-2">Head Office</h3>
                <p className="text-sm">
                  AF Mall 14th floor, office 36 Azerbaijan, Baku, Samad Vurgun
                  34, AZ1014
                </p>
              </div>
              <div className="md:w-[33%]">
                <h3 className="text-gray-400 text-sm mb-2">Phone</h3>
                <p className="text-sm">+994 12 424-24-24</p>
              </div>
              <div className="md:w-[33%]">
                <h3 className="text-gray-400 text-sm mb-2">
                  You can send all comments and suggestions to:
                </h3>
                <p className="text-sm">info@iticket.az</p>
              </div>
            </div>
            <motion.iframe
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.459074957755!2d49.83908007582527!3d40.37651697144612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307da5a4c85e9f%3A0x8b209a8e1ed5eea9!2sAF%20Mall!5e0!3m2!1sen!2saz!4v1745260153394!5m2!1sen!2saz"
              loading="lazy"
              className="w-full h-[250px] rounded-b-xl"
            ></motion.iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
