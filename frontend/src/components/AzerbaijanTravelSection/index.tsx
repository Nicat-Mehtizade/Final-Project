const AzerbaijanTravelSection = () => {
    
  const handleATB = () => {
    window.open(
      "https://azerbaijan.travel/?hl=en&utm_source=iticket.az&utm_medium=web&utm_campaign=top-banner"
    );
  };

  return (
    <div className="max-w-[1280px] mx-auto py-15 flex justify-center items-center">
      <button onClick={handleATB} className="cursor-pointer">
        <img
          src="https://cdn.iticket.az/images/banners/23147_ATB_ITicket.az_Banners_1216x200_City_en.jpg"
          alt=""
        />
      </button>
    </div>
  );
};

export default AzerbaijanTravelSection;
