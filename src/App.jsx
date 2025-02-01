import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, person, settings,  ellipsisHorizontal, ellipsisVertical, personCircle, search  } from 'ionicons/icons';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig';
// import config from './firebaseConfig';
// import LoginPage from './LoginPage';
// import HomePage from './HomePage';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import Header from './components/HeaderPage.jsx';
import Layout from './components/Layout.jsx';
import EditProfilePage from './components/Profile/EditProfilePage.jsx';
import VerifyProfilePage from './components/Profile/VerifyProfilePage.jsx';
// import Tab1 from './pages/Tab1';
// import Tab2 from './pages/Tab2';
// import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App = () => {  
  // const [user, loading] = useAuthState(auth);
  // console.log(user);
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <IonApp>
    <IonReactRouter>
      {/* <Layout> */}
        <IonRouterOutlet>
          <Route exact path="/home" render={() => <HomePage />} />
          <Route exact path="/profile" render={() => <ProfilePage />} />
          <Route exact path="/login" render={() => <LoginPage />} />
          <Route path="/edit-profile" render={()=> <EditProfilePage/>} exact />
          <Route path="/verify-profile" render={()=> <VerifyProfilePage/>} exact />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      {/* </Layout> */}
    </IonReactRouter>
  </IonApp>
  )
};

export default App;
