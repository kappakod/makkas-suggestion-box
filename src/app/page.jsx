'use client';
import React from "react";
import MainScreen from "@/components/mainScreen";
import { AppProvider } from "@/context/app";
import { GamesProvider } from "@/context/games";
import styles from "./page.module.css";

const IndexPage = () => {
  return (
      <AppProvider>
        <GamesProvider>
          <main className={styles.main}>
            <div className={styles.description}>
              <MainScreen />
            </div>
            <footer className={styles.footer}>
              <p className={styles.code}>Game search API provided by <a href="https://www.giantbomb.com/api/">Giant Bomb</a></p>
            </footer>
          </main>
        </GamesProvider>
      </AppProvider>
  );
};

export default IndexPage;
