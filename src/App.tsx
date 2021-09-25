import React, { CSSProperties, useState } from "react";
import { useEffect } from "react";
import generateMessage, { Message } from "./Api";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import styles from "./App.module.scss";

const cardRow: CSSProperties = {
  flex: 1,
  minWidth: "350px",
};

const cardError: CSSProperties = {
  marginBottom: "15px",
  backgroundColor: "#F56236",
};

const cardWarning: CSSProperties = {
  marginBottom: "15px",
  backgroundColor: "#FCE788",
};

const cardInfo: CSSProperties = {
  marginBottom: "15px",
  backgroundColor: "#88FCA3",
};

const actionButton: CSSProperties = {
  backgroundColor: "#88FCA3",
};

const App: React.FC<{}> = () => {
  const [errorMessages, setErrorMessages] = useState<Message[]>([]);
  const [warningMessages, setWarningMessages] = useState<Message[]>([]);
  const [infoMessages, setInfoMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingLabel, setLoadingLabel] = useState("Stop");

  useEffect(() => {
    if (isLoading) {
      const cleanUp = generateMessage((message: Message) => {
        switch (message.priority) {
          case 0:
            setErrorMessages((oldMessages) => [...oldMessages, message]);
            break;
          case 1:
            setWarningMessages((oldMessages) => [...oldMessages, message]);
            break;
          case 2:
            setInfoMessages((oldMessages) => [...oldMessages, message]);
            break;
        }
      });
      return cleanUp;
    }
  }, [setErrorMessages, setWarningMessages, setInfoMessages, isLoading]);

  const handleClear = () => {
    setErrorMessages([]);
    setWarningMessages([]);
    setInfoMessages([]);
  };

  const handleLoading = () => {
    isLoading ? setLoadingLabel("Play") : setLoadingLabel("Stop");
    isLoading ? setIsLoading(false) : setIsLoading(true);
  };

  const handleRemoveMessage = (message: string, priority: number) => {
    switch (priority) {
      case 0:
        setErrorMessages(
          errorMessages.filter((msg) => msg.message !== message)
        );
        break;
      case 1:
        setWarningMessages(
          warningMessages.filter((msg) => msg.message !== message)
        );
        break;
      case 2:
        setInfoMessages(infoMessages.filter((msg) => msg.message !== message));
        break;
    }
  };

  return (
    <div className={styles.container}>
      <h1>nuffsaid.com Coding Challenge</h1>
      <hr></hr>
      <div className={styles.actionButtons}>
        <button style={actionButton} onClick={handleLoading}>
          {loadingLabel}
        </button>
        <button style={actionButton} onClick={handleClear}>
          Clear
        </button>
      </div>
      <div className={styles.cardContainer}>
        <div style={cardRow}>
          <h2>Error type 1</h2>
          <span>Count {errorMessages.length}</span>
          {errorMessages?.map?.((msg) => (
            <Card style={cardError} key={msg?.message}>
              <CardContent>
                {msg?.message}
                <div className={styles.clearButtonContainer}>
                  <button
                    onClick={() =>
                      handleRemoveMessage(msg?.message, msg?.priority)
                    }
                  >
                    Clear
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div style={cardRow}>
          <h2>Error type 2</h2>
          <span>Count {warningMessages.length}</span>
          {warningMessages?.map?.((msg) => (
            <Card style={cardWarning} key={msg?.message}>
              <CardContent>
                {msg?.message}
                <div className={styles.clearButtonContainer}>
                  <button
                    onClick={() =>
                      handleRemoveMessage(msg?.message, msg?.priority)
                    }
                  >
                    Clear
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div style={cardRow}>
          <h2>Error type 3</h2>
          <span>Count {infoMessages.length}</span>
          {infoMessages?.map?.((msg) => (
            <Card style={cardInfo}>
              <CardContent>
                {msg?.message}
                <div className={styles.clearButtonContainer}>
                  <button
                    onClick={() =>
                      handleRemoveMessage(msg?.message, msg?.priority)
                    }
                  >
                    Clear
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
