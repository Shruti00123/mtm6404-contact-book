
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeW7hwoEjSEMwysqIrWA9xxTmsT5vJBcU",
  authDomain: "contact-book-544a7.firebaseapp.com",
  projectId: "contact-book-544a7",
  storageBucket: "contact-book-544a7.appspot.com",
  messagingSenderId: "769443762209",
  appId: "1:769443762209:web:b8ab8eecb3fbde036a9360"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
