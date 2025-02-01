import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonCard,
  IonToast,
  IonLoading,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,IonButtons,
  IonInput,IonBackButton,
  IonCardContent,
} from "@ionic/react";
import { home, person, settings, settingsOutline } from "ionicons/icons";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../firebaseConfig";
import { db } from "../../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";
// import Profile from "../components/Profile";

const VerifyProfilePage = () => {
  const [user] = useAuthState(auth);
  const [isShow, setIsShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (!user) {
      history.push("/login");
    } else {
      // Fetch user data
      const fetchUserData = async () => {
        const docRef = doc(db, 'CustomUser', user.uid);
        const docSnap = await getDoc(docRef);
        console.log('docSnap:', docSnap.data());
        setEmail(user.email);
        setUserName(user.displayName);
        setAddress(docSnap.data()?.Address || '');
        setIdNumber(docSnap.data()?.IDVal || '');
        setMobileNumber(docSnap.data()?.PhoneNo || '');
        if (docSnap.exists()) {
          setIsShow(true);
          setToastMessage('Verification request already submitted.');
          setShowToast(true);
          setLoading(false);
          return;
        }
      };

      fetchUserData();
    }

    // Cleanup function
    return () => {
      // Clean up any subscriptions or side effects here
    };
  }, [user, history]); // Dependencies array 
  // const handleLogout = () => {
  //   auth.signOut().then(() => {
  //     history.push("/login");
  //   });
  // };

  const saveDetailsToFirestore = async () => {
    if (!idNumber || !userName || !address || !email || !mobileNumber) {
      setToastMessage('Please provide all details.');
      setShowToast(true);
      return;
    }
    setLoading(true);
    try {
      // const user = auth.currentUser;
      if (!user) throw new Error('No user logged in');
      await setDoc(doc(db, 'CustomUser', user.uid), {
        Address : address,
        Email: email,
        IDVal:idNumber,
        PhoneNo:mobileNumber,
        UserName: userName,
        UserStatus:0,
        UserStatusText:'',
        UserType: "Registered",
        submittedAt: new Date()
      });
      setToastMessage('Details saved successfully!');
      setShowToast(true);
      // setIdNumber('');  
      setIsShow(true);
    } catch (error) {
      console.error('Error saving details:', error);
      setToastMessage('Error saving details. Please try again.');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/profile" />
          </IonButtons>
          <IonTitle>Verify Profile</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/edit-profile">
              <IonIcon icon={settingsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Register to have US $100.00 in your account for trading live stocks?</p>
        <p>Fill the below details and upload ID such as a Driver's License to start</p> 
        <IonCard>
          <IonItem>
            <IonInput
                disabled={isShow}
              label="User Name"
              labelPlacement="stacked"
              placeholder="Enter User Name"
              value={userName}
              onIonChange={(e) => setUserName(e.detail.value)}
              type="text"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
                disabled={isShow}
              label="Address"
              labelPlacement="stacked"
              placeholder="Enter Address"
                // disabled
                value={address}
                onIonChange={(e) => setAddress(e.detail.value)}
                type="text"
              ></IonInput>
              </IonItem>
              <IonItem>
              <IonInput
                disabled={isShow}
                label="ID Number"
                labelPlacement="stacked"
                placeholder="Enter Driver's License Number"
                value={idNumber}
                onIonChange={(e) => setIdNumber(e.detail.value)}
                type="text"
              ></IonInput>
              </IonItem>
              <IonItem>
              <IonInput
              disabled
                label="Email Address"
                labelPlacement="stacked"
                placeholder="Enter Email Address"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value)}
                type="email"
              ></IonInput>
              </IonItem>
              <IonItem>
              <IonInput
                disabled={isShow}
                label="Mobile Number"
                labelPlacement="stacked"
                value={mobileNumber}
                onIonChange={(e) => setMobileNumber(e.detail.value)}
                type="tel"
                placeholder="888-888-8888"
              ></IonInput>
              </IonItem>
              <IonLoading isOpen={loading} message="Submitting verification..." />
              <IonToast
              isOpen={showToast}
              onDidDismiss={() => setShowToast(false)}
              message={toastMessage}
              duration={3000}
              />
            </IonCard>
            {isShow && <p>We are in the process of verifying... Please check back to view your status.</p>}
            <IonButton expand="block" onClick={saveDetailsToFirestore} 
                disabled={isShow}>
              Submit
            </IonButton>
            {/* <IonButton expand="block" onClick={handleLogout}>
              Logout
            </IonButton> */}
      </IonContent>
    </IonPage>
  );
};

export default VerifyProfilePage;
