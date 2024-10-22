import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Fontisto } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import firebase from "firebase/app";
import { FirebaseError } from "firebase/app";

// formik
import { Formik } from "formik";

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  Colors,
  StyledButton,
  ButtonText,
  MessageBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from "../../styles/styles";

import MyTextInput from "@/components/MyTextInput";
import MyPasswordInput from "@/components/MyPasswordInput";
import { auth } from "@/firebaseConfig";
import "firebase/auth";
import { AuthErrorCodes, signInWithEmailAndPassword, User } from "firebase/auth";
import { LoginScreenNavigationProp } from "../../types";

interface Props {
  navigation: LoginScreenNavigationProp;
}

//Colors
const { darkLight, primary } = Colors;

const Login: React.FC<Props> = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
       await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (err) {
      const errorCode = (err as FirebaseError).code;
      console.log(errorCode)
      // Handle Firebase auth errors
      switch (errorCode) {
        case AuthErrorCodes.USER_DELETED:
          setErrorMessage("No user found with this email.");
          break;
        case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
          setErrorMessage("Incorrect email or password.");
          break;
        case AuthErrorCodes.INVALID_EMAIL:
          setErrorMessage("Invalid email format.");
          break;
        case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
          setErrorMessage(
            "Too many failed login attempts. Please try again later."
          );
          break;
        default:
          setErrorMessage("Login failed. Please try again.");
          break;
      }
    }
  };

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageLogo
          resizeMode="cover"
          source={require("../../../assets/images/Logo.png")}
        />
        <PageTitle> Discipline </PageTitle>
        <SubTitle>Account Login</SubTitle>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            handleLogin(values.email, values.password);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <StyledFormArea>
              <MyTextInput
                label="Email Address"
                icon="mail"
                placeholder="example@domain.com"
                placeholderTextColor={darkLight}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
              <MyPasswordInput
                label="Password"
                icon="lock-closed-sharp"
                placeholder="* * * * * * * *"
                placeholderTextColor={darkLight}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={hidePassword}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />
              <MessageBox>{errorMessage}</MessageBox>
              <StyledButton onPress={handleSubmit as any}>
                <ButtonText>Login</ButtonText>
              </StyledButton>
              <Line />
              <StyledButton google={true} onPress={handleSubmit as any}>
                <Fontisto name="google" color={primary} size={25} />
                <ButtonText google={true}>Sign in with Google</ButtonText>
              </StyledButton>
              <ExtraView>
                <ExtraText>Don't have an account already?</ExtraText>
                <TextLink onPress={() => navigation.navigate("screens/Signup/Signup")}>
                  <TextLinkContent>Signup</TextLinkContent>
                </TextLink>
              </ExtraView>
            </StyledFormArea>
          )}
        </Formik>
      </InnerContainer>
    </StyledContainer>
  );
};

export default Login;
