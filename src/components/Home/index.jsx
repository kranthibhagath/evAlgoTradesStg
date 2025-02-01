import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react';
import { menuOutline, notificationsOutline } from 'ionicons/icons';
import './Home.css';

const Home = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonIcon slot="start" icon={menuOutline} />
          <IonTitle>Home</IonTitle>
          <IonIcon slot="end" icon={notificationsOutline} />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-padding">
          <p className="greeting">Morning,</p>
          <h1 className="name">Brooklyn Simmons</h1>

          <IonCard className="balance-card">
            <IonCardContent>
              <div className="balance-info">
                <div>
                  <p>Balance</p>
                  <h2>$7,900.00</h2>
                </div>
                <div>
                  <p>Monthly profit</p>
                  <h2>$10,274</h2>
                </div>
              </div>
            </IonCardContent>
          </IonCard>

          <IonSegment value="myInvest">
            <IonSegmentButton value="myInvest">
              <IonLabel>My Invest</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="portfolio">
              <IonLabel>Portfolio</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          <IonList>
            <IonItem>
              <div className="stock-icon odn"></div>
              <IonLabel>
                <h2>ODN</h2>
                <p>Odeon Inc.</p>
              </IonLabel>
              <div slot="end" className="stock-info">
                <strong>$680.00</strong>
                <p className="positive">+1.27%</p>
              </div>
            </IonItem>
            <IonItem>
              <div className="stock-icon ggs"></div>
              <IonLabel>
                <h2>GGS</h2>
                <p>Ganteng Inc.</p>
              </IonLabel>
              <div slot="end" className="stock-info">
                <strong>$720.00</strong>
                <p className="positive">+2.40%</p>
              </div>
            </IonItem>
            <IonItem>
              <div className="stock-icon kri"></div>
              <IonLabel>
                <h2>KRI</h2>
                <p>Korion Inc.</p>
              </IonLabel>
              <div slot="end" className="stock-info">
                <strong>$490.00</strong>
                <p className="negative">-0.44%</p>
              </div>
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
