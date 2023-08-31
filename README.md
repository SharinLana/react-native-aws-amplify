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

3. View the result (GraphQL model) by following the path:
   amplify/backend/api/schema.graphql

4. To deploy the backend with a default schema, run the command:

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

6. If you want to update the graphql schema, you can edit amplify/backend/api/schema.graphql and run the command:

```
amplify push --allow-destructive-graphql-schema-updates

```

This should update the DynamoDB tables and graphql statements.
Check the result by running amplify api console.
And also check the files in the src/graphql directory

### Adding Authentication to the project

1. Run the command:

`amplify add auth`

2. Select the defaults for the following prompts:

```
? Do you want to use the default authentication and security configuration? Default configuration
Warning: you will not be able to edit these selections.
? How do you want users to be able to sign in? Username
? Do you want to configure advanced settings? No, I am done.

```

3. Deploy:

`amplify push`

`amplify console`

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

#### READ - WRITE DATA: a List of Product Cards with 1 Image Per Card

1. In src/screens/AddProductScreen.js, create a Form using a desired library, make sure you can get the entered values of the inputs.

2. Install expo-image-picker library

3. In the hooks/use-image-picker.js, create a custom hook useImagePicker() that will return 2 properties: a URI of the picked image + a function that picks an image

4. In src/screens/AddProductScreen.js, create a new component to immediately display the picked (but not yet uploaded) image (<ImageUploader />).
   Then pass the destructured properties of the useImagePicker() to this component.

src/screens/AddProductScreen.js

```
import { useImagePicker } from "../../hooks/use-image-picker";

const AddProductScreen = ({ navigation }) => {
  const { image, pick } = useImagePicker();

  return (
    ...
    <ImageUploader image={image} onPickImage={pick} />
    ...
  )
}

```

src/components/ImageUploader.js

```
const ImageUploader = ({ image, onPickImage }) => {
  return (
    <View style={styles.imageView}>
      {image && (
        <Image source={{ uri: image }} style={styles.photo} />
      )}
      <Button
        style={styles.photoBtn}
        title="Choose Photo"
        onPress={onPickImage}
      />
    </View>
  );
};

```

5. Now it's time to start creating a custom useQuery hook that will collect the form data and pass it to the Amplify GraphQL DB.

hooks/use-create-product.js

```
import { useMutation, useQueryClient } from "react-query";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    <!-- newProductData = entered form data -->
    mutationFn: async (newProductData) => {
      <!-- 1. Save the data to the DB -->
      <!-- 2. If the entered data has an image, save it in the Amplify Storage -->

      <!-- Fetch the data from the DB immediately - the old one along with the new. To view the correct object structure, go to src/graphql/queries.js -->
      queryClient.setQueryData("all-products", (oldData) => {
        return {
          data: {
            listProducts: {
              ...oldData.data.listProducts,
              items: [...oldData.data.listProducts.items, newProductData],
            },
          },
        };
      });
    },
  });
}

```

5a. Inside of the useCreateProduct() hook, invoke a method that will make the POST request to the Amplify server. The method itself will be created on the next step. At this time, just import and invoke it (I marked the new lines of code with \*):

hooks/use-create-product.js

```
import { useMutation, useQueryClient } from "react-query";
* import { fetchCreateProduct } from "../api/product-apis";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProductData) => {
    * await fetchCreateProduct({ ...newProductData });

      <!-- 2. If the entered data has an image, save it in the Amplify Storage -->

      queryClient.setQueryData("all-products", (oldData) => {
        return {
          data: {
            listProducts: {
              ...oldData.data.listProducts,
              items: [...oldData.data.listProducts.items, newProductData],
            },
          },
        };
      });
    },
  });
}

```

5b. In api/product-apis.js, create the fetchCreateProduct() method.
The lines marked with ==//==//== will be filled out later

```
import { API, graphqlOperation } from "aws-amplify";
import { createProduct } from "../src/graphql/mutations";

export function fetchCreateProduct(product) {
  const newProduct = {
    name: product.name,
    price: product.price,
    description: product.description,
    userId: ==//==//==
    userName: ==//==//==
    image: ==//==//==
  };

  <!-- The createProduct method was automatically created by Amplify. We just need to use it -->

  return API.graphql(graphqlOperation(createProduct, { input: newProduct }));
}

```

5c. SAVE IMAGE. Now let's get back to the useCreateProduct() hook and add a new method to save the uploaded image to the DB. The saving method will be created on the next step. At this time, just import and call it, passing the image data (uri) in.
NOTE: New lines of code are marked with \*

hooks/use-create-product.js

