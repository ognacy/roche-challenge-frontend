import { memo } from "react";
import {
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonPage,
} from "@ionic/react";

const Home = () => {
  const menu = [
    {
      title: "Chatbot",
      path: "/chatbot",
    },
    {
      title: "Social feed",
      path: "/social-feed",
    },
    {
      title: "Visualizations",
      path: "/visualizations",
    },
  ];

  const nextPath = (path) => {
    console.log(path);
    window.location.href = path;
  };

  return (
    <>
      <IonPage className="mainPage">
        <IonContent>
          <IonGrid className="ionGrid">
            {menu.map((item, index) => (
              <IonRow key={index} className="ionRow">
                <IonCol>
                <IonButton
                  color="primary"
                  expand="full"
                  shape="round"
                  size="large"
                  onClick={() => nextPath(item.path)}
                >
                  {item.title}
                </IonButton>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default memo(Home);
