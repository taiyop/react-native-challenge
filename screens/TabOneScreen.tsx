import * as React from 'react';
import { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions'

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

let token = "no token";

(async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== "granted") {
    return;
  }

  // Get the token that uniquely identifies this device
  token = await Notifications.getExpoPushTokenAsync();

  console.log("token!!!", token);
})();

export default function TabOneScreen() {
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <TextInput
        style={{height: 40}}
        placeholder="Type here!"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <Text style={styles.title}>Tab One</Text>
      <Text>{ text }</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
