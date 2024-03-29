"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { gameCollectionRef, getDocs } from '@/utils/firebase';
import Search from "@/components/search";
import GamesList from "@/components/gamesList";
import { useGamesContext } from "@/context/games";

const MainScreen = () => {
  const { gameList, setGameList } = useGamesContext();
  const [isFetchingList, setIsFetchingList] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(gameCollectionRef);
        const gamesData = [];
        querySnapshot.forEach(doc => {
          gamesData.push(doc.data());
        });
        setGameList([...gamesData.filter(game => game.now_playing), ...gamesData.filter(game => !game.now_playing).sort((a, b) => (b.vote_count - a.vote_count))]);
        setIsFetchingList(false);
      } catch (error) {
        console.error('Error getting documents: ', error);
        setIsFetchingList(false);
      }
    }
    if (!gameList.length) {
      fetchData();
    }

    return () => {
    };
  }, [setGameList, gameList.length]);

  return (
    <>
      <h1>Makka Pan&apos;s Suggestion Box</h1>
      {!gameList.length && isFetchingList ? (
        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
          <p>Loading...</p><Image width={14} height={14} src="/loading.gif" alt="loading" />
        </div>
      ) : (
        <>
          <p>HEY <span><Image src="/bloblu.gif" width={36} height={36} alt=""/></span></p>
          <p>Suggest a game for me to stream next!</p>
          <p>You can vote on games in the list to push them to the top of the list (there are no rules for voting so if you&apos;re really passionate you can spam votes)</p>
          <Search />
          {gameList && (
            <GamesList label="Suggested games" games={gameList} />
          )}
        </>
      )}
    </>
  );
}

export default MainScreen;
