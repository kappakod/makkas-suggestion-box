"use client"
import React, { useEffect, useState } from "react";

import { gameCollectionRef, getDocs } from '@/utils/firebase';
import Search from "@/components/search";
import GamesList from "@/components/gamesList";
import { useGamesContext } from "@/context/games";

const MainScreen = () => {
  const { gameList, setGameList } = useGamesContext();
  const [isFetchingList, setIsFetchingList] = useState(true);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(gameCollectionRef);
      const gamesData = [];
      querySnapshot.forEach(doc => {
        gamesData.push(doc.data());
      });
      setGameList(gamesData.sort((a, b) => (b.now_playing ? 1 : -1)));
      setIsFetchingList(false);
    } catch (error) {
      console.error('Error getting documents: ', error);
      setIsFetchingList(false);
    }
  }
  useEffect(() => {
    if (!gameList.length) {
      fetchData();
    }

    return () => {
    };
  }, []);

  return (
    <>
      <h1>Makka's Suggestion Box</h1>
      {!gameList.length && isFetchingList ? (
        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
          <p>Loading...</p><img style={{ width: "14px" }} src="/loading.gif" alt="loading" />
        </div>
      ) : (
        <>
          <p>Suggest a game for me to stream next!</p>
          <p>You can filter the list below to see what's currently being played, or what others have suggested.</p>
          <Search />
          {gameList && (
            <GamesList games={gameList} />
          )}
        </>
      )}
    </>
  );
}

export default MainScreen;
