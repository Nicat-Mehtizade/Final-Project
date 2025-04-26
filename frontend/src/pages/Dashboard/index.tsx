const Dashboard = () => {
  return (
    <div className="bg-[#24292d] h-screen w-full p-5">
      <div className="">
        <div className="bg-gradient-to-l w-[40%]  p-3 from-[#0a8c84] to-[#0fa28f] rounded-xl">
          <div className="flex justify-between">
            <div>
              <p className="text-white">Ticket Sold Today</p>
              <h1 className="text-white text-2xl font-bold">
                456,502 <span className="text-sm">pcs</span>
              </h1>
            </div>
            <div>
              <h2 className="text-yellow-300">+4%</h2>
              <p className="text-gray-300">than last day</p>
            </div>
          </div>
          <div className="bg-[#22bbb0] p-2 rounded-full w-full"></div>
          <p className="text-sm text-gray-400">Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
