import { ReactElement } from "react";
import DrinkCard from "./DrinkCard";
import './DrinkMenu.css';

export interface DrinkMenuProps {
  title: string;
  children: ReactElement<typeof DrinkCard> | ReactElement<typeof DrinkCard>[];
}

export const DrinkMenu = (props: DrinkMenuProps) => {
  return (
    <div className="drink-menu">
      <h4>{props.title}</h4>
      <div className="drink-items">{props.children}</div>
    </div>
  );
};

export default DrinkMenu;