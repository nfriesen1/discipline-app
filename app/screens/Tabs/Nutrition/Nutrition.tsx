import {
  ButtonText,
  InnerContainer,
  StyledButton,
  StyledContainer,
  StyledFormArea,
  Colors,
  StyledCard,
  CardText,
  ExtraText,
  DropDownButtonView,
  RightIcon,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
} from "../../../styles/styles";
import { useState } from "react";
import MyTextInput from "@/components/MyTextInput";
import { Formik } from "formik";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { Food, NutrientsNaviagationProp } from "../../../types";
import { getFoodData } from "./helper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronCircleDown,
  faChevronCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import { Loading } from "@/components/Loading";
import DropDownInput from "@/components/DropDownInput";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import CheckboxInput from "@/components/CheckboxInput";
import IconCard from "@/components/IconCard";
import RightIconCard from "@/components/RightIconCard";

//TO-DO : Improve quality of search and page aesthetic
interface ShapedFoodProps {
  food: Food;
}

interface Props {
  navigation: NutrientsNaviagationProp;
}

type DataType = "Branded" | "Survey (FNDDS)" | "SR Legacy" | "Foundation";

interface DataTypeOption {
  label: string;
  value: DataType;
}

interface SearchFormValues {
  query: string;
  brandOwner: string;
  dataType: DataType[];
  pageSize: number;
  requireAllWords: boolean;
}

const Nutrition: React.FC<Props> = ({ navigation }) => {
  const { darkLight, brand } = Colors;
  const [foodData, setFoodData] = useState<Food[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: SearchFormValues = {
    query: "",
    brandOwner: "",
    dataType: ["Branded", "Survey (FNDDS)"],
    pageSize: 50,
    requireAllWords: true,
  };

  const dataTypeOptions: DataTypeOption[] = [
    { label: "", value: "Branded" },
    { label: "Branded", value: "Branded" },
    { label: "Survey (FNDDS)", value: "Survey (FNDDS)" },
    { label: "SR Legacy", value: "SR Legacy" },
    { label: "Foundation", value: "Foundation" },
  ] as const;

  const FoodData = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (foodData.length === 0) {
      return (
        <StyledCard>
          <StyledCard.Content>
            <CardText>No results found. Try adjusting your search.</CardText>
          </StyledCard.Content>
        </StyledCard>
      );
    }

    return foodData.map((food, key) => (
      <StyledCard
        key={key}
        onPress={() =>
          navigation.navigate("screens/FoodInfo/FoodInfo", {
            fdcId: food.fdcId,
          })
        }
      >
        <StyledCard.Content>
          <ShapedFoodData food={food} />
        </StyledCard.Content>
      </StyledCard>
    ));
  };

  const ShapedFoodData: React.FC<ShapedFoodProps> = ({ food }) => (
    <CardText>
      {food.description} {"\n"}
      {food.brandOwner ? food.brandOwner : ""}
    </CardText>
  );

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <StyledContainer>
        <InnerContainer>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              setIsLoading(true);
              try {
                const results = await getFoodData(values);
                setFoodData(results.foods);
              } catch (error) {
                console.error("Search error:", error);
              } finally {
                setIsLoading(false);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              setFieldValue,
            }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Food search"
                  icon="search"
                  placeholder="Something tasty..."
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("query")}
                  onBlur={handleBlur("query")}
                  value={values.query}
                />

                <TouchableOpacity
                  onPress={() => setShowAdvanced(!showAdvanced)}
                >
                  <RightIconCard
                    text={"Advanced Search"}
                    icon={
                      showAdvanced ? faChevronCircleUp : faChevronCircleDown
                    }
                  />
                </TouchableOpacity>

                {showAdvanced && (
                  <View>
                    <MyTextInput
                      label="Brand"
                      icon="briefcase"
                      placeholder="Enter brand name..."
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange("brandOwner")}
                      onBlur={handleBlur("brandOwner")}
                      value={values.brandOwner}
                    />

                    <SelectDropdown
                      data={dataTypeOptions}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                      }}
                      renderButton={(selectedItem, isOpened) => {
                        return (
                          <DropDownButtonView>
                            <LeftIcon>
                              <Ionicons
                                name={"document"}
                                size={30}
                                color={brand}
                              ></Ionicons>
                            </LeftIcon>
                            <StyledInputLabel>{"Data Types"}</StyledInputLabel>
                            <StyledTextInput editable={false}>
                              {(selectedItem && selectedItem.value) ||
                                "Select data type"}
                            </StyledTextInput>
                            <Ionicons
                              name={isOpened ? "chevron-down" : "chevron-up"}
                              size={30}
                              color={brand}
                              style={{
                                opacity: isOpened ? 50 : 100,
                                left: "85%",
                                bottom: "45%",
                              }}
                            />
                          </DropDownButtonView>
                        );
                      }}
                      renderItem={(item, index, isSelected) => {
                        return (
                          <View
                            style={{
                              ...(isSelected && { backgroundColor: darkLight }),
                            }}
                          >
                            <ExtraText>{item.label}</ExtraText>
                          </View>
                        );
                      }}
                      dropdownStyle={{
                        backgroundColor: "#E9ECEF",
                        borderRadius: 8,
                        padding: 10,
                      }}
                    />

                    <CheckboxInput
                      label="Require all words"
                      checked={values.requireAllWords}
                      onToggle={() =>
                        setFieldValue(
                          "requireAllWords",
                          !values.requireAllWords
                        )
                      }
                    />
                  </View>
                )}

                <StyledButton onPress={handleSubmit as any}>
                  <ButtonText>Search</ButtonText>
                </StyledButton>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
        <FoodData />
      </StyledContainer>
    </ScrollView>
  );
};

export default Nutrition;
