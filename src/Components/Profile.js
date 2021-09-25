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
  IonGrid,
  IonRow,
  IonCol,
  IonToggle,
} from "@ionic/react";
import {
  chevronBack,
  checkmarkCircleOutline,
  closeCircleOutline,
  personCircle,
} from "ionicons/icons";
import { nextPath } from "../utils/Helpers";
import axios from "axios";
import { BASE_URL } from "../utils/ENV";

const Profile = () => {
  const [friends, setFriends] = useState();
  const [potentialFriends, setPotentialFriends] = useState();
  const [checked, setChecked] = useState(true);

  const user = {
    avatar_url: null,
    lastName: "Müller",
    displayedName: "Batman",
    optIn: true,
  };

  const removeUserFromPotentialFriends = (friend) => {
    let newPotentialFriends = [...potentialFriends];
    let index = newPotentialFriends.indexOf(friend);
    newPotentialFriends.splice(index, 1);
    setPotentialFriends([...newPotentialFriends]);
  }

  const addUserToFriends = (friend) => {
    let newPotentialFriends = [...potentialFriends];
    let index = newPotentialFriends.indexOf(friend);
    newPotentialFriends.splice(index, 1);
    setPotentialFriends([...newPotentialFriends]);
    setFriends([...friends, friend]);
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
          <IonGrid>
            <IonRow>
              <IonCol size={4} size-lg>
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt="avatar" className="avatar" />
                ) : (
                  <IonIcon icon={personCircle} className="avatar"></IonIcon>
                )}
              </IonCol>
              <IonCol
                size={8}
                size-lg
                className="verticalAlignContent username"
              >
                {user.lastName}
                <br />
                {user.displayedName}
              </IonCol>
            </IonRow>
            <IonRow className="optIn">
              <IonCol size={9} size-lg className="label">
                <IonLabel>
                  Do you want give your contact to other members which seems to
                  fit to you?
                </IonLabel>
              </IonCol>
              <IonCol size={2} size-lg  className="verticalAlignContent toggle">
                <IonToggle
                  checked={checked}
                  onIonChange={(e) => setChecked(e.detail.checked)}
                />
              </IonCol>
            </IonRow>
          </IonGrid>

          <IonListHeader>
            <IonLabel>Potential friends</IonLabel>
          </IonListHeader>
          <IonList>
            {potentialFriends &&
              potentialFriends.map((friend, index) => (
                <IonItem key={index}>
                  <IonLabel className="verticalAlignContent">
                    <img src={friend.avatar_url} alt="profile" className="icon" />
                    {friend.display_name}
                    <span className="button">
                      <IonIcon
                        icon={closeCircleOutline}
                        size="large"
                        color="danger"
                        onClick={() => removeUserFromPotentialFriends(friend)}
                      />
                      <IonIcon
                        icon={checkmarkCircleOutline}
                        size="large"
                        color="success"
                        onClick={() => addUserToFriends(friend)}
                      />
                    </span>
                  </IonLabel>
                </IonItem>
              ))}
          </IonList>

          <IonListHeader className="friends">
            <IonLabel>Friends</IonLabel>
          </IonListHeader>
          <IonList>
            {friends &&
              friends.map((friend, index) => (
                <IonItem key={index}>
                  <IonLabel className="verticalAlignContent">
                    <img src={friend.avatar_url} alt="profile" className="icon" />
                    {friend.display_name}
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
