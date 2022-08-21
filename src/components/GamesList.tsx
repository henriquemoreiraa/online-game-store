import { Game } from "../types";
import { Navigation } from "swiper";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";

type Props = {
  games: Game[];
};

function GamesList({ games }: Props) {
  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <p className=" flex flex-row items-center sm:text-xl text-sm my-5 font-semibold w-full sm:px-11 px-5">
        ALL GAMES AVAIABLE{" "}
        <span className="text-xs mx-3 text-gray-200">{`>`}</span>
      </p>
      <div className="w-11/12 h-4/5 ">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="w-full h-full hidden sm:block"
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
        >
          {games.map((game) => (
            <SwiperSlide
              key={game.id as string}
              className="flex flex-col justify-center items-center relative "
            >
              <a className="h-full w-full" href={`/game/${game.id}`}>
                <img
                  className="w-full h-full object-cover "
                  src={`${game.game_img}`}
                  alt=""
                />
                <div className="absolute bottom-0 left-0 bg-gradient-to-r from-blackTranparent to-transparent w-full h-full flex flex-col justify-end py-5 px-5">
                  <p className=" my-1 text-2xl font-bold">{game.name}</p>
                  <p className=" my-1 font-semibold text-ms">
                    Starting at ${`${game.price},00`}
                  </p>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="w-full h-full sm:hidden"
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
        >
          {games.map((game) => (
            <SwiperSlide
              key={game.id as string}
              className="flex flex-col justify-center items-center relative "
            >
              <a className="h-full w-full" href={`/game/${game.id}`}>
                <img
                  className="w-full h-full object-cover "
                  src={`${game.game_img}`}
                  alt=""
                />
                <div className="absolute bottom-0 left-0 bg-gradient-to-r from-blackTranparent to-transparent w-full h-full flex flex-col justify-end py-5 px-5">
                  <p className=" my-1 text-2xl font-bold">{game.name}</p>
                  <p className=" my-1 font-semibold text-ms">
                    Starting at ${`${game.price}`}
                  </p>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default GamesList;
