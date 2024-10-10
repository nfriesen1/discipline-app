import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Fontisto } from "@expo/vector-icons";

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
} from "../styles/styles";

import MyTextInput from "@/components/MyTextInput";
import MyPasswordInput from "@/components/MyPasswordInput";

//Colors
const { darkLight, brand } = Colors;

// Datetimepicker

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import MyDateInput from "@/components/MyDateInput";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  'screens/Login': undefined;
  'screens/Signup': undefined;
  'TabsNavigator': undefined;
};

// Define the type for the navigation prop in the Login component
type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'screens/Signup'>;

interface Props {
  navigation: SignupScreenNavigationProp;
}


const Signup: React.FC<Props> = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
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
            navigation.navigate("TabsNavigator")
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
              <MessageBox>...</MessageBox>
              <StyledButton onPress={handleSubmit as any}>
                <ButtonText>Signup</ButtonText>
              </StyledButton>
              <Line />
              <ExtraView>
                <ExtraText>Have an account already?</ExtraText>
                <TextLink onPress={() => navigation.navigate("screens/Login")}>
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
