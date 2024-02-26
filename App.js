import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import { useEffect, useState, useCallback } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



export default function App() {

  const [messages, setMessages] = useState([])

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

  function HeaderTitle({navigation}) {
    return (
      <View style={{flexDirection: 'row', marginRight: 15}}>
        <View style={{justifyContent: 'center'}}>
          <Icon name="angle-left" size={30} color="#1841c7" />
        </View>
        <View style={{flex: 1}}>
          <Image
            source={{
              uri:
                'https://www.techup.co.in/wp-content/uploads/2020/03/techup_final_logo.png',
            }}
            style={{widith: 100, height: 60, resizeMode: 'contain'}}
          />
        </View>
        <View style={{justifyContent: 'center', padding: 5}}>
          <MaterialCommunityIcons name="cart" size={30} color="#1841c7" />
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
