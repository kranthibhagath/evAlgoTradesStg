import React, { useState, useEffect } from "react";
import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonButton,
  IonText,
  IonChip,
  IonProgressBar,
  IonActionSheet,
  IonContent,useIonAlert,
} from "@ionic/react";
import { logoApple, arrowUp, arrowDown, statsChartOutline, logoGoogle, trendingDown, trendingUp } from "ionicons/icons";
import "./StockCard.css"; // We'll create this CSS file next
import { useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig"; // Adjust the import path as needed
import { db } from "../../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { signInWithGoogle } from '../login/signInWithGoogle'; // Adjust the import path as needed

import LoginPage from "../login"; 

const StockCard = ({ StockData }) => {
  
  const [user] = useAuthState(auth);
  const history = useHistory();
  const [presentAlert] = useIonAlert();
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionType, setActionType] = useState("");
  const currentPrice=StockData.stockSnapshot.snapshot[StockData.stockSnapshot.symbol].minuteBar.c;
  const OpenPrice=StockData.stockSnapshot.snapshot[StockData.stockSnapshot.symbol].minuteBar.o;
  const DailyBarValue=(((currentPrice - OpenPrice)/currentPrice) * 100).toFixed(2);
  const isPositive = DailyBarValue >= 0;
  
  const PreCurrentPrice=StockData.stockSnapshot.snapshot[StockData.stockSnapshot.symbol].prevDailyBar.c;
  const PrevOpenPrice=StockData.stockSnapshot.snapshot[StockData.stockSnapshot.symbol].prevDailyBar.o;
  const PrevDailyBarValue=(((PreCurrentPrice - PrevOpenPrice)/PreCurrentPrice) * 100).toFixed(2);
  const PrevisPositive = PrevDailyBarValue >= 0;
  const handleAction = (type) => {
    if (user) {
      // User is logged in, proceed with the action
      const fetchUserData = async () => {
        const docRef = doc(db, "CustomUser", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          presentAlert({
            header: "Action Confirmation",
            message:
              "You are already logged in. we are verifying your documents before wait for update.",
            buttons: [
              "Cancel",
              // { text: 'Verify', handler: () => history.push('/profile') },
            ],
          });
          return;
        } else {
          presentAlert({
            header: "Action Confirmation",
            message:
              "You are already logged in. Please verify your documents before proceeding.",
            buttons: [
              "Cancel",
              { text: "Verify", handler: () => history.push("/verify-profile") },
            ],
          });
        }
      };

      fetchUserData();
      // });
      console.log(
        `Performing ${type} action for ${StockData.activeTrade.symbol}`
      );
      // Add your buy/sell logic here
    } else {
      // User is not logged in, show action sheet
      setActionType(type);
      setShowActionSheet(true);
    }
  };

  return (
    <IonCard className="stock-card">
      <IonCardContent>
        <div className="evaigo-overall">
          <IonProgressBar style={{'marginRight': '10px'}}
          value={StockData.activeTrade.strength / 100}
          color="primary"
        ></IonProgressBar>
          <IonIcon icon={statsChartOutline} color="success" />
        </div>
        <div className="stock-info">
          <div className="stock-details">
            <IonText color="dark">
              <h4 style={{fontSize:'20px', fontWeight:'700'}}>{StockData.activeTrade.symbol}</h4>
              <h3>${StockData.stockSnapshot.snapshot[StockData.stockSnapshot.symbol].minuteBar.c}</h3>
              
            </IonText>
            <IonText color={isPositive ? "success" : "danger"}>
              <p>
                <IonIcon icon={isPositive ? trendingUp : trendingDown} />
                {` ${DailyBarValue} %`}
              </p>
            </IonText>
            <IonText color="medium">
              <p  style={{ fontSize: 'xx-small'}}>Last Day  
                <IonText color={PrevisPositive ? "success" : "danger"}>
                    <IonIcon icon={PrevisPositive ? trendingUp : trendingDown} />
                    {` ${PrevDailyBarValue} %`}
              </IonText></p>
            </IonText>
          </div>
          <div className="stock-price">
            <IonText color="dark">
              <p># of Trades: 0</p>
              <p>Gain: 400 %</p>
              <p></p>
            </IonText>
          </div>
        </div>
        <div className="stock-actions">
          <IonButton expand="block" fill={StockData.activeTrade.method === 'buy'?'solid':'outline'} onClick={() => handleAction("Buy")} color="primary" className="" size="small" disabled={StockData.activeTrade.method === 'sell'}>
            {/* <IonIcon icon={arrowDown} slot="start" /> */}
            Buy
          </IonButton>
          <IonButton fill={StockData.activeTrade.method === 'sell'?'solid':'outline'} onClick={() => handleAction("Sell")} color="primary" className="" size="small" disabled={StockData.activeTrade.method === 'buy'}>
            {/* <IonIcon icon={arrowUp} slot="start" /> */}
            Sell
          </IonButton>
        </div>
        <IonActionSheet
        isOpen={showActionSheet}
        onDidDismiss={() => setShowActionSheet(false)}
        header={`${actionType.charAt(0).toUpperCase() + actionType.slice(1)} ${StockData.activeTrade.symbol}`}
        buttons={[
          {
            text: 'Sign in with Google',
            icon: logoGoogle,
            handler: async() => {
              await signInWithGoogle();
              // history.push('/verify-profile');
              setShowActionSheet(false);
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
          }
        ]}
      >
        <IonContent>
          <LoginPage />
        </IonContent>
      </IonActionSheet>
      </IonCardContent>
    </IonCard>
  );
};

export default StockCard;
