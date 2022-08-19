import { BsCheckCircle } from "react-icons/bs";

function Success() {
  return (
    <div className=" text-white  flex flex-col justify-center items-center h-screen">
      <div className=" flex items-center mb-3">
        {" "}
        <BsCheckCircle color="#00fc00" size={"1.5em"} />{" "}
        <p className="ml-3  text-2xl">Successful payment</p>
      </div>
      <a href="/library">
        <p className="border-b hover:opacity-90">Go to your library</p>
      </a>
    </div>
  );
}

export default Success;
