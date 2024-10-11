import axios from "../configs/axios-config";
import { PUSH_PUB_KEY } from "../configs/secret";

/* subscribe 등록 */
export const subscribeServer = async () => {
  const serviceWorker = await navigator.serviceWorker.ready;

  const subscription = await serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: PUSH_PUB_KEY,
  });

  const response = await axios.post(
    "/push/subscription",
    { subscription: JSON.stringify(subscription) },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const { data, status } = response;

  return data;
};

/* subscribe 등록 */
export const notifyServer = async () => {
  const response = await axios.post(
    "/push/notification",
    { content: "alarm : )" },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const { data, status } = response;

  return data;
};
