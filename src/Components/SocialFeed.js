import { memo } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonDatetime, IonButton } from "@ionic/react";

const Home = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonDatetime
          displayFormat="MM/DD/YYYY"
          placeholder="Select Date"
        ></IonDatetime>
        <IonButton fill="clear">Start</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default memo(Home);
