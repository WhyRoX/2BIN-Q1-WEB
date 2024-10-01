interface Pizza {
  id: number;
  title: string;
  content: string;
}

interface PizzaToUpdate {
  title?: string;
  content?: string;
}

type NewPizza = Omit<Pizza, "id">;

interface Drink {
  id: number;
  title: string;
  image: string;
  volume: number;
  price: number;
}

interface Film {
  id: number;
  title: string;
  director: string;
  duration: number;
  budget?: number;
  description?: string;
  imageUrl?: string;
} 

type NewDrink = Omit<Drink, "id">;
type NewFilm = Omit<Film, "id">;

export type { Pizza, NewPizza, PizzaToUpdate, Drink, Film, NewDrink, NewFilm };

