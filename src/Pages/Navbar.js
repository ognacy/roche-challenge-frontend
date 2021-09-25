import { memo } from "react";
import { useLocation } from "react-router";
import { IonButton, IonGrid, IonRow, IonCol } from "@ionic/react";
import { menu, nextPath } from "../utils/Helpers";

const Navbar = () => {
  const location = useLocation();

  const isPath = (nav) => {
    if ((location.pathname !== "/") & (nav.path === "/")) {
      return false;
    }
    if (!location.pathname.includes(nav.path)) {
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
        </IonRow>
      </IonGrid>
    </>
  );
};

export default memo(Navbar);
