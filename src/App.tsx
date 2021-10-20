import React, { CSSProperties, useState } from "react";
import { useEffect } from "react";
import generateMessage, { Message } from "./Api";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import styles from "./App.module.scss";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

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
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  useEffect(() => {
    if (isLoading) {
      const cleanUp = generateMessage((message: Message) => {
        switch (message.priority) {
          case 0:
            setErrorMessages((oldMessages) => [...oldMessages, message]);
            setOpenSnackbar(true);
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

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

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
            <Card style={cardInfo} key={msg?.message}>
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={action}
      />
    </div>
  );
};

export default App;
