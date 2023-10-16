import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { Auth, getAuth } from "firebase/auth";
import { EAuthToken } from "../interfaces/user-interfaces";
import { getMessaging, getToken } from "firebase/messaging";
import { onMessage } from "firebase/messaging";
import { createDeviceToken } from "../services/user-service";
import { toastInfo, toastSuccess } from "../utils/notifications-utils";
import { getRequestEquipmentService } from "../services/request-services";
import { useDispatch } from "react-redux";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

interface IProps {
  cb?: () => void;
}

export function requestPermission(cb?: () => void) {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("hehe");
      onMessage(messaging, (payload) => {
        cb?.();
        toastInfo("You have a new request !!", "Notification");
        // Xử lý thông báo ở đây
      });
      getToken(messaging, {
        vapidKey:
          "BF9F_OZJ6Un2UMnz4fkqBcuk3ASJTnECHPBwnU-P473QwXq7bo5hEBZXxR9HhvYiDKlfLSvw8WcHfX_E6Xr1pdY",
      }).then(async (currentToken: any) => {
        const deviceType = "WEB";
        await createDeviceToken(1, currentToken);
        localStorage.setItem(EAuthToken.DEVICE_TOKEN, currentToken);
      });
    } else {
      console.log("Do not have permission!");
    }
  });
}
