import React from "react";
import { getYear } from 'date-fns';

import { gameCollectionRef, setDoc, doc } from "@/utils/firebase";

import { useGamesContext } from "@/context/games";
import styles from "./search.module.css";

const SearchListItem = ({ game, closeHandler }) => {
  const { gameList, setGameList, setGameExists } = useGamesContext();
  const platforms = game.platforms ? game.platforms.map((platform) => platform.name).join(', ') : null;
  const handleClick = async e => {
    try {
      // Add data to the "users" collection
      await setDoc(doc(gameCollectionRef, `${game.id}`), { now_playing: false, ...game});
      closeHandler();

      if (gameList.some(existingGame => existingGame.id === game.id)) {
        setGameExists(true);
      } else {
        setGameList(prevState => [game, ...prevState]);
      };
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <li className={styles.searchListItem} key={game.id} onClick={handleClick}>
      <div className={styles.gameImg}>
        <img src={game.image.medium_url} alt={`${game.name} cover image`} />
      </div>
      <div className={styles.gameInfo}>
        <p>{game.name}</p>
        <p className={styles.caption}>{getYear(new Date(game.original_release_date))}</p>
        {platforms && <p className={styles.caption}>{platforms}</p>}
      </div>
    </li>
  );
};

export default SearchListItem;