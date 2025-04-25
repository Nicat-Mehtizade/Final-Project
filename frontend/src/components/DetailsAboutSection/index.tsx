import { forwardRef, useState } from "react";
import { Activity } from "../../types/activityType";

const DetailsAboutSection = forwardRef<HTMLDivElement, { activity: Activity }>(
  ({ activity }, ref) => {
    const [aboutOrAge, setAboutOrAge] = useState("about");
    return (
      <div
      ref={ref}
      className="max-w-[1280px] mx-auto border-b-1 border-gray-200">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-8 py-10">
          <div className="w-[80%] lg:w-[55%] ">
            <div className="flex flex-col lg:flex-row gap-3 mb-7">
              <button
                onClick={() => setAboutOrAge("about")}
                className={`text-nowrap text-center shadow-xl cursor-pointer font-bold text-sm lg:text-lg py-5 px-15 rounded-3xl ${
                  aboutOrAge == "about" ? "bg-yellow-300" : "bg-white"
                }`}
              >
                About event
              </button>
              <button
                onClick={() => setAboutOrAge("age")}
                className={` shadow-xl text-center cursor-pointer font-bold text-sm lg:text-lg py-5 px-15 rounded-3xl ${
                  aboutOrAge == "age" ? "bg-yellow-300" : "bg-white"
                }`}
              >
                Age restrictions/ Language
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-xl h-[300px] overflow-hidden">
              <div className="h-full overflow-y-auto">
                <div className="p-5">
                  <p>
                    {aboutOrAge == "about"
                      ? activity.description
                      : `${activity.ageLimit}+/${
                          activity.language.slice(0, 1).toUpperCase() +
                          activity.language.slice(1)
                        }`}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-[80%] lg:w-[40%]">
            <img
              className="h-full w-full object-cover"
              src={activity.image}
              alt="Activity Image"
            />
          </div>
        </div>
      </div>
    );
  }
);

export default DetailsAboutSection;
