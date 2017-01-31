import {AuthMethods, AuthProviders} from "angularfire2";

export const firebaseConfig = {
	apiKey: "AIzaSyB2YwyuJ3JiXAUPfHw7IW3d1maQxv47Xp0",
  authDomain: "trip-732e5.firebaseapp.com",
  databaseURL: "https://trip-732e5.firebaseio.com",
  storageBucket: "trip-732e5.appspot.com",
}

export const authConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};