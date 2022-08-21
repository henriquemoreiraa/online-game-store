export type Game = {
  id: String;
  name: String;
  price: String;
  game_img: String;
  game_trailer: String;
  genre: {
    name: String;
  }[];
};

export type User = {
  id: String;
  email: String;
  name: String;
  wish_list: Game[];
  cart: Game[];
  user_games: Game[];
};
