import "firebase/auth"; // (nếu bạn cần xác thực người dùng)
import "firebase/database"; // (nếu bạn cần tương tác với Firebase Realtime Database)
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyBJ0Q6ZLIEPk9aHuLQyP3UwgNv6TyDNypo",
  authDomain: "fir-project-705cf.firebaseapp.com",
  databaseURL:
    "https://fir-project-705cf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-project-705cf",
  storageBucket: "fir-project-705cf.appspot.com",
  messagingSenderId: "61855830217",
  appId: "1:61855830217:web:86dccf62c366d3f67b3d18",
  measurementId: "G-QSNHTRHKFX",
};

// Khởi tạo Firebase
