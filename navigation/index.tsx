import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Keyboard, Button, TextInput, StyleSheet, InputAccessoryView, ColorSchemeName } from 'react-native';


import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

import { Text, View } from '../components/Themed';
import {useState} from "react";

function HomeScreen({ navigation }) {
  const [text, setText] = useState('');
  const inputAccessoryViewID = 'uniqueID';
  const initialText = '#';
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput

        multiline
        numberOfLines={4}
        style={{height: 'auto', width: '100%', padding: 20}}
        value={text}
        placeholder="Type here!"
        onChangeText={text => setText(text)}
        inputAccessoryViewID={inputAccessoryViewID}
      />
      <InputAccessoryView nativeID={inputAccessoryViewID}>
        <View style={styles.textInputContainer}>
          <Text
            style={{flex: 1}}
            onPress={() => { setText(text + ' ' + initialText) }}
          >#</Text>
          <Text
            style={{flex: 1}}
            onPress={() => { Keyboard.dismiss() }}
          >Close</Text>
        </View>
      </InputAccessoryView>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications Test"
      />

    </View>
  );
}
function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back homei test" />
    </View>
  );
}

const Drawer = createDrawerNavigator();


// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="#Home" component={HomeScreen} />
        <Drawer.Screen name="#Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
      {/*<RootNavigator />*/}
    </NavigationContainer>
  );
}


// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    height: 30,
  },
})
