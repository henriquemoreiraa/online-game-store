import { FaDiscord, FaGoogle, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

type Props = {
  setIsLogin: (e: boolean) => void;
};

function Login({ setIsLogin }: Props) {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-30 flex justify-center items-center ">
      <div className="bg-neutral-800 p-10 flex flex-col items-center relative rounded-sm">
        <h1 className="mb-3 text-xl font-semibold">LOGO</h1>
        <p className="font-normal">Choose one way to login/register</p>
        <div className="flex mt-5 items-center justify-evenly text-center w-full">
          <button
            onClick={() => signIn("discord")}
            title="Discord"
            className="bg-indigo-700 p-2 rounded-full"
          >
            <FaDiscord size={"1.9em"} />
          </button>
          <button
            onClick={() => signIn("google")}
            title="Google"
            className="bg-indigo-700 p-2 rounded-full"
          >
            <FaGoogle size={"1.9em"} />
          </button>
          <button
            onClick={() => signIn("github")}
            title="Github"
            className="bg-indigo-700 p-2 rounded-full"
          >
            <FaGithub size={"1.9em"} />
          </button>
        </div>
        <p
          onClick={() => setIsLogin(false)}
          className="mt-5 border-b border-gray-500 text-gray-100 font-normal cursor-pointer"
        >
          Cancel
        </p>
      </div>
    </div>
  );
}

export default Login;
