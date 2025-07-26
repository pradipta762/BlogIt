import React, { useEffect, useState } from "react";

import postsApi from "apis/posts";
import createConsumer from "channels/consumer";
import { subscribeToPdfDownloadChannel } from "channels/pdfDownloadChannel";
import FileSaver from "file-saver";
import Logger from "js-logger";
import { Modal, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import { ProgressBar, PageLoader } from "../commons";

const DownloadPost = ({ setIsDownloadModalOpen, description }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const consumer = createConsumer();

  const { slug } = useParams();

  const { t } = useTranslation();

  const generatePdf = async () => {
    try {
      await postsApi.generatePdf(slug);
    } catch (error) {
      Logger.error(error);
    }
  };

  const downloadPdf = async () => {
    setIsLoading(true);
    try {
      const { data } = await postsApi.downloadPdf(slug);
      FileSaver.saveAs(data, `${slug}-blog.pdf`);
      setIsDownloadModalOpen(false);
    } catch (error) {
      Logger.error(error);
    } finally {
      setIsLoading(false);
      setIsDownloadModalOpen(false);
    }
  };

  useEffect(() => {
    subscribeToPdfDownloadChannel({
      consumer,
      setMessage,
      setProgress,
      generatePdf,
    });

    return () => {
      consumer.disconnect();
    };
  }, []);

  Logger.info(progress);

  useEffect(() => {
    if (progress === 100) {
      setMessage(t("messages.savePdf"));
      setIsLoading(false);
      downloadPdf();
    }
  }, [progress]);

  const handleModalClose = () => {
    setIsDownloadModalOpen(false);
    consumer.disconnect();
  };

  if (isLoading) <PageLoader />;

  return (
    <Modal isOpen onClose={handleModalClose}>
      <Modal.Header description={description}>
        <Typography>{message}</Typography>
      </Modal.Header>
      <Modal.Body>
        <ProgressBar progress={progress} />
      </Modal.Body>
    </Modal>
  );
};

export default DownloadPost;
