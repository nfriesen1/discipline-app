import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Fontisto } from "@expo/vector-icons";

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
  TextLinkContent
} from "../styles/styles";

import MyTextInput from "@/components/MyTextInput";
import MyPasswordInput from "@/components/MyPasswordInput";

//Colors
const { darkLight, primary } = Colors

const Login = () => {
  const [hidePassword, setHidePassword] = useState(true)
  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageLogo
          resizeMode="cover"
          source={require("../../assets/images/Logo.png")}
        />
        <PageTitle> Discipline </PageTitle>
        <SubTitle>Account Login</SubTitle>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >{({handleChange, handleBlur, handleSubmit, values}) => (
          <StyledFormArea>
            <MyTextInput
              label="Email Address"
              icon="mail"
              placeholder="example@domain.com"
              placeholderTextColor={darkLight}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            <MyPasswordInput
              label="Password"
              icon="lock-closed-sharp"
              placeholder="* * * * * * * *"
              placeholderTextColor={darkLight}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry={hidePassword}
              isPassword={true}
              hidePassword = {hidePassword}
              setHidePassword={setHidePassword}
            />
            <MessageBox>...</MessageBox>
            <StyledButton onPress={() => handleSubmit}>
              <ButtonText>
                Login
              </ButtonText>
            </StyledButton>
            <Line/>
            <StyledButton google={true} onPress={() => handleSubmit}>
              <Fontisto name="google" color={primary} size={25} />
              <ButtonText google={true}>
                Sign in with Google
              </ButtonText>
            </StyledButton>
            <ExtraView>
              <ExtraText>
                Don't have an account already?
              </ExtraText>
              <TextLink>
                  <TextLinkContent>Signup</TextLinkContent>
              </TextLink>
            </ExtraView>
          </StyledFormArea>
        )}</Formik>
      </InnerContainer>
    </StyledContainer>
  );
};

export default Login;
