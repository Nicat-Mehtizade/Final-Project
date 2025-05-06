import axios from "axios";
import { BASE_URL } from "../../constant";
import { useEffect, useState } from "react";
import getTokenFromCookie from "../../context/services/getTokenFromCookie";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { paymentType } from "../../types/paymentType";
import { MdCreditCard } from "react-icons/md";
import { FiCalendar } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const AdminPaymentsPage = () => {
  const [paymentsInfo, setPaymentsInfo] = useState<paymentType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPayments, setFilteredPayments] = useState<paymentType[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedPayment, setSelectedPayment] = useState<paymentType | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;
  const getPayments = async () => {
    const token = getTokenFromCookie();
    if (!token) {
      console.log("Token not found");
      return;
    }
    try {
      const response = await axios(`${BASE_URL}/payments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPaymentsInfo(response.data.data);
      setFilteredPayments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPayments();
  }, []);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    let filteredData = paymentsInfo;

    if (searchValue) {
      filteredData = filteredData.filter((payment) =>
        payment.billing_details.name
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    }

    if (selectedStatus) {
      filteredData = filteredData.filter(
        (payment) => payment.status === selectedStatus
      );
    }

    setFilteredPayments(filteredData);
    setCurrentPage(1);
  }, [searchValue, selectedStatus, paymentsInfo]);

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredPayments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  console.log(paymentsInfo);

  return (
    <div className="bg-[#24292d] w-full p-5">
      <div>
        <h1 className="font-bold text-white text-3xl py-5">
          Payments Management
        </h1>
        <div className="flex mb-6 space-x-6 justify-center md:justify-start">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search by customer name"
            className="px-5 py-3 rounded-lg bg-[#2f363e] text-white placeholder-gray-400 w-full sm:w-80 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-5 py-3 rounded-lg bg-[#2f363e] text-white w-full sm:w-80 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            <option value="">All Statuses</option>
            <option value="succeeded">Succeeded</option>
            <option value="failed">Failed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="bg-[#2f363e] p-4 rounded-xl shadow-lg min-h-[650px]">
          <table className="min-w-full table-auto text-left text-white">
            <thead>
              <tr className="bg-[#444e56] text-sm uppercase tracking-wider">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-white">
                    No payments found based on the search criteria.
                  </td>
                </tr>
              ) : (
                currentItems.map((q) => {
                  return (
                    <tr
                      key={q.id}
                      className="border-b border-gray-600 font-semibold"
                    >
                      <td className="px-6 py-4 text-sm">
                        {q.payment_intent.slice(0, 8) + "..."}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(q.created * 1000).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {q.billing_details.name}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        ${(q.amount / 100).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`py-1 rounded-full w-20 text-center inline-block text-white text-xs font-medium ${
                            q.status === "succeeded"
                              ? "bg-green-500"
                              : q.status === "failed"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          {q.status.slice(0, 1).toUpperCase() +
                            q.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => {
                            setSelectedPayment(q);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <MdOutlineRemoveRedEye size={20} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index + 1)}
                className={`px-3 py-1 rounded cursor-pointer ${
                  currentPage === index + 1 ? "bg-blue-500" : "bg-gray-700"
                } text-white text-sm`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && selectedPayment && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
          <div className="bg-white rounded-lg p-6 w-[700px] text-black relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
            >
              <IoClose className="text-2xl"/>
            </button>
            <div className="mb-5">
              <h2 className="text-2xl font-semibold">Payment Details</h2>
              <p className="text-sm text-gray-500">
                Complete information about this payment transaction
              </p>
            </div>
            <div className="bg-gray-100 rounded-xl py-2 px-4 flex justify-between items-center">
              <div>
                <h1 className="text-gray-500 font-semibold">Payment ID</h1>
                <p className="text-sm">{selectedPayment.payment_intent}</p>
              </div>
              <div>
                <h1 className="text-gray-500 font-semibold">Amount</h1>
                <p className="font-bold text-xl">
                  {(selectedPayment.amount / 100).toFixed(2)}₼
                </p>
              </div>
              <div>
                <h1 className="text-gray-500 font-semibold mb-1">Status</h1>
                <p
                  className={`rounded-full text-center text-white px-3 ${
                    selectedPayment.status === "succeeded"
                      ? "bg-green-500"
                      : selectedPayment.status === "failed"
                      ? "bg-red-500"
                      : "bg-gray-500"
                  }`}
                >
                  {selectedPayment.status}
                </p>
              </div>
            </div>
            <div className="border-b border-gray-300 py-6">
              <h1 className="text-xl font-semibold mb-4">
                Payment Information
              </h1>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-start">
                  <MdCreditCard className="text-2xl mt-0.5 text-gray-500" />
                  <div>
                    <h1 className="font-semibold">Payment Method</h1>
                    <p className="text-gray-500 font-semibold">
                      {selectedPayment.payment_method_details.card.brand.toUpperCase()}{" "}
                      **** {selectedPayment.payment_method_details.card.last4}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <FiCalendar className="text-2xl mt-0.5 text-gray-500" />
                  <div>
                    <h1 className="font-semibold">Date</h1>
                    <p className="text-gray-500 font-semibold">
                      {new Date(
                        selectedPayment.created * 1000
                      ).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-6">
              <h1 className="text-xl font-semibold mb-4">
                Customer Information
              </h1>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-start">
                  <LuUser className="text-2xl mt-0.5 text-gray-500" />
                  <div>
                    <h1 className="font-semibold">Name</h1>
                    <p className="text-gray-500 font-semibold">
                      {selectedPayment.billing_details.name}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <MdOutlineEmail className="text-2xl mt-0.5 text-gray-500" />
                  <div>
                    <h1 className="font-semibold">Email</h1>
                    <p className="text-gray-500 font-semibold">
                      {selectedPayment.billing_details.email}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <IoTicketOutline className="text-2xl mt-0.5 text-gray-500"/>
                  <div>
                    <h1 className="font-semibold">Quantity</h1>
                    <p className="text-gray-500 font-semibold">{selectedPayment.metadata.total_tickets}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPaymentsPage;
