import React from "react";
import { getYear } from 'date-fns';
import Image from 'next/image';

import { gameCollectionRef, setDoc, doc } from "@/utils/firebase";

import { useGamesContext } from "@/context/games";
import styles from "./search.module.css";

const SearchListItem = ({ game, closeHandler }) => {
  const { gameList, setGameList, setGameExists } = useGamesContext();
  const platforms = game.platforms ? game.platforms.map((platform) => platform.name).join(', ') : null;
  const handleClick = async e => {
    try {
      // Add data to the "users" collection
      if (gameList.some(existingGame => existingGame.id === game.id)) {
        setGameExists(true);
        const listItem = document.getElementById(`Game${game.id}--inner`);
        listItem.scrollIntoView({ behavior: 'smooth' });
        listItem.style.boxShadow = 'rgb(230 174 54) 0px 0px 10px 5px';
      } else {
        const payload = { now_playing: false, vote_count: 1, ...game };
        await setDoc(doc(gameCollectionRef, `${game.id}`), payload);
        setGameList(prevState => [payload, ...prevState]);
      };
      closeHandler();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <li className={styles.searchListItem} key={game.id} onClick={handleClick}>
      <div className={styles.gameImg}>
        <Image
          src={game.image.medium_url}
          alt={`${game.name} cover image`}
          width={190}
          height={107}
        />
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