// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider, AppCheck } from "firebase/app-check";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};



// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);
auth.useDeviceLanguage();

// Initialize Google Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize App Check
let appCheck: AppCheck | null = null;

if (typeof window !== 'undefined') {
  // Enable debug token in development
  if (process.env.NODE_ENV !== 'production') {
    // @ts-ignore - This is a valid property but TypeScript doesn't know about it
    window.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  }

  try {
    appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider('6LcnQuUqAAAAAJCFpjSw56iIq2IABtVifdNsRtml'),
      isTokenAutoRefreshEnabled: true
    });
    console.log('App Check initialized successfully');
  } catch (error) {
    console.error('Error initializing App Check:', error);
  }
}

// Create a wrapper to initialize App Check when needed
export const getAppCheck = () => {
  if (typeof window !== 'undefined' && !appCheck) {
    try {
      appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider('6LcnQuUqAAAAAJCFpjSw56iIq2IABtVifdNsRtml'),
        isTokenAutoRefreshEnabled: true
      });
      console.log('App Check initialized successfully');
    } catch (error) {
      console.error('Error initializing App Check:', error);
    }
  }
  return appCheck;
};

export { auth, app, googleProvider };