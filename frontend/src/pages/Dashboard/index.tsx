import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constant";
import { Calendar, CreditCard, DollarSign, Users } from "lucide-react";
import userType from "../../types/userType";
import getTokenFromCookie from "../../context/services/getTokenFromCookie";
import { useGetActivitiesQuery } from "../../redux/services/activity";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { Tickets } from "lucide-react";
const Dashboard = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [paymentsInfo, setPaymentsInfo] = useState<any[]>([]);
  const [users, setUsers] = useState<userType[] | null>(null);
  const { data: allActivities } = useGetActivitiesQuery({});

  const stripeBalance = async () => {
    try {
      const response = await axios(`${BASE_URL}/balance`);
      setTotalBalance(response.data.pending[0].amount);
    } catch (error) {
      console.log(error);
    }
  };

  const stripePayments = async () => {
    try {
      const response = await axios(`${BASE_URL}/payments`);
      console.log(response.data.data);
      setPaymentsInfo(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    const token = getTokenFromCookie();
    if (!token) {
      console.log("Token not found");
    }
    try {
      const response = await axios(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    stripeBalance();
    stripePayments();
    getUsers();
  }, []);

  const revenueData = paymentsInfo.map((q, index) => ({
    name: `Payment ${index + 1}`,
    revenue: q.amount / 100,
  }));
  return (
    <div className="bg-[#24292d] w-full p-5">
      <div>
        <h1 className="text-white font-bold text-3xl mb-5 py-5">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-10  justify-center gap-5">
          <div className="bg-gradient-to-l p-3 from-green-400 to-emerald-500 rounded-xl flex items-center justify-between  py-5">
            <div>
              <p className="text-white text-3xl font-semibold">Total Revenue</p>
              <p className="text-white text-lg font-medium">
                {(totalBalance / 100).toFixed(2)} ₼
              </p>
            </div>
            <div className="p-3 bg-white/20 rounded-full">
              <DollarSign className="text-white" size={28} />
            </div>
          </div>
          <div className="bg-gradient-to-l p-3 from-purple-400 to-indigo-500 rounded-xl flex items-center justify-between  py-5">
            <div>
              <p className="text-white text-3xl font-semibold">Total Payment</p>
              <p className="text-white text-lg font-medium">
                {paymentsInfo && paymentsInfo.length}
              </p>
            </div>
            <div className="p-3 bg-white/20 rounded-full">
              <CreditCard className="text-white" size={28} />
            </div>
          </div>
          <div className="bg-gradient-to-l p-3 from-pink-400 to-red-400 rounded-xl flex items-center justify-between  py-5">
            <div>
              <p className="text-white text-3xl font-semibold">Total users</p>
              <p className="text-white text-lg font-medium">{users?.length}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-full">
              <Users className="text-white" size={28} />
            </div>
          </div>
          <div className="bg-gradient-to-l p-3 from-yellow-400 to-orange-500 rounded-xl flex items-center justify-between  py-5">
            <div>
              <p className="text-white text-3xl font-semibold">Total events</p>
              <p className="text-white text-lg font-medium">
                {allActivities?.length}
              </p>
            </div>
            <div className="p-3 bg-white/20 rounded-full">
              <Calendar  className="text-white" size={28} />
            </div>
          </div>
        </div>
        <div>
          <div className="bg-[#2f363e] rounded-xl shadow p-6 mb-7 border border-white">
            <div className="mb-4">
              <h2 className="text-2xl text-white font-bold">
                Revenue Overview
              </h2>
              <p className="text-md font-semibold text-gray-500">
                Last 10 Payments
              </p>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData.slice(0, 15)}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
          <div className="bg-[#2f363e] rounded-xl p-6 border border-white ">
            <h1 className="text-white text-2xl font-bold mb-2">
              Recent Transactions
            </h1>
            <p className="text-gray-500 font-semibold mb-5  ">
              Latest payment transactions
            </p>
            <div>
              {paymentsInfo &&
                paymentsInfo.slice(0, 5).map((q) => {
                  return (
                    <div className="mb-5 flex items-center gap-4" key={q.id}>
                      <div className="bg-[#27272A] rounded-full w-10 h-10 flex justify-center items-center">
                        <p className="text-white font-semibold text-lg">
                          {q.billing_details.name.slice(0, 1)}
                        </p>
                      </div>
                      <div>
                        <p className="text-white font-semibold">
                          {q.billing_details.name}
                        </p>
                        <p className="text-sm text-gray-500 font-semibold">
                          Purchased {q.metadata?.total_tickets} tickets
                        </p>
                      </div>
                      <div className="ml-auto">
                        <p className="text-white font-semibold">
                          +{(q.amount / 100).toFixed(2)}₼
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="bg-[#2f363e] rounded-xl p-6 border border-white ">
            <h1 className="text-white text-2xl font-bold mb-2">
              Recent events
            </h1>
            <p className="text-gray-500 font-semibold mb-5  ">
              Latest Added Events
            </p>
            <div>
              {allActivities &&
                [...allActivities].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5).map((q) => {
                  return (
                    <div className="mb-5 flex items-center gap-4" key={q._id}>
                      <div className="bg-[#27272A] rounded-full w-10 h-10 flex justify-center items-center">
                        <Tickets className="-rotate-25 text-white font-semibold" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">
                          {q.title.length > 40
                            ? q.title.slice(0, 40) + "..."
                            : q.title}
                        </p>
                        <p className="text-gray-500 text-sm font-semibold">
                          {new Date(
                            q.showtimes[0].startTime
                          ).toLocaleDateString("en-GB")}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
