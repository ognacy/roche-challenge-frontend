import { memo } from "react";
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

import { send } from 'ionicons/icons';

const currentUser = "Robert";
const bot_messages = [
  { index: 0, user: "BOT", text: "Hello friend!" },
  { index: 1, user: "Robert", text: "Good morning!" },
  { index: 2, user: "BOT", text: "How are you today?" },
  { index: 3, user: "Robert", text: "I am fine." },
];

function reply() {
  alert('Hello!');
}

const Chat = () => {
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
                  <textarea autosize="true" maxrows="3" className="message-input"></textarea>
                </IonCol>
                <IonCol size="2">
                  <IonButton className="msg-btn" expand="block" fill="clear"
                  onClick={reply}>
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
