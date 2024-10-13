import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screen/HomeScreen';
import BoardScreen from '../../screen/BoardScreen';
import ChatScreen from '../../screen/ChatScreen';
import MyScreen from '../../screen/MyScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="board">
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{title: '홈'}}
        />
        <Tab.Screen
          name="board"
          component={BoardScreen}
          options={{title: '게시판'}}
        />
        <Tab.Screen
          name="chat"
          component={ChatScreen}
          options={{title: '채팅'}}
        />
        <Tab.Screen
          name="my"
          component={MyScreen}
          options={{title: '내정보'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigation;
