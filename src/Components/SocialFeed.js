import { memo } from "react";
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

const Home = () => {
  const blog = [
    {
      stories: {
        timestamp: new Date("2021-09-25T09:34:05.996Z"),
        author_id: "lol123",
        author_display_name: "nice",
        title: "title",
        story_content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        reactions: [
          {
            reaction_type: "hug",
            reaction_user_id: "string",
            reaction_display_name: "string",
          },
          {
            reaction_type: "hug",
            reaction_user_id: "string",
            reaction_display_name: "string",
          },
          {
            reaction_type: "smile",
            reaction_user_id: "string",
            reaction_display_name: "string",
          },
          {
            reaction_type: "hug",
            reaction_user_id: "string",
            reaction_display_name: "string",
          },
          {
            reaction_type: "cry",
            reaction_user_id: "string",
            reaction_display_name: "string",
          },
          {
            reaction_type: "thumbs up",
            reaction_user_id: "string",
            reaction_display_name: "string",
          },
        ],
      },
    },
    {
      stories: {
        timestamp: new Date("2021-09-25T09:34:05.996Z"),
        author_id: "string",
        author_display_name: "string",
        title: "title",
        story_content: "string",
        reactions: [
          {
            reaction_type: "hug",
            reaction_user_id: "string",
            reaction_display_name: "string",
          },
        ],
      },
    },
    {
      stories: {
        timestamp: new Date("2021-09-25T09:34:05.996Z"),
        author_id: "lol123",
        author_display_name: "nice",
        title: "title",
        story_content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        reactions: [
          {
            reaction_type: "hug",
            reaction_user_id: "string",
            reaction_display_name: "string",
          },
        ],
      },
    },
  ];

  const dateFormat = (timestamp) => {
    let date = timestamp;
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

  return (
    <IonPage className="socialFeed">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Social Feed</IonTitle>
          <IonIcon icon={personCircle} slot="end" size="large" color="primary"></IonIcon>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {blog.map((user) => (
        <IonCard key={user.stories.author_id}>
          <IonCardHeader>
            <IonCardSubtitle>
              <IonGrid className="removePadding">
                <IonRow>
                  <IonCol className="removePadding">{user.stories.author_display_name}</IonCol>
                  <IonCol className="removePadding alignRight">{dateFormat(user.stories.timestamp)}</IonCol>
                </IonRow>
              </IonGrid>
            </IonCardSubtitle>
            <IonCardTitle color="primary">{user.stories.title}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            {user.stories.story_content}
            <div>
              <IonGrid className="removePadding">
                <IonRow className="reactionWidth">
                  {showReactions(user.stories.reactions)}
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

export default memo(Home);
