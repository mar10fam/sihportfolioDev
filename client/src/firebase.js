import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBb3W4_iBIwaEsosjqcg0v-l9FFJ4BCY90",
  authDomain: "sihportfolioart.firebaseapp.com",
  projectId: "sihportfolioart",
  storageBucket: "sihportfolioart.appspot.com",
  messagingSenderId: "2733186147",
  appId: "1:2733186147:web:7ab3df256211aab5d1ec56"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)