```
import { useMutation, useQueryClient } from "react-query";
* import { fetchCreateProduct, saveProductImage } from "../api/product-apis";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProductData) => {
      await fetchCreateProduct({ ...newProductData });

    * if (newProductData.image) {
      await saveProductImage(newProductData.image);
      }

      queryClient.setQueryData("all-products", (oldData) => {
        return {
          data: {
            listProducts: {
              ...oldData.data.listProducts,
              items: [...oldData.data.listProducts.items, newProductData],
            },
          },
        };
      });
    },
  });
}

```

5d. In the fetchCreateProduct() method, add value to the image property.
And create a method that will save the uploaded image to the DB.
NOTE: New lines of code are marked with \*
The lines marked with ==//==//== will be filled out later

```
import { API, graphqlOperation } from "aws-amplify";
import { createProduct } from "../src/graphql/mutations";

export function fetchCreateProduct(product) {
  const newProduct = {
    name: product.name,
    price: product.price,
    description: product.description,
    userId: ==//==//==
    userName: ==//==//==
  * image: product.image ? product.image : "",
  };

  <!-- The createProduct method was automatically created by Amplify. We just need to use it -->

  return API.graphql(graphqlOperation(createProduct, { input: newProduct }));
}

* export async function saveProductImage(uri) {
    const imageResponse = await fetch(uri);
    const blob = await imageResponse.blob();

    await Storage.put(uri, blob, {
      contentType: "image/jpeg",
    });
  }


```

5e. SAVE USER DATA. Get back to the useCreateProduct() hook in the hooks/use-create-product.
We need to pass in the data of the user who is trying to make this POST request. In particular, we are interested in the username and id.
The useUser() method will be created on the next step, now just import, invoke it and pass its properties to the fetchCreateProduct() method.
NOTE: New lines of code are marked with \*

hooks/use-create-product.js

```
import { useMutation, useQueryClient } from "react-query";
import { fetchCreateProduct, saveProductImage } from "../api/product-apis";
* import { useUser } from "./use-user";

export function useCreateProduct() {
* const { data: user } = useUser();
* <!-- user.username = user name, user.attributes.sub = user id -->

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProductData) => {
    * await fetchCreateProduct({ ...newProductData }, user.username, user.attributes.sub);

      if (newProductData.image) {
      await saveProductImage(newProductData.image);
      }

      queryClient.setQueryData("all-products", (oldData) => {
        return {
          data: {
            listProducts: {
              ...oldData.data.listProducts,
              items: [...oldData.data.listProducts.items, newProductData],
            },
          },
        };
      });
    },
  });
}

```

5f. In the hooks/use-user.js, create a method to get the current authenticated user:

```
import { useQuery } from "react-query";
import { Auth } from "aws-amplify";

export function useUser() {
  return useQuery({
    queryKey: "user",
    queryFn: () => Auth.currentAuthenticatedUser({ bypassCache: true }),
  });
}

```

6. Invoke the useCreateProduct() useQuery hook inside of the AddProductScreen component and pass the entered values and the image uri to its "mutate" property on submit:

src/screens/AppProductScree.js

```
import { useCreateProduct } from "../../hooks/use-create-product";

const AddProductScreen = ({ navigation }) => {
  const { image, pick } = useImagePicker();
* const { mutate: createProduct } = useCreateProduct();

  const {control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      price: 0.0,
      description: "",
    },
  });

  const onSubmit = async ({ name, price, description }) => {
    const newProduct = {
      name,
      price: Number(price),
      description,
      image: image ? image : "",
    };

    createProduct(newProduct);
  };

  return (
    ...
  )
```

7. READING the data.

7a. In the api/product-apis.js.:
- Import listProducts controller.
- Create a function to fetch the data from the DB

```
import { listProducts } from "../src/graphql/queries";

export async function fetchAllProducts() {
  return await API.graphql(graphqlOperation(listProducts));
}

```

7b. In the hooks folder, create a new file use-all-products.js with a useQuery fetching fn, that uses the fetchAllProducts() method created on the previous step

hooks/use-all-products.js

```
import { useQuery } from "react-query";
import { fetchAllProducts } from "../api/product-apis";

export function useFetchAllProducts() {
  const {data} =  useQuery({
    queryKey: "all-products",
    queryFn: () => fetchAllProducts(),
  });

  return { data: data?.data.listProducts?.items };
}

```

7c. Use this hook inside of the component to fetch all products:

src/screens/HomeScreen.js

```
import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import ProductListComponent from "../components/ProductList";
import { useFetchAllProducts } from "../../hooks/use-all-products";

const HomeScreen = () => {
  const { data } = useFetchAllProducts();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ProductListComponent data={data} />
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

```