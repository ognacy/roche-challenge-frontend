import { memo } from "react";
import { useLocation } from "react-router";
import { IonButton, IonGrid, IonRow, IonCol } from "@ionic/react";

const Navbar = () => {
  const location = useLocation();
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
  }

  const isPath = (nav) => {
    if ((location.pathname !== "/") & (nav.path === "/")) {
      return false;
    }
    if (location.pathname !== nav.path) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <IonGrid className="menu">
        <IonRow>
          {menu.map((item, index) => (
            <IonCol key={index}>
              <IonButton
                color="primary"
                expand="full"
                shape="round"
                fill={!isPath(item) ? "outline" : 'solid'}
                onClick={() => nextPath(item.path)}
              >
                {item.title}
              </IonButton>
            </IonCol>
          ))}
          {/* <IonCol>
            <IonButton color="primary" expand="full" shape="round" fill="outline">Chatbot</IonButton>
          </IonCol>
          <IonCol>
            <IonButton color="primary" expand="full" shape="round">Social feed</IonButton>
          </IonCol>
          <IonCol>
            <IonButton color="primary" expand="full" shape="round">Visualizations</IonButton>
          </IonCol> */}
        </IonRow>
      </IonGrid>
    </>
  );
};

export default memo(Navbar);
