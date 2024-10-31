import {
  ButtonText,
  CardText,
  Colors,
  IconButton,
  PageTitle,
  StyledButton,
  StyledCard,
  StyledContainer,
  StyledFormArea,
} from "@/app/styles/styles";
import { auth, db } from "@/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { getUserData } from "./helper";
import React, { useEffect, useState } from "react";
import { DocumentData, Timestamp } from "firebase/firestore";
import EditUserInfo from "@/components/EditUserInfo";
import { updateEmail } from "firebase/auth";
import { Formik } from "formik";
import { doc, updateDoc } from "firebase/firestore";
import EditUserDob from "@/components/EditUserDob";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import { Line } from "react-native-svg";
import { Loading } from "@/components/Loading";

interface UserData {
  dob: string | undefined;
  email: string;
}

interface ProfileSectionProps {
  text: string;
  leftIcon: React.ComponentProps<typeof Ionicons>["name"];
}

interface FormValues {
  email: string;
  dob: string;
}

export default function Profile() {
  const { brand, tertiary } = Colors;
  const currentUser = auth.currentUser;
  const [userData, setUserData] = useState<DocumentData | undefined>();
  const [isEditing, setIsEditing] = useState(false);
  const [isShowing, showDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    showDatePicker(Platform.OS === "ios");
    setSelectedDate(currentDate);
  };

  const handleSignout = () => {
    auth.signOut().then(
      () => {
        console.log("Signed Out");
      },
      (error) => {
        console.error("Sign Out Error", error);
      }
    );
  };

  const ProfileSection: React.FC<ProfileSectionProps> = ({ text, leftIcon }) => {
    return (
      <StyledCard>
        <StyledCard.Content>
          <CardText>{text}</CardText>
          <IconButton
            onPress={() => {
              setIsEditing(!isEditing);
            }}
          >
            <Ionicons name="pencil" size={30} style={{ color: "white" }} />
          </IconButton>
        </StyledCard.Content>
      </StyledCard>
    );
  };

  const LoadingSection = () => {
    return (
      <StyledContainer>
        <Loading/>
      </StyledContainer>
    );
  };

  const EditingSection: React.FC<UserData> = ({ email, dob }) => {
    const writeUserData = async (email: string, dateOfBirth: Date) => {
      try {
        if (currentUser) {
          await updateDoc(doc(db, "users", currentUser.uid), {
            dateOfBirth: Timestamp.fromDate(dateOfBirth),
            email: email,
          });
          const result = await getUserData(currentUser);
          setUserData(result);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const handleMutate = (values: FormValues) => {
      if (!currentUser) return;

      updateEmail(currentUser, values.email)
        .then(() => {
          writeUserData(values.email, selectedDate);
          setIsEditing(false);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const initialValues: FormValues = {
      email: email,
      dob: dob || selectedDate.toLocaleDateString(),
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleMutate}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <StyledFormArea>
              <EditUserInfo
                label="Email Address"
                icon="mail"
                placeholder={email}
                placeholderTextColor={tertiary}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
              <EditUserDob
                label="Date of Birth"
                icon="calendar"
                placeholder={selectedDate.toLocaleDateString()}
                placeholderTextColor={tertiary}
                onChangeText={handleChange("dob")}
                onBlur={handleBlur("dob")}
                value={selectedDate.toLocaleDateString()}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                showDatePicker={showDatePicker}
                show={isShowing}
              />
              {isShowing && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={handleDateChange}
                  style={
                    Platform.OS === "ios"
                      ? {
                          backgroundColor: brand,
                        }
                      : undefined
                  }
                />
              )}
              <StyledButton onPress={handleSubmit as any}>
                <ButtonText>Submit Changes</ButtonText>
              </StyledButton>
            </StyledFormArea>
          )}
        </Formik>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUserData(currentUser);
      setUserData(result);
      if (result?.dateOfBirth) {
        const date = new Date(result.dateOfBirth.seconds * 1000);
        if (!isNaN(date.getTime())) {
          setSelectedDate(date);
        }
      }
    };

    fetchData();
  }, []);

  if (!userData) {
    return <LoadingSection />;
  }

  if (currentUser && currentUser.email) {
    return (
      <StyledContainer>
        <Ionicons name="person" size={60} style={{ alignSelf: "center" }} />
        <PageTitle>{currentUser.displayName || "Guest"}</PageTitle>
        {!isEditing ? (
          <>
            <ProfileSection leftIcon="mail" text={`Email: ${currentUser.email}`} />
            <ProfileSection
              leftIcon="calendar"
              text={`Date of Birth: ${selectedDate.toLocaleDateString()}`}
            />
            <StyledButton onPress={handleSignout}>
              <ButtonText>Sign Out</ButtonText>
            </StyledButton>
          </>
        ) : (
          <EditingSection
            email={currentUser.email}
            dob={selectedDate.toLocaleDateString()}
          />
        )}
        <Line />
      </StyledContainer>
    );
  }

  return null;
}
