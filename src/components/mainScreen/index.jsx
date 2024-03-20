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
        setGameList(gamesData.sort((a, b) => (b.now_playing ? 1 : -1)));
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
      <h1>Makka Pans&apos;s Suggestion Box</h1>
      {!gameList.length && isFetchingList ? (
        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
          <p>Loading...</p><Image width={14} height={14} src="/loading.gif" alt="loading" />
        </div>
      ) : (
        <>
          <p>HEY <span><Image src="/bloblu.gif" width={36} height={36}/></span></p>
          <p>Suggest a game for me to stream next!</p>
          <p>You can filter the list below to see what&apos;s currently being played, or what others have suggested.</p>
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
