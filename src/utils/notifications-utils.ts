import { notification } from "antd";

const toastError = (message: string, title = "Error!") => {
  notification.error({
    message: title,
    description: message,
  });
};

const toastInfo = (message: string, title = "Info") => {
  notification.info({
    message: title,
    description: message,
  });
};

const toastSuccess = (message: string, title = "Successfully!") => {
  notification.success({
    message: title,
    description: message,
  });
};

export { toastError, toastSuccess, toastInfo };
