## AWS Amplify + React Native Demo App
A Step-By-Step Guide (assuming that the developer already has an AWS account)

### Set up fullstack project (with Expo CLI)

1. Create a new app with the following command:

```
npx create-expo-app amplified_shop

cd amplified_shop

```

2. Install the necessary dependencies:

```
npm install aws-amplify amazon-cognito-identity-js @react-native-community/netinfo @react-native-async-storage/async-storage

```

3. Start the app (and don't stop it)

```
npm start

i

```

4. Initialize a new backend (it will create an aws-exports.js file in the root directory and modify the .gitignore file)

`amplify init`

then answer the questions:

```
? Enter a name for the project (amplifiedShop)
The following configuration will be applied:

Project information
| Name: amplifiedShop
| Environment: dev
| Default editor: Visual Studio Code
| App type: javascript
| Javascript framework: react-native
| Source Directory Path: /
| Distribution Directory Path: /
| Build Command: npm run-script build
| Start Command: npm run-script start

? Initialize the project with the above configuration? Yes
Using default provider  awscloudformation
? Select the authentication method you want to use: AWS profile
? Please choose the profile you want to use default

```

When it's done, run the following command to view the AWS Amplify Console:

`amplify console`

5. Set up frontend: open App.js (Expo CLI) and add the following code below the last import:

```
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';
Amplify.configure(awsExports);

```

### Connect API and database to the app

1. Add a GraphQL API to your app:

```
amplify add api

```

2. Accept the DEFAULT values from the list below:

```

? Select from one of the below mentioned services: GraphQL
? Here is the GraphQL API that we will create. Select a setting to edit or continue Continue
? Choose a schema template: Single object with fields (e.g., “Todo” with ID, name, description)

```

2. View the result (GraphQL model) by following the path:
   amplify/backend/api/schema.graphql

3. To deploy this backend, run the command:

```
amplify push

```

then answer the questions as follows:

```
? Are you sure you want to continue? Yes

...

? Do you want to generate code for your newly created GraphQL API Yes
? Choose the code generation language target javascript
? Enter the file name pattern of graphql queries, mutations and subscriptions src/graphql/**/*.js
? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions Yes
? Enter maximum statement depth [increase from default if your schema is deeply nested] 2

```

4. Run the following command to check Amplify's status:

`amplify status`

the result will look like this:

```
Current Environment: dev

| Category | Resource name | Operation | Provider plugin   |
| -------- | ------------- | --------- | ----------------- |
| Api      | myapi         | No Change | awscloudformation |

```

5. To view the GraphQL API in the AppSync console at any time, run the following command:

```
amplify console api

```

### Adding Authentication to the project

1. Run the command:

``` amplify add auth ```

2. Select the defaults for the following prompts:

```
? Do you want to use the default authentication and security configuration? Default configuration
Warning: you will not be able to edit these selections. 
? How do you want users to be able to sign in? Username
? Do you want to configure advanced settings? No, I am done.

```

3. Deploy:

``` amplify push ```

``` amplify console ```

4. Install Amplify UI:

```
npm install @aws-amplify/ui-react-native react-native-get-random-values react-native-url-polyfill

```

5. Open App.js and import components:

```
import { withAuthenticator, useAuthenticator } from '@aws-amplify/ui-react-native';

```

#### Sign-In

6. Wrap the App component with the withAuthenticator:

```
export default withAuthenticator(App);

```

7. Reload the app. You should see the login screen in the browser.
   Follow the registration process by entering name and password, then check email and enter the verification code to authorize.

8. To find all the registered users:

- open the Amplify Console (by running a command: amplify console )
- All apps -> amplifiedshop -> dev -> authentication -> Users -> view in Cognito

#### Sign Out

9. To sign the user out, we need to use Auth.signOut() amplify method on the button press:

```
import { Auth } from "aws-amplify";

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
)

```

### React Native Basic Navigation

1. Install react-navigation/native libraries

```
npm install @react-navigation/native @react-navigation/native-stack

```

2. Open App.js and import the library properties:

```
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

```

3. Use createNativeStackNavigator to create Stack

```
const Stack = createNativeStackNavigator();

```

4. Implement the navigation in the App JSX code using the NavigationContainer:

```
const App = () => {
  return (
    <>
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
    </>
  );
};

```