import { useSession } from "next-auth/react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import Login from "./Login";

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const { status, data } = useSession();

  return (
    <div className="bg-neutral-800 w-full h-10 flex justify-between items-center px-10 text-xs font-bold text-white">
      {isLogin && <Login setIsLogin={setIsLogin} />}
      <div className="cursor-pointer">LOGO</div>
      {status !== "authenticated" ? (
        <div className="cursor-pointer" onClick={() => setIsLogin(true)}>
          SIGN IN
        </div>
      ) : (
        <div className="flex items-center ">
          <p className="mr-3 font-normal">
            Logged as <strong>{data?.user.name}</strong>
          </p>
          <div onClick={() => signOut()} className="ml-3 cursor-pointer">
            <FiLogOut size={"1.7em"} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
