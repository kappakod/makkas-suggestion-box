"use client"
import React, { useEffect } from "react";

import { useAuth } from "@/context/auth";
import { gameCollectionRef, getDocs } from '@/utils/firebase';
import Search from "@/components/search";

const Home = () => {
  const { isAuthenticated, login, accessToken } = useAuth();

  useEffect(() => {
    async function fetchData() {
      console.log('fetch  data')
      try {
        const querySnapshot = await getDocs(gameCollectionRef);
        querySnapshot.forEach(doc => {
          console.log(doc.data());
        });
      } catch (error) {
        console.error('Error getting documents: ', error);
      }
    }
    if (!isAuthenticated) {
      login();
    } else {
      console.log('hlp', accessToken);
      fetchData();
    }

    return () => {
    };
  }, []); // Run once on component mount

  if (!isAuthenticated)  {
    return (
      <div>Loading....</div>
    );
  }

  return (
    <>
      <Search />
    </>
  );
}

export default Home;
