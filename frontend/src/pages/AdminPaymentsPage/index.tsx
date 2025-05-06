import axios from "axios";
import { BASE_URL } from "../../constant";
import { useEffect, useState } from "react";
import getTokenFromCookie from "../../context/services/getTokenFromCookie";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const AdminPaymentsPage = () => {
  const [paymentsInfo, setPaymentsInfo] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPayments, setFilteredPayments] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
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
                        <button className="text-blue-400 hover:text-blue-300">
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
    </div>
  );
};

export default AdminPaymentsPage;
