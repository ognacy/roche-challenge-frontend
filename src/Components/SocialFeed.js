import { memo, useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon
} from "@ionic/react";
import {thumbsUp, heart, happy, sad, personCircle} from "ionicons/icons";
import axios from "axios";
import { BASE_URL } from "../utils/ENV";
import { nextPath } from "../utils/Helpers";

const SocialFeed = () => {
  const [stories, setStories] = useState();

  const dateFormat = (timestamp) => {
    const date = new Date(timestamp);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    return day + " - " + month + " - " + year;
  }

  const getReactions = (reactions) => {
    let hugCount = 0;
    let cryCount = 0;
    let smileCount = 0;
    let thumbsUpCount = 0;
    for (let index = 0; index < reactions.length; index++) {
      switch(reactions[index].reaction_type) {
        case "hug":
          hugCount += 1;
          break;
        case "cry":
          cryCount += 1;
          break;
        case "smile":
          smileCount += 1;
          break;
        case "thumbs up":
          thumbsUpCount += 1;
          break;
        default:
          break;
      }
    }
    const reactionsArray = [{
          count: cryCount,
          icon: sad,
        },
        {
          count: hugCount,
          icon: heart,
        },
        {
          count: smileCount,
          icon: happy,
        },
        {
          count: thumbsUpCount,
          icon: thumbsUp,
        },
    ]

    return reactionsArray;
  }

  const showReactions = (reactions) => {
    const reactionObject = getReactions(reactions);
    return (
      reactionObject.map((reaction, index) => (
        <>
        {reaction.count > 0 && (
          <IonCol className="removePadding">
            <IonIcon icon={reaction.icon}></IonIcon>
            <span> {reaction.count}</span>
          </IonCol>
        )}
        </>
      ))
    )
  }

  useEffect(() => {
    axios.get(`${BASE_URL}/stories`)
      .then(response => setStories(response.data.stories));
  }, [])

  if(!stories) return null;

  return (
    <IonPage className="socialFeed">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Social Feed</IonTitle>
          <IonIcon icon={personCircle} slot="end" size="large" color="primary" onClick={() => nextPath("/social-feed/profile")}></IonIcon>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {stories.map((user, index) => (
        <IonCard key={index}>
          <IonCardHeader>
            <IonCardSubtitle>
              <IonGrid className="removePadding">
                <IonRow>
                  <IonCol className="removePadding verticalAlignContent">
                    <img src={user.author_avatar_url} alt="profile" className="profileImg" />
                    <span>{user.author_display_name}</span>
                  </IonCol>
                  <IonCol className="removePadding alignRight">{dateFormat(user.timestamp)}</IonCol>
                </IonRow>
              </IonGrid>
            </IonCardSubtitle>
            <IonCardTitle color="primary">{user.title}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            {user.story_content}
            <div>
              <IonGrid className="removePadding">
                <IonRow className="reactionWidth">
                  {showReactions(user.reactions)}
                </IonRow>
              </IonGrid>
            </div>
          </IonCardContent>
        </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default memo(SocialFeed);
