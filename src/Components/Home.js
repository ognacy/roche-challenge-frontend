import { memo } from "react";
import {
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonPage,
  IonIcon,
} from "@ionic/react";
import { menu, nextPath } from "../utils/Helpers";
import { call } from "ionicons/icons";
import main_picture from "../assets/main_picture.jpg";

const Home = () => {
  return (
    <>
      <IonPage className="mainPage">
        <IonContent>
          <div className="horizontalAlignContent">
            <img src={main_picture} alt="main" className="picture" />
          </div>
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
            <IonRow>
              <IonCol>
                <IonButton
                  color="success"
                  expand="full"
                  shape="round"
                  size="large"
                >
                  <IonIcon icon={call} className="icon" />
                  Trouble? Call us
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default memo(Home);
