import { Games } from "../types";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";

type Props = {
  games: Games[];
};

function GamesList({ games }: Props) {
  return (
    <div className="flex flex-col justify-center w-full h-screen">
      <p className=" flex flex-row items-center text-xl my-5 font-semibold">
        ALL GAMES AVAIABLE{" "}
        <span className="text-xs mx-3 text-gray-200">{`>`}</span>
      </p>
      <div className="w-full h-4/5 ">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="w-full h-full"
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
        >
          {games.map((game) => (
            <SwiperSlide className="flex flex-col justify-center items-center relative ">
              <img
                className="w-full h-full object-cover "
                src={`${game.game_img}`}
                alt=""
              />
              <div className="absolute bottom-0 left-0 bg-gradient-to-r from-blackTranparent to-transparent w-full h-full flex flex-col justify-end py-5 px-5">
                <p className=" my-1 text-3xl font-bold">{game.name}</p>
                <p className=" my-1 font-semibold text-ms">
                  Starting at ${`${game.price}`}
                </p>
                <button className=" bg-white text-black p-4 rounded-xl text-xs font-semibold shadow-xl w-40">
                  BUY NOW
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default GamesList;
