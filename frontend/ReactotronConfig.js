import Reactotron from "reactotron-react-native";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { reactotronRedux } from "reactotron-redux";

const reactotron = Reactotron.configure({
  name: "React Native Example Inspect",
})
  .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .useReactNative()
  .use(reactotronRedux()) //  <- here i am!
  .connect();

export default reactotron;
