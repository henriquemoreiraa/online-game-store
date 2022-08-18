import { Games } from "../types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper";

type Props = {
  games: Games[];
};

function Banner({ games }: Props) {
  return (
    <div className="flex justify-center w-full h-screen">
      <div className="w-full sm:w-4/5 h-4/5 ">
        <Swiper
          className="w-full h-full rounded-xl"
          slidesPerView={1}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          modules={[Autoplay]}
        >
          {games.map((game) => (
            <SwiperSlide className=" flex flex-col justify-center items-center relative">
              <a className="w-full h-full" href={`/game/${game.id}`}>
                <img
                  className="w-full h-full object-cover "
                  src={`${game.game_img}`}
                  alt=""
                />
                <div className="absolute bottom-0 left-0 bg-gradient-to-r from-blackTranparent to-transparent w-full h-full flex flex-col justify-end py-5 px-5">
                  <p className=" my-1 text-2xl sm:text-3xl font-bold ml-1">
                    {game.name}
                  </p>
                  <p className=" my-1 font-semibold text-ms ml-1">
                    Starting at ${`${game.price}`}
                  </p>
                  <button className=" bg-indigo-600 text-white p-4 rounded-xl text-xs font-semibold shadow-xl sm:w-40 w-full">
                    BUY NOW
                  </button>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Banner;
