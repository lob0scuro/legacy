import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDo4-gRbrEhh4OdDvjblZTYz8rNAcFF4qM",
  authDomain: "epclegacy2025.firebaseapp.com",
  projectId: "epclegacy2025",
  storageBucket: "epclegacy2025.firebasestorage.app",
  messagingSenderId: "479945575757",
  appId: "1:479945575757:web:dd3130281f40ba08d8bb04",
  measurementId: "G-PG8TXPR43T",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
