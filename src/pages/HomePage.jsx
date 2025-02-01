import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonIcon,
  IonButton,
  IonButtons,
  IonTitle,
  IonCard,
  IonCardContent,
  IonAvatar,
  IonHeader,
  IonItem,
  IonItemOptions,
  IonItemOption,
  IonItemSliding,
  IonLabel,
  IonList,
  IonSpinner,
  IonToolbar,
} from "@ionic/react";
import { collection, query, getDocs } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebaseConfig";
import { pin, share, trash } from "ionicons/icons";
import "./Home.css";
import Header from "../components/HeaderPage";
import StockCard from "../components/TradingCards";
import NewHome from "../components/Home";

const Home = () => {
  const [combinedData, setCombinedData] = useState([]);
  const [value, loading, error] = useCollection(collection(db, "activeTrades")); // Now it's safe to access value.docs
  // if (value) {
  //   value.docs.forEach(doc => {
  //     console.log('Document data:', doc.data());
  //   });
  // }
  useEffect(() => {
    const fetchData = async () => {
      const activeTradesQuery = query(collection(db, "activeTrades"));
      const stockSnapshotQuery = query(collection(db, "stockSnapshot"));

      const [activeTradesSnapshot, stockSnapshotSnapshot] = await Promise.all([
        getDocs(activeTradesQuery),
        getDocs(stockSnapshotQuery),
      ]);

      const activeTrades = activeTradesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const stockSnapshots = stockSnapshotSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const combined = activeTrades
        .map((trade) => ({
          activeTrade: trade,
          stockSnapshot: stockSnapshots.find(
            (snapshot) => snapshot.symbol === trade.symbol
          ),
        }))
        .filter((item) => item.stockSnapshot); // Only include items that have matching data in both collections
      console.log(combined);
      setCombinedData(combined);
    };

    fetchData();
  }, []);
  if (error) {
    return <strong>Error: {JSON.stringify(error)}</strong>;
  }

  if (loading) {
    return <IonSpinner />;
  }

  return (
    <IonPage>
      <Header />
      <IonContent className="ion-padding">
        <IonCard className="balance-card">
          <IonCardContent>
            <div className="balance-info">
              <div>
                <p>Total Trading</p>
                <h2>$ 0</h2>
              </div>
              <div>
                <p>Gains</p>
                <h2>$ 0</h2>
              </div>
            </div>
          </IonCardContent>
        </IonCard>
        <div>
          {combinedData && combinedData.length > 0 ? (
            combinedData.map((doc) => (
              <div key={doc.activeTrade.id}>
                {/* Access document data here */}
                <StockCard StockData={doc} />
              </div>
            ))
          ) : (
            <p>No active trades found.</p>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
