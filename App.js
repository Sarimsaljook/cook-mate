import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Text } from 'react-native';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import { useEffect, useState, useCallback } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function App() {

  const [messages, setMessages] = useState([]);

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hi, Feeling Hungry. Im Cookmate Im here to help you decide what to eat ask for recipe of something or ask me for any random recipe',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: require("./assets/cookmatelogo.png"),
        },
      },
    ])
  }, []);

  function HeaderTitle() {
    return (
      <View style={{flexDirection: 'row', marginRight: 15}}>
    
        <View style={{flex: 1}}>
          <Image
            source={require('./assets/cookmatelogo.png')}
            style={{widith: 100, height: 60, resizeMode: 'contain', marginTop: 30}}
          />
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 20, fontWeight: 'bold' }}>Your Cookmate</Text>
            </View>
        </View>
       
      </View>
    );
  }

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, []);

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }


  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  return (
    <SafeAreaProvider>
    
    <HeaderTitle /> 
  
    <GiftedChat
    messages={messages}
    onSend={messages => onSend(messages)}
    user={{
      _id: 1,
    }}
    alwaysShowSend
    renderSend={renderSend}
    scrollToBottom
    scrollToBottomComponent={scrollToBottomComponent}
    renderBubble={renderBubble}
  />
  </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
