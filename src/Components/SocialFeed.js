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
  IonCol
} from "@ionic/react";

const Home = () => {
  const blog = [
    {
      stories: {
        timestamp: "2021-09-25T09:34:05.996Z",
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
        ],
      },
    },
    {
      stories: {
        timestamp: "2021-09-25T09:34:05.996Z",
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
        timestamp: "2021-09-25T09:34:05.996Z",
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
    let date = new Date(timestamp);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    return day + " - " + month + " - " + year;
  }

  return (
    <IonPage className="socialFeed">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Social Feed</IonTitle>
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
            <IonCardTitle>{user.stories.title}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            {user.stories.story_content}
          </IonCardContent>
        </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default memo(Home);
