import React, {useState} from "react";
import { Button } from "../../../components/Button/index.js";
import { ButtonText } from "../../../components/ButtonText/index.js";
import { Frame } from "../../../components/Frame/index.js";
import { PasswordValidation } from "../../../components/PasswordValidation/index.js";
import { HeroiconsOutlineEye } from "../../../assets/HeroiconsOutlineEye/index.js";
import { SocialIconFacebook1 } from "../../../assets/SocialIconFacebook1/index.js";
import { SocialIconMicrosoft1 } from "../../../assets/SocialIconMicrosoft1/index.js";
import "./style.css";

export const SignUpTela = () => {
  const [password, setPassword] = useState("");

  const handleSocialSignUp = (provider) => {
    console.log(`Sign up with ${provider}`);
    // Implement social sign up logic here
  };

  const handleNavigation = (page) => {
    console.log(`Navigating to: ${page}`);
    // Implement navigation logic here
  };

  const handleSignUp = () => {
    console.log('Sign Up clicked');
    // Implement sign up logic here
  };

  const handleSignIn = () => {
    console.log('Sign In clicked');
    // Implement sign in logic here
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  return (
    <div className="sign-up-tela">
      <div className="div-2">
        <div className="frame-3">
          <button
            className="social-button frame-4"
            onClick={() => handleSocialSignUp('Google')}
          >
            <div className="frame-5">
              <img
                className="google"
                alt="Google"
                src="https://c.animaapp.com/0GDfPFQy/img/icons8-google-1.svg"
              />
              <div className="text-wrapper-3">Sign up with Google</div>
            </div>
          </button>

          <button
            className="social-button frame-6"
            onClick={() => handleSocialSignUp('Facebook')}
          >
            <div className="frame-5">
              <SocialIconFacebook1 className="icon-instance-node" />
              <div className="text-wrapper-4">Sign up with Facebook</div>
            </div>
          </button>

          <button
            className="social-button frame-6"
            onClick={() => handleSocialSignUp('Microsoft')}
          >
            <div className="frame-5">
              <SocialIconMicrosoft1 className="icon-instance-node" />
              <div className="text-wrapper-5">Sign up with Microsoft</div>
            </div>
          </button>
        </div>

        <div className="frame-7">
          <Frame
            className="frame-55"
            divClassName="frame-55-instance"
            divClassName1="frame-9"
            divClassNameOverride="frame-8"
            frameClassName="frame-instance"
            frameClassNameOverride="design-component-instance-node"
            text="Username"
          />
          <Frame
            className="frame-55"
            divClassName="frame-55-instance"
            divClassName1="frame-9"
            divClassNameOverride="frame-8"
            frameClassName="frame-instance"
            frameClassNameOverride="frame-10"
            text="Email"
          />
          <Frame
            className="frame-55"
            divClassName="frame-55-instance"
            divClassName1="frame-9"
            divClassNameOverride="frame-8"
            frameClassName="frame-instance"
            frameClassNameOverride="frame-10"
            text="Password"
            onInputChange={handlePasswordChange}
            type="password"
          />
          <PasswordValidation
            className="password-validation-instance"
            conditionDivClassName="password-validation-3"
            conditionDivClassName1="password-validation-3"
            conditionDivClassNameOverride="password-validation-3"
            conditionLabel="8 caracteres"
            conditionLabel1="1 número"
            conditionLabel2="1 símbolo"
            progressClassName="password-validation-2"
            status="unvalidated"
            password={password}
          />
          <Button
            className="button-instance"
            divClassName="button-3"
            property1="large"
            property2="primary"
            property3="text-only"
            property4="default"
            text="Continue"
          />
          <p className="by-using-blablabla">
            <span className="span">By using blablabla, you agree with the </span>
            <span className="text-wrapper-6">terms</span>
            <span className="span"> and </span>
            <span className="text-wrapper-6">conditions</span>
          </p>
          <HeroiconsOutlineEye className="heroicons-outline" />
        </div>

        <div className="overlap-group">
          <div className="frame-11">
            <div className="header-light-left">
              <div className="frame-12">
                <ButtonText
                  className="button-text-instance"
                  divClassName="button-text-2"
                  icon="off"
                  iconOnly="off"
                  text="Inicio"
                  theme="light"
                  type="squre"
                  onClick={() => handleNavigation('home')}
                />
                <ButtonText
                  className="button-text-instance"
                  divClassName="button-text-2"
                  icon="off"
                  iconOnly="off"
                  text="Minhas Leituras"
                  theme="light"
                  type="squre"
                  onClick={() => handleNavigation('readings')}
                />
                <ButtonText
                  className="button-text-instance"
                  divClassName="button-text-2"
                  icon="off"
                  iconOnly="off"
                  text="Dashboard"
                  theme="light"
                  type="squre"
                  onClick={() => handleNavigation('dashboard')}
                />
                <ButtonText
                  className="button-text-instance"
                  divClassName="button-text-2"
                  icon="off"
                  iconOnly="off"
                  text="Configurações"
                  theme="light"
                  type="squre"
                  onClick={() => handleNavigation('settings')}
                />
              </div>
              <button className="button-wrapper" onClick={handleSignUp}>
                <button className="button-4">Sign Up</button>
              </button>
              <button className="button-5" onClick={handleSignIn}>
                <button className="button-6">Sign In</button>
              </button>
            </div>
            <div className="text-wrapper-7">Inscreva-se</div>
          </div>
          <img
            className="logo-transparent"
            alt="Logo transparent"
            src="https://c.animaapp.com/0GDfPFQy/img/logo-transparent-1.png"
          />
        </div>
      </div>
    </div>
  );
};