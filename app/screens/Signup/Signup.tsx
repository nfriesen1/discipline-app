import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

// formik
import { Formik } from "formik";

import {
  StyledContainer,
  InnerContainer,
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
import { SignupScreenNavigationProp } from "../../types";

//Colors
const { darkLight, brand } = Colors;

// Datetimepicker

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import MyDateInput from "@/components/MyDateInput";

// firebase
import { auth, db } from "@/firebaseConfig";
import "firebase/auth";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

// Define the type for the navigation prop in the Login component
interface Props {
  navigation: SignupScreenNavigationProp;
}

const Signup: React.FC<Props> = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1));

  const [dob, setDob] = useState<Date | undefined>();

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setDob(currentDate);
  };

  const handleSignup = async (
    name: string,
    dob: Date | undefined,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    if(password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        dateOfBirth: dob,
        email: email,
      });
      
      if(auth.currentUser != null) {
        await updateProfile(auth.currentUser, {
          displayName: name
        })
      }
    } catch (err) {
      const errorCode = (err as FirebaseError).code;
      console.log(errorCode);
      // Handle Firebase auth errors
      switch (errorCode) {
        case AuthErrorCodes.EMAIL_EXISTS:
          setErrorMessage(
            "The email address is already in use by another account."
          );
          break;
        case AuthErrorCodes.INVALID_EMAIL:
          setErrorMessage("The email address is badly formatted.");
          break;
        case AuthErrorCodes.WEAK_PASSWORD:
          setErrorMessage(
            "The password is too weak. Please choose a stronger password."
          );
          break;
        case AuthErrorCodes.OPERATION_NOT_ALLOWED:
          setErrorMessage(
            "Email/password accounts are not enabled. Contact support."
          );
          break;
        default:
          setErrorMessage("Sign up failed. Please try again.");
          break;
      }
    }
  };
  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageTitle> Discipline </PageTitle>
        <SubTitle>Account Signup</SubTitle>
        <Formik
          initialValues={{
            fullName: "",
            dateOfBirth: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => {
            console.log(values);
            handleSignup(
              values.fullName,
              dob,
              values.email,
              values.password,
              values.confirmPassword
            );
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <StyledFormArea>
              <MyTextInput
                label="Full Name"
                icon="person"
                placeholder="Jane Doe"
                placeholderTextColor={darkLight}
                onChangeText={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                value={values.fullName}
              />
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
              <MyDateInput
                label="Date of Birth"
                icon="calendar-number"
                placeholder="MM-DD-YYYY"
                placeholderTextColor={darkLight}
                onChangeText={handleChange("dateOfBirth")}
                onBlur={handleBlur("dateOfBirth")}
                value={dob ? dob.toDateString() : values.dateOfBirth}
                show={show}
                showDatePicker={setShow}
              />
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="spinner"
                  onChange={onChange}
                  style={{
                    backgroundColor: brand,
                  }}
                />
              )}
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
              <MyPasswordInput
                label="Confirm Password"
                icon="lock-closed-sharp"
                placeholder="* * * * * * * *"
                placeholderTextColor={darkLight}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                secureTextEntry={hideConfirmPassword}
                hidePassword={hideConfirmPassword}
                setHidePassword={setHideConfirmPassword}
              />
              <MessageBox>{errorMessage}</MessageBox>
              <StyledButton onPress={handleSubmit as any}>
                <ButtonText>Signup</ButtonText>
              </StyledButton>
              <Line />
              <ExtraView>
                <ExtraText>Have an account already?</ExtraText>
                <TextLink onPress={() => navigation.navigate("screens/Login/Login")}>
                  <TextLinkContent>Login</TextLinkContent>
                </TextLink>
              </ExtraView>
            </StyledFormArea>
          )}
        </Formik>
      </InnerContainer>
    </StyledContainer>
  );
};

export default Signup;
