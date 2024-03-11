'use client';
import React from "react";
import Home from "@/pages/home";
import { AuthProvider } from "@/context/auth";
import { AppProvider } from "@/context/app";
import styles from "./page.module.css";

const IndexPage = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <main className={styles.main}>
          <div className={styles.description}>
            <Home />
          </div>
        </main>
      </AppProvider>
    </AuthProvider>
  );
};

export default IndexPage;
