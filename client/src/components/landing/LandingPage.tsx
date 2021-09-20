import landingtemp from "../../assets/landingtemp.jpg";

const LandingPage = () => {
  return (
    <div className={"bg-gray-600 w-screen h-body"}>
      <div className={"h-full w-full"}>
        <img src={landingtemp} className={" h-full w-full object-contain"} />
      </div>
    </div>
  );
};

export default LandingPage;
