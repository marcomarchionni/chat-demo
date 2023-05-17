import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { StyleSheet } from 'react-native';
import Chat from './components/Chat';
import Start from './components/Start';
import { StackParamList } from './types/types';

// Initialize Stack for React Native Navigator
const Stack = createNativeStackNavigator<StackParamList>();

const App = () => {
  // Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyAQCM9PiUWq3kk1u99vdVZ2DxBO9gLAJ3w',
    authDomain: 'chat-app-4ec1d.firebaseapp.com',
    projectId: 'chat-app-4ec1d',
    storageBucket: 'chat-app-4ec1d.appspot.com',
    messagingSenderId: '481704406944',
    appId: '1:481704406944:web:0682472b6b05b5d218fec5',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={Start}
          options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
