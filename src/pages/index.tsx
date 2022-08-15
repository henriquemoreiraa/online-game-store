function Home() {
  return (
    <div className=" bg-neutral-800	flex flex-col items-center h-screen text-white">
      {/* <Header /> */}
      <div className="w-4/5">
        <div className="flex flex-row justify-between m-3 my-10">
          <input
            className="bg-slate-700 outline-none border-none rounded-3xl text-white p-2 w-36"
            type="text"
            placeholder="Search game"
          />
          <div className="flex flex-row items-center ">
            <p className="mr-8 cursor-pointer">Wish List</p>
            <p className="cursor-pointer">Cart</p>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            className="w-5/6"
            src="https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fthe-witcher-3%2Fhome%2FEGS_TheWitcher3WildHuntGameoftheYear_CDPROJEKTRED_S1-2560x1440-8098a14981896e323a67fb85f1ca9967110f033f.jpg"
            alt=""
          />
        </div>
        <div>
          <h4>All games</h4>
        </div>
      </div>
    </div>
  );
}

export default Home;
