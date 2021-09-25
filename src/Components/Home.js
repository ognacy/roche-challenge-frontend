import { memo } from 'react';
import { IonButton } from '@ionic/react';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <IonButton color="primary" >Primary</IonButton>
    </div>
  )
}

export default memo(Home);