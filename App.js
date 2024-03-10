import { StyleSheet, View, Image, Text } from 'react-native';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import { useEffect, useState, useCallback } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from "axios";

export default function App() {

  const [messages, setMessages] = useState([]);


  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hi, Feeling Hungry. Im Cookmate Im here to help you decide what to eat ask for recipe of something or ask me for any random recipe',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Cooking Assistant',
          avatar: require("./assets/cookmatelogo.png"),
        },
      },
    ])
  }, []);

  function HeaderTitle() {
    return (
      <View style={{flexDirection: 'row', marginRight: 15}}>
    
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('./assets/cookmatelogo.png')}
            style={{ width: 100, height: 60, resizeMode: 'contain', marginTop: 60 }}
          />
          <View>
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

    const userPrompt = messages[0].text;

    const regex = /^give me the recipe for (.+)$/i;
    const match = userPrompt.trim().match(regex);

    try{

    switch(userPrompt.toLowerCase()) {
      case "give me a recipe":
        axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
          .then((res) => {
            const recipe = res.data.meals[0];

            let recipeMeaurmentsAndIngredients = `
              ${recipe.strMeasure1 && recipe.strIngredient1 ? `${recipe.strMeasure1} ${recipe.strIngredient1}\n` : ''}
              ${recipe.strMeasure2 && recipe.strIngredient2 ? `${recipe.strMeasure2} ${recipe.strIngredient2}\n` : ''}
              ${recipe.strMeasure3 && recipe.strIngredient3 ? `${recipe.strMeasure3} ${recipe.strIngredient3}\n` : ''}
              ${recipe.strMeasure4 && recipe.strIngredient4 ? `${recipe.strMeasure4} ${recipe.strIngredient4}\n` : ''}
              ${recipe.strMeasure5 && recipe.strIngredient5 ? `${recipe.strMeasure5} ${recipe.strIngredient5}\n` : ''}
              ${recipe.strMeasure6 && recipe.strIngredient6 ? `${recipe.strMeasure6} ${recipe.strIngredient6}\n` : ''}
              ${recipe.strMeasure7 && recipe.strIngredient7 ? `${recipe.strMeasure7} ${recipe.strIngredient7}\n` : ''}
              ${recipe.strMeasure8 && recipe.strIngredient8 ? `${recipe.strMeasure8} ${recipe.strIngredient8}\n` : ''}
              ${recipe.strMeasure9 && recipe.strIngredient9 ? `${recipe.strMeasure9} ${recipe.strIngredient9}\n` : ''}
              ${recipe.strMeasure10 && recipe.strIngredient10 ? `${recipe.strMeasure10} ${recipe.strIngredient10}\n` : ''}
              ${recipe.strMeasure11 && recipe.strIngredient11 ? `${recipe.strMeasure11} ${recipe.strIngredient11}\n` : ''}
              ${recipe.strMeasure12 && recipe.strIngredient12 ? `${recipe.strMeasure12} ${recipe.strIngredient12}\n` : ''}
              ${recipe.strMeasure13 && recipe.strIngredient13 ? `${recipe.strMeasure13} ${recipe.strIngredient13}\n` : ''}
              ${recipe.strMeasure14 && recipe.strIngredient14 ? `${recipe.strMeasure14} ${recipe.strIngredient14}\n` : ''}
              ${recipe.strMeasure15 && recipe.strIngredient15 ? `${recipe.strMeasure15} ${recipe.strIngredient15}\n` : ''}
              ${recipe.strMeasure16 && recipe.strIngredient16 ? `${recipe.strMeasure16} ${recipe.strIngredient16}\n` : ''}
              ${recipe.strMeasure17 && recipe.strIngredient17 ? `${recipe.strMeasure17} ${recipe.strIngredient17}\n` : ''}
              ${recipe.strMeasure18 && recipe.strIngredient18 ? `${recipe.strMeasure18} ${recipe.strIngredient18}\n` : ''}
              ${recipe.strMeasure19 && recipe.strIngredient19 ? `${recipe.strMeasure19} ${recipe.strIngredient19}\n` : ''}
              ${recipe.strMeasure20 && recipe.strIngredient20 ? `${recipe.strMeasure20} ${recipe.strIngredient20}` : ''}
            `;

            const trimmedIngredientsList = recipeMeaurmentsAndIngredients.trim();

            const completeRecipeResponse = 
              `Sure You can try making this ${recipe.strArea} ${recipe.strMeal}\n\nHere's how:\n\nFirst you'll need the following ingredients:
              
              ${trimmedIngredientsList}
              \nNow Let's start,\n\n${recipe.strInstructions.split('.').join('.\n')}\nIf you would prefer using a video as refrence you can go to: \n\n${recipe.strYoutube ? recipe.strYoutube : 'No video available for this recipe'}

              Happy Cooking!
              `;

            setMessages(previousMessages =>
              GiftedChat.append(previousMessages, [
                {
                  _id: Math.random() * 1000,
                  text: completeRecipeResponse,
                  createdAt: new Date(),
                  user: {
                    _id: 2,
                    name: 'Cooking Assistant',
                    avatar: require("./assets/cookmatelogo.png"),
                  },
                  image: recipe.strMealThumb
                },
              ]),
            );

          }).catch((err) => {
            console.log(err);
          });
       default: {

        const recipeName = match[1];

        console.log(recipeName);

        axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`)
          .then((res) => {

            if(res.data.meals != null) {

            const recipe = res.data.meals[0];

            let recipeMeaurmentsAndIngredients = `
              ${recipe.strMeasure1 && recipe.strIngredient1 ? `${recipe.strMeasure1} ${recipe.strIngredient1}\n` : ''}
              ${recipe.strMeasure2 && recipe.strIngredient2 ? `${recipe.strMeasure2} ${recipe.strIngredient2}\n` : ''}
              ${recipe.strMeasure3 && recipe.strIngredient3 ? `${recipe.strMeasure3} ${recipe.strIngredient3}\n` : ''}
              ${recipe.strMeasure4 && recipe.strIngredient4 ? `${recipe.strMeasure4} ${recipe.strIngredient4}\n` : ''}
              ${recipe.strMeasure5 && recipe.strIngredient5 ? `${recipe.strMeasure5} ${recipe.strIngredient5}\n` : ''}
              ${recipe.strMeasure6 && recipe.strIngredient6 ? `${recipe.strMeasure6} ${recipe.strIngredient6}\n` : ''}
              ${recipe.strMeasure7 && recipe.strIngredient7 ? `${recipe.strMeasure7} ${recipe.strIngredient7}\n` : ''}
              ${recipe.strMeasure8 && recipe.strIngredient8 ? `${recipe.strMeasure8} ${recipe.strIngredient8}\n` : ''}
              ${recipe.strMeasure9 && recipe.strIngredient9 ? `${recipe.strMeasure9} ${recipe.strIngredient9}\n` : ''}
              ${recipe.strMeasure10 && recipe.strIngredient10 ? `${recipe.strMeasure10} ${recipe.strIngredient10}\n` : ''}
              ${recipe.strMeasure11 && recipe.strIngredient11 ? `${recipe.strMeasure11} ${recipe.strIngredient11}\n` : ''}
              ${recipe.strMeasure12 && recipe.strIngredient12 ? `${recipe.strMeasure12} ${recipe.strIngredient12}\n` : ''}
              ${recipe.strMeasure13 && recipe.strIngredient13 ? `${recipe.strMeasure13} ${recipe.strIngredient13}\n` : ''}
              ${recipe.strMeasure14 && recipe.strIngredient14 ? `${recipe.strMeasure14} ${recipe.strIngredient14}\n` : ''}
              ${recipe.strMeasure15 && recipe.strIngredient15 ? `${recipe.strMeasure15} ${recipe.strIngredient15}\n` : ''}
              ${recipe.strMeasure16 && recipe.strIngredient16 ? `${recipe.strMeasure16} ${recipe.strIngredient16}\n` : ''}
              ${recipe.strMeasure17 && recipe.strIngredient17 ? `${recipe.strMeasure17} ${recipe.strIngredient17}\n` : ''}
              ${recipe.strMeasure18 && recipe.strIngredient18 ? `${recipe.strMeasure18} ${recipe.strIngredient18}\n` : ''}
              ${recipe.strMeasure19 && recipe.strIngredient19 ? `${recipe.strMeasure19} ${recipe.strIngredient19}\n` : ''}
              ${recipe.strMeasure20 && recipe.strIngredient20 ? `${recipe.strMeasure20} ${recipe.strIngredient20}` : ''}
            `;

            const trimmedIngredientsList = recipeMeaurmentsAndIngredients.trim();

            const completeRecipeResponse = 
              `Sure You can try making this ${recipe.strArea} ${recipe.strMeal}\n\nHere's how:\n\nFirst you'll need the following ingredients:
              
              ${trimmedIngredientsList}
              \nNow Let's start,\n\n${recipe.strInstructions.split('.').join('.\n')}\nIf you would prefer using a video as refrence you can go to: \n\n${recipe.strYoutube ? recipe.strYoutube : 'No video available for this recipe'}

              Happy Cooking!
              `;

        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, [
            {
              _id: Math.random() * 1000,
              text: completeRecipeResponse,
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'Cooking Assistant',
                avatar: require("./assets/cookmatelogo.png"),
              },
              image: recipe.strMealThumb
            },
          ]),
        );
            } else { 
              setMessages(previousMessages =>
                GiftedChat.append(previousMessages, [
                  {
                    _id: Math.random() * 1000,
                    text: "Sorry I couldnt find that one",
                    createdAt: new Date(),
                    user: {
                      _id: 2,
                      name: 'Cooking Assistant',
                      avatar: require("./assets/cookmatelogo.png"),
                    },
                    image: recipe.strMealThumb
                  },
                ]),
              );
            }
      }).catch((err) => {
        console.log(err);
      });
    } 

    }

  } catch(err) {
    console.log(err);
  }

  }, []);

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
