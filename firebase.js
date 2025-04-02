// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDq2vlu06cnfzq-hBH50SPGH9bu3wDdcUk",
  authDomain: "rifa-teste.firebaseapp.com",
  projectId: "rifa-teste",
  storageBucket: "rifa-teste.firebasestorage.app",
  messagingSenderId: "313335730145",
  appId: "1:313335730145:web:4f54eeae00556248420ca0",
  measurementId: "G-96HM9E3WNF",
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
