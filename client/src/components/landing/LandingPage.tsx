import landingtemp from "../../assets/landingtemp.jpg";

const LandingPage = () => {
  return (
    <div className={"bg-gray-600 w-screen h-screen"}>
      <div className={"h-3/4 w-full"}>
        <img src={landingtemp} className={" h-full w-full object-cover"} />
        {/* <div className={"bg-white opacity-60 w-1/4 h22-1/2 absolute z-50"}>

        </div> */}
      </div>
    </div>
  );
};

export default LandingPage;
