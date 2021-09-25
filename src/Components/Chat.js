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

const Chat = () => {
  const currentUser = "user-1";

  const [input, setInput] = useState("");
  const [botMessages, setBotMessages] = useState([]);

  const onAnswerChange = (e) => setInput(e.target.value);

  useEffect(() => {
    axios
      .post(`${baseURL}/start`, {
        user_id: currentUser,
        resume: false,
        questionnaire_type: "colon",
      })
      .then((response) => {
        setBotMessages([
          ...botMessages,
          {
            user: "BOT",
            chatId: response.data.chatId,
            responseId: response.data.responseId,
            nextQuestion: response.data.nextQuestion,
            suggestedResponses: response.data.suggestedResponses,
          },
        ]);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let lastMessage = botMessages[botMessages.length - 1];
    const answer = input;

    if (answer) {
      axios
        .post(
          `${baseURL}/reply`,
          {
            chatId: lastMessage.chatId,
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
              user: currentUser,
              chatId: lastMessage.chatId,
              responseId: lastMessage.responseId,
              nextQuestion: [answer],
              suggestedResponses: null,
            },
            {
              user: "BOT",
              chatId: response.data.chatId,
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
              {botMessages.map((msg) =>
                msg.nextQuestion.map((m) => (
                  <IonCol
                    offset={currentUser === msg.user ? 3 : 0}
                    size="9"
                    key={m}
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
                  </IonCol>
                ))
              )}
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
