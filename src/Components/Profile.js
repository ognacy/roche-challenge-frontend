import { memo, useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonListHeader,
} from "@ionic/react";
import { chevronBack, checkmarkCircleOutline, closeCircleOutline } from "ionicons/icons";
import { nextPath } from "../utils/Helpers";
import axios from "axios";
import { BASE_URL } from "../utils/ENV";

const Profile = () => {
  const [friends, setFriends] = useState();
  const [potentialFriends, setPotentialFriends] = useState();

  const user = {
    avatar_url: "",
    lastName: "Müller",
    displayedName: "Batman",
    optIn: true,
  }

  useEffect(() => {
    axios.get(`${BASE_URL}/friends`).then((response) => {
      setFriends(response.data.confirmed);
      setPotentialFriends(response.data.potential);
    });
  }, []);

  return (
    <>
      <IonPage className="profile">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Profile</IonTitle>
            <IonIcon
              icon={chevronBack}
              slot="start"
              size="large"
              color="primary"
              onClick={() => nextPath("/social-feed")}
            ></IonIcon>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonListHeader>
            <IonLabel>Potential friends</IonLabel>
          </IonListHeader>
          <IonList>
            {potentialFriends && potentialFriends.map((user, index) => (
              <IonItem key={index}>
                <IonLabel className="verticalAlignContent">
                  <img src={user.avatar_url} alt="profile" className="icon" />
                  {user.display_name}
                  <span className="button">
                  <IonIcon icon={closeCircleOutline} size="large" color="danger" />
                  <IonIcon icon={checkmarkCircleOutline} size="large" color="success" />
                  </span>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>

          <IonListHeader className="friends">
            <IonLabel>Friends</IonLabel>
          </IonListHeader>
          <IonList>
            {friends && friends.map((user, index) => (
              <IonItem key={index}>
              <IonLabel className="verticalAlignContent">
                <img src={user.avatar_url} alt="profile" className="icon" />
                {user.display_name}
              </IonLabel>
            </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
};

export default memo(Profile);
