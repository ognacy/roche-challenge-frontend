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
  IonIcon,
} from "@ionic/react";
import {
  thumbsUp,
  thumbsUpOutline,
  heart,
  heartOutline,
  happy,
  happyOutline,
  sad,
  sadOutline,
  personCircle,
  chevronBack,
} from "ionicons/icons";
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
  };

  const getReactions = (reactions) => {
    let hugCount = 0;
    let cryCount = 0;
    let smileCount = 0;
    let thumbsUpCount = 0;
    for (let index = 0; index < reactions.length; index++) {
      switch (reactions[index].reaction_type) {
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
    const reactionsArray = [
      {
        count: cryCount,
        icon: sad,
        iconOutline: sadOutline,
        isReacted: false,
      },
      {
        count: hugCount,
        icon: heart,
        iconOutline: heartOutline,
        isReacted: false,
      },
      {
        count: smileCount,
        icon: happy,
        iconOutline: happyOutline,
        isReacted: false,
      },
      {
        count: thumbsUpCount,
        icon: thumbsUp,
        iconOutline: thumbsUpOutline,
        isReacted: false,
      },
    ];
    return reactionsArray;
  };

  const addReaction = (reaction, user) => {
    let newStories = [...stories];
    let indexUser = newStories.indexOf(user);
    let prepReactions = newStories[indexUser].preparedReactions;
    for (let index = 0; index < prepReactions.length; index++) {
      if (prepReactions[index].icon === reaction.icon) {
        let isReacted =
          newStories[indexUser].preparedReactions[index].isReacted;
        newStories[indexUser].preparedReactions[index].isReacted = !isReacted;
        !isReacted
          ? (newStories[indexUser].preparedReactions[index].count += 1)
          : (newStories[indexUser].preparedReactions[index].count -= 1);
      }
    }
    setStories([...newStories]);
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/stories`).then((response) => {
      let newStories = response.data.stories;
      for (let index = 0; index < newStories.length; index++) {
        let reactionsArray = getReactions(newStories[index].reactions);
        newStories[index].preparedReactions = reactionsArray;
      }
      setStories([...newStories]);
    });
  }, []);

  if (!stories) return null;

  return (
    <IonPage className="socialFeed">
      <IonHeader>
        <IonToolbar>
          <IonIcon
            icon={chevronBack}
            slot="start"
            size="large"
            color="primary"
            onClick={() => nextPath("/")}
          ></IonIcon>
          <IonTitle>Social Feed</IonTitle>
          <IonIcon
            icon={personCircle}
            slot="end"
            size="large"
            color="primary"
            onClick={() => nextPath("/social-feed/profile")}
          ></IonIcon>
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
                      <img
                        src={user.author_avatar_url}
                        alt="profile"
                        className="profileImg"
                      />
                      <span>{user.author_display_name}</span>
                    </IonCol>
                    <IonCol className="removePadding alignRight">
                      {dateFormat(user.timestamp)}
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardSubtitle>
              <IonCardTitle color="primary">{user.title}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <span>{user.story_content}</span>
              <div>
                <IonGrid className="removePadding">
                  <IonRow className="reactionWidth">
                    {user.preparedReactions.map((reaction, index) => (
                      <>
                        {/* {reaction.count > 0 && ( */}
                        <IonCol className="removePadding">
                          <IonIcon
                            icon={
                              reaction.isReacted
                                ? reaction.icon
                                : reaction.iconOutline
                            }
                            onClick={() => {
                              addReaction(reaction, user);
                            }}
                          ></IonIcon>
                          <span> {reaction.count}</span>
                        </IonCol>
                        {/* )} */}
                      </>
                    ))}
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
