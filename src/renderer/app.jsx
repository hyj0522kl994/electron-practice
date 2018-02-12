import React from "react";
import { render } from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import Login from "./Login";
import Signup from "./Signup";
import Radios from "./Radios";
import Radio from "./Radio";
import apitest from "./apitest";
import firebase from "firebase/firebase-browser";

//firebase 초기화하기

  var config = {
    apiKey: "AIzaSyCFk7UUwWQfCmBowx6W2-cZcSj5kkqfVtk",
    authDomain: "radio-chat-3a94b.firebaseapp.com",
    databaseURL: "https://radio-chat-3a94b.firebaseio.com",
    projectId: "radio-chat-3a94b",
    storageBucket: "radio-chat-3a94b.appspot.com",
    messagingSenderId: "786475614806"
  };
  firebase.initializeApp(config);

//Routing 정의하기
const appRouting=(
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
      <Route path="apitest" component={apitest} />
      <Route path="radios" component={Radios} >
        <Route path =":radioId" component={Radio} />
      </Route>
    </Route>
  </Router>
);

//Routing 초기화 하기
if (!location.hash.length){
  location.hash = "#/login";
}


//application 렌더링하기
render(appRouting, document.getElementById("app"));
