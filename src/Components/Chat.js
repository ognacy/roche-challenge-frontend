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
} from "@ionic/react";

import { send } from "ionicons/icons";

const baseURL = "https://roche-build-eynfci34ea-ez.a.run.app/api/v1";

const currentUser = "Robert";
const responseIdCounter = 0;

const bot_messages = [
  { index: 0, user: "BOT", text: "Hello friend!" },
  { index: 1, user: "Robert", text: "Good morning!" },
  { index: 2, user: "BOT", text: "How are you today?" },
  { index: 3, user: "Robert", text: "I am fine." },
];

const Chat = () => {
  const [input, setInput] = useState("");
  const onAnswerChange = (e) => setInput(e.target.value);

  useEffect(() => {
    axios
      .post(`${baseURL}/start`, {
        user_id: "1",
        resume: true,
        questionnaire_type: "colon",
      })
      .then(() => {
        console.log("POST to /start successful");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const answer = input;

    console.log(answer);
    if (answer) {
      axios
        .post(
          `${baseURL}/reply`,
          {
            chatId: "1",
            responseId: responseIdCounter + 1,
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
        .then(() => {
          console.log("POST to /reply successful");
        });
    }
  };

  return (
    <IonPage>
      <IonContent
        scrollEvents={true}
        onIonScrollStart={() => {}}
        onIonScroll={() => {}}
        onIonScrollEnd={() => {}}
      >
        <div>
          <IonGrid>
            <IonRow>
              {bot_messages.map((msg) => (
                <IonCol
                  offset={currentUser === msg.user ? 3 : 0}
                  size="9"
                  key={msg.index}
                  className={
                    "message " +
                    (currentUser === msg.user ? "user-message" : "bot-message")
                  }
                >
                  <b>{msg.user}</b>
                  <br />
                  <span>{msg.text}</span>
                  <br />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
          <IonFooter>
            <IonToolbar>
              <IonRow align-items-center no-padding>
                <IonCol size="10">
                  <textarea
                    autosize="true"
                    maxrows="3"
                    className="message-input"
                    value={input}
                    onChange={onAnswerChange}
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
            </IonToolbar>
          </IonFooter>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default memo(Chat);
