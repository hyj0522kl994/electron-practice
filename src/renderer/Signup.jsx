import React from "react";
import { Link, hashHistory } from "react-router";
import Errors from "./Errors";
import firebase from "firebase/firebase-browser";

const SIGNUP_FORM_STYLE = {
  margin: "0 auto",
  padding: 30
};

const CANCEL_BUTTON_STYLE = {
  marginLeft: 10
};

export default class Signup extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      errors: []
    };
    this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
    this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
    this.handleOnChangeName = this.handleOnChangeName.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleOnChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleOnChangeName(e) {
    this.setState({ name: e.target.value });
  }


  // 가입 처리
  handleOnSubmit(e) {
    const { email, password, name, photoURL } = this.state;
    const errors = [];
    let isValid = true;
    e.preventDefault();
    if (!email.length) {
      isValid = false;
      errors.push("Email address cann't be blank.");
    }
    if (!password.length) {
      isValid = false;
      errors.push("Password cann't be blank.");
    }
    if (!name.length) {
      isValid = false;
      errors.push("Name cann't be blank.");
    }
    if (!isValid) {
      // 필수 입력 유효성 검사를 통과하지 못하면 오류 출력하기
      this.setState({ errors });
      return;
    }
    // Firebase 신규 계정 생성 처리
    firebase.auth().createUserWithEmailAndPassword(email, password).then(newUser => {
      // 사용자 정보 변경하기
      return newUser.updateProfile({
        displayName: name
      });
    }).then(() => {
      // 라디오 목록 화면으로 이동하기
      hashHistory.push("/login");
    }).catch(err => {
      // Firebase에서 오류가 발생하면 오류 메시지 출력하기
      this.setState({ errors: [err.message] });
    });
  }

  render(){
    return(
      <form style={SIGNUP_FORM_STYLE} onSubmit={this.handleOnSubmit}>
        <Errors errorMessages={this.state.errors} />
        <div className="form-group">
          <label>Email address*</label>
          <input
            type="email"
            className="form-control"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleOnChangeEmail}
          />
        </div>
        <div className="form-group">
          <label>Password*</label>
          <input
            type="password"
            className="form-control"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleOnChangePassword}
          />
        </div>
        <div className="form-group">
          <label>User name*</label>
          <input
            type="text"
            className="form-control"
            placeholder="user name"
            value={this.state.name}
            onChange={this.handleOnChangeName}
           />
        </div>
        <div className="form-group">
          <button className="btn btn-large btn-primary">Create new account</button>
          <Link to="/login">
            <button
              type="button"
              style={CANCEL_BUTTON_STYLE}
              className="btn btn-large btn-default"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    );
  }
}
