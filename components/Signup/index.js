import React, { useEffect, useState } from "react";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import "./styles.scss";
import AuthWrapper from "../AuthWrapper/index";

import { useDispatch, useSelector } from "react-redux";
import {  signUpUserStart } from "../../redux/User/user.actions";
import { useHistory } from "react-router";

const Signup = (props) => {

  const history = useHistory()
  const [displayName, setdisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

const currentUser = useSelector(state => state.user.currentUser)
const userErr = useSelector(state => state.user.userErr)
const dispatch = useDispatch()


useEffect(()=> {

if(currentUser)
{
    history.push('/')
}


},[currentUser])


useEffect (() => {

if(userErr.length > 0){

setErrors(userErr)

}


}, [userErr])



  const handleFormSubmit = (e) => {
    e.preventDefault();


 dispatch(signUpUserStart({ displayName, email, password, confirmPassword}) )


  };

  const configAuthWrapper = {
    headline: "Registration",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return <li key={index}>{err}</li>;
            })}
          </ul>
        )}

        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Full name"
            handleChange={(e) => setdisplayName(e.target.value)}
          />

          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
             handleChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={(e) => setPassword(e.target.value)}
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            handleChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button type="submit">Register </Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default Signup;
