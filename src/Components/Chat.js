import { memo } from "react";
import { IonContent, IonRow, IonCol, IonPage, IonGrid } from "@ionic/react";

const currentUser = "Robert";
const bot_messages = [
  { index: 0, user: "BOT", text: "Hello friend!" },
  { index: 1, user: "Robert", text: "Good morning!" },
  { index: 2, user: "BOT", text: "How are you today?" },
  { index: 3, user: "Robert", text: "I am fine." },
];

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
              {bot_messages.map(
                (msg) =>
                  (
                    <IonCol offset={currentUser === msg.user ? 3 : 0} size="9" key={msg.index} className={"message " + (currentUser === msg.user ? 'user-message': 'bot-message')}>
                      <b>{msg.user}</b>
                      <br />
                      <span>{msg.text}</span>
                      <br />
                    </IonCol>
                  )
              )}
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default memo(Chat);
