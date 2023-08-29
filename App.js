import { QueryClientProvider, QueryClient } from "react-query";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Amplify, Auth } from "aws-amplify";
import awsExports from "./aws-exports";
import {
  withAuthenticator,
  useAuthenticator,
} from "@aws-amplify/ui-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Screens
import HomeScreen from "./src/screens/HomeScreen";
import AddProductScreen from "./src/screens/AddProductScreen";

Amplify.configure(awsExports);

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRoute="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: "Home",
              headerStyle: {
                backgroundColor: "#ff9300",
              },
              headerRight: () => (
                <View>
                  <Button
                    icon={<Icon name="sign-out" size={25} color="#000000" />}
                    onPress={() => {
                      Auth.signOut();
                    }}
                    type="clear"
                  />
                </View>
              ),
              headerLeft: () => (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => navigation.navigate("AddProduct")}
                >
                  <Text>Add Product</Text>
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="AddProduct"
            component={AddProductScreen}
            options={({ navigation }) => ({ title: "Add Product" })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default withAuthenticator(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
