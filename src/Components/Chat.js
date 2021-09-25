import { memo, useEffect, useState } from "react";
import axios from "axios";
import {
  IonContent,
  IonRow,
  IonCol,
  IonPage,
  IonGrid,
  IonFooter,
  IonToolbar,
  IonButton,
  IonIcon,
  IonHeader,
  IonTitle,
  IonFab,
  IonFabButton,
} from "@ionic/react";

import { send, call } from "ionicons/icons";
import { BASE_URL } from "../utils/ENV";

const Chat = () => {
  const currentUser = "user-1";

  const [input, setInput] = useState("");
  const [chat, setChat] = useState("");
  const [botMessages, setBotMessages] = useState([]);

  const onAnswerChange = (e) => setInput(e.target.value);

  const handleUserKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // e.preventDefault();
      handleSubmit(e); // this won't be triggered
    }
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    let lastMessage = botMessages[botMessages.length - 1];
    const answer = input;

    if (answer && answer != null && answer !== "") {
      botMessages.push({
        user: currentUser,
        chatId: chat,
        responseId: lastMessage.responseId,
        nextQuestion: [answer],
        suggestedResponses: [],
      });
      axios
        .post(
          `${BASE_URL}/reply`,
          {
            chatId: chat,
            responseId: lastMessage.responseId,
            userResponse: answer,
            suggestedResponseUsedId: null,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            },
          }
        )
        .then((response) => {
          setBotMessages([
            ...botMessages,
            {
              user: "Rick",
              chatId: chat,
              responseId: response.data.responseId,
              nextQuestion: response.data.nextQuestion,
              suggestedResponses: response.data.suggestedResponses,
            },
          ]);
        })
        .finally(() => {
          lastMessage = {};
          setInput("");
        });
    }
  };

  const getClassifiedMsg = (m) => {
    let message = m;
    message = message.replace('[','');
    message = message.replace(']','');
    return message;
  }

  const showMessage = (botMessages) => {
    return (botMessages.map((msg) =>
      msg.nextQuestion.map((m, index) => (
        m.includes("Classified") ? 
        <IonCol offset={currentUser === msg.user ? 3 : 0} size="9"
        key={index}>
          <span className="classified">{getClassifiedMsg(m)}</span>
        </IonCol>
        :
        <IonCol
          offset={currentUser === msg.user ? 3 : 0}
          size="9"
          key={msg.responseId + m}
          className={
            "message " +
            (currentUser === msg.user
              ? "user-message"
              : "bot-message")
          }
        >
          <b>{msg.user}</b>
          <br />
          <span>{m}</span>
          <br />
          {/* Buttons for Suggested Answers */}
          {/*                     <span>
            {msg.suggestedResponses.map((res) => (
              <IonButton key={res + m} color="secondary">
                {res}
              </IonButton>
            ))}
          </span>
          <br /> */}
        </IonCol>
      ))
    ))
  }

  useEffect(() => {
    axios
      .post(`${BASE_URL}/start`, {
        user_id: currentUser,
        resume: false,
        questionnaire_type: "colon",
      })
      .then((response) => {
        setBotMessages([
          ...botMessages,
          {
            user: "Rick",
            chatId: response.data.chatId,
            responseId: response.data.responseId,
            nextQuestion: response.data.nextQuestion,
            suggestedResponses: response.data.suggestedResponses,
          },
        ]);
        setChat(response.data.chatId);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Chatbot</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonFab vertical="top" horizontal="end" slot="fixed">
        <IonFabButton color="success">
          <IonIcon icon={call} />
        </IonFabButton>
      </IonFab>
      <IonContent
        className="content-chat"
        scrollEvents={true}
        onIonScrollStart={() => {}}
        onIonScroll={() => {}}
        onIonScrollEnd={() => {}}
      >
        <div>
          <IonGrid>
            <IonRow>
              {showMessage(botMessages)}
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
      <IonFooter className="footer">
        <IonGrid no-margin no-padding className="remove-margin">
          <IonRow no-padding>
            <IonCol size="10">
              <textarea
                autosize="true"
                maxrows="3"
                className="message-input"
                type="text"
                value={input}
                onChange={onAnswerChange}
                onKeyPress={handleUserKeyPress}
              ></textarea>
            </IonCol>
            <IonCol size="2">
              <IonButton
                className="msg-btn"
                expand="block"
                fill="clear"
                onClick={handleSubmit}
              >
                <IonIcon icon={send}></IonIcon>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default memo(Chat);
