import Logger from "js-logger";
import { getFromLocalStorage } from "utils/storage";

export const subscribeToPdfDownloadChannel = ({
  consumer,
  setMessage,
  setProgress,
  generatePdf,
}) => {
  const userId = getFromLocalStorage("authUserId");
  const pdfDownloadSubscription = consumer.subscriptions.create(
    {
      channel: "PdfDownloadChannel",
      pubsub_token: userId,
    },
    {
      connected() {
        setMessage("Connecting the Cables...");
        generatePdf();
      },
      received(data) {
        Logger.info("RECEIVED");
        const { message, progress } = data;
        setMessage(message);
        setProgress(progress);
      },
    }
  );

  return pdfDownloadSubscription;
};
