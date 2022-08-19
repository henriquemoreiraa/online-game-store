export type Games = {
  id: String;
  name: String;
  price: Number;
  game_img: String;
  game_trailer: String;
  genre: {
    name: String;
  };
};

export type Game = {
  id: String;
  name: String;
  price: Number;
  game_img: String;
  game_trailer: String;
  genre: {
    name: String;
  };
};

export type User = {
  id: String;
  email: String;
  name: String;
  wish_list: Games[];
  cart: Games[];
  user_games: Games[];
};
