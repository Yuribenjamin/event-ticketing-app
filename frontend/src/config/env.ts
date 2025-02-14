import Constants from "expo-constants";

const API_URL =
  Constants.expoConfig?.extra?.API_URL || "http://localhost:3000/graphql";

export default API_URL;