import logo from './logo.svg';
import './App.css';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Records from './Records';
import Alarm from './Alarm';
import Settings from './Settings';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="홈" component={Home} />
        <Tab.Screen name="기록" component={Records} />
        <Tab.Screen name="알람" component={Alarm} />
        <Tab.Screen name="설정" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
