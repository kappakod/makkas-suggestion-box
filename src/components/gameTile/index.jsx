import React from "react";
import { getYear } from 'date-fns';

import styles from "./gameTile.module.css";
import GameBoxImg from "./gameBoxImg";

const GameTile = ({ game }) => {
  return (
    <li className={styles.gameTile} key={game.id}>
      <GameBoxImg imgUrl={game.cover.url} />
      <p>{game.name} - {getYear(new Date(game.first_release_date * 1000))}</p>
      <p>{game.involved_companies[0].name}</p>
      <p>{game.platforms[0].name}</p>
    </li>
  );
};

export default GameTile;