// App.js
import React, { useState, useEffect, useRef  } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ImageBackground, TextInput, Button, Alert, PermissionsAndroid, Platform ,  BackHandler , ToastAndroid  } from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BleManager } from 'react-native-ble-plx'; // 블루투스 모듈 import
import { request, PERMISSIONS } from 'react-native-permissions';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//스택용 임포트




//파이어베이스 
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyDb7voCfYlMEUFfVEu7mqxBNS8VV5xy-q0',
    authDomain: 'carefull-74e61.firebaseapp.com',
    databaseURL: 'https://carefull-74e61-default-rtdb.firebaseio.com',
    projectId: 'carefull-74e61',
    storageBucket: 'carefull-74e61.appspot.com',
    messagingSenderId: '414598808103',
    appId: '1:414598808103:android:ebcf006c169f2803b44402',
  });
}

const HomeScreen = ({ navigateTo }) => (
  <><ScrollView style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>carefull</Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={() => navigateTo('Calendar')}>
          <Image style={styles.icon} source={require('./assets/Calendar.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Settings')}>
          <Image style={styles.icon} source={require('./assets/Alarm.png')} />
        </TouchableOpacity>
      </View>
    </View>
    <View style={{ marginBottom: 10 }}>
      <ImageBackground source={require('./assets/pill_drop.jpg')} styles={styles.backgroundImage}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', padding: "1%" }}>금일 복용 횟수</Text>
        <Text style={styles.daystext}>아침</Text>
        <Text style={styles.daystext}>점심</Text>
        <Text style={styles.daystext}>저녁</Text>
      </ImageBackground>
    </View>
    <View style={styles.medicationReminder}>
      <Text style={styles.sectionTitle}>복용 알림</Text>
      <View style={styles.reminderItem}>
        <Image style={styles.reminderIcon} source={require('./assets/pill_00.png')} />
        <View>
          <Text style={styles.reminderText}></Text>
          <Text style={styles.reminderTime}></Text>
        </View>
      </View>
    </View>
    <View style={styles.medicationReminder}>
      <Text style={styles.sectionTitle}>약 잔여량</Text>
      <View style={styles.reminderItem}>
        <Image style={styles.reminderIcon} source={require('./assets/pill_00.png')} />
        <View>
          <Text style={styles.reminderText}></Text>
          <Text style={styles.reminderTime}></Text>
        </View>
      </View>
    </View>
    <ScrollView horizontal style={styles.medicationList}>
      <TouchableOpacity onPress={() => navigateTo('Medication1')}>
        <View style={styles.medicationItem}>
          <Image style={styles.medicationImage} source={require('./assets/pill_00.png')} />
          <Text style={styles.medicationDescription}>아스피린장용정{'\n'}복용한지 지난지 2시간이 지났습니다</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('Medication2')}>
        <View style={styles.medicationItem}>
          <Image style={styles.medicationImage} source={require('./assets/pill_00.png')} />
          <Text style={styles.medicationDescription}>투통약{'\n'}복용한지 24시간이 지났습니다</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('Medication3')}>
        <View style={styles.medicationItem}>
          <Image style={styles.medicationImage} source={require('./assets/pill_00.png')} />
          <Text style={styles.medicationDescription}>비타민A{'\n'}복용한지 1일이 지났습니다</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  </ScrollView>
  <View style={styles.bottomNavigation}> 
      <TouchableOpacity onPress={() => navigateTo('Home')}>
        <Image style={styles.bottomIcon} source={require('./assets/pill_00.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('Home')}>
        <Image style={styles.bottomIcon} source={require('./assets/Home_Menu.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('UserInfo')}>
        <Image style={styles.bottomIcon} source={require('./assets/Account.png')} />
      </TouchableOpacity>
    </View></>
);

const CalendarScreen = ({ navigateTo }) => { //캘린더
  LocaleConfig.locales['kr'] = {
    monthNames: [
      '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'
    ],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: "오늘"
  };
  
  LocaleConfig.defaultLocale = 'kr';
  const [selected, setSelected] = useState('');
  return (
    <><View style={styles.header}>
      <TouchableOpacity onPress={() => navigateTo('Home')}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: "black" }}>← 캘린더</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.Calendar}>
        <Calendar
          onDayPress={day => {
            setSelected(day.dateString);
          } }
          markedDates={{
            [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
          }} />
      </View></>
  );
};

const SettingsScreen = ({ navigateTo }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => navigateTo('Home')}>
      <Text style={{fontSize:30, fontWeight:'bold', color:"black"}}>← 알림</Text>
    </TouchableOpacity>
  </View>
);

// 개인정보 관리
const PrivateScreen = ({ navigateTo }) => {
  const [name, setName] = useState('');
  const [userCode, setUserCode] = useState('');


  useEffect(() => {
    AsyncStorage.getItem('userCode')
      .then((savedCode) => {
        if (savedCode) {
          console.log('저장된 사용자 코드:', savedCode);
          setUserCode(savedCode); // 저장된 코드를 사용하여 화면에 표시
        }
      })
      .catch(error => {
        console.log('AsyncStorage에서 사용자 코드를 가져오는 중 오류 발생:', error);
      });
  }, []);

  // 사용자 코드를 4개의 부분으로 나누는 함수
  const splitUserCode = (code) => {
    const codeParts = [];
    for (let i = 0; i < code.length; i += 4) {
      codeParts.push(code.slice(i, i + 4));
    }
    return codeParts;
  };


  useEffect(() => {
    const loadName = async () => {
      const userName = await AsyncStorage.getItem('userName');
      if (userName) {
        setName(userName);
      }
    };
    loadName();
  }, []);

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('UserInfo')}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black' }}>← 사용자 코드</Text>
        </TouchableOpacity>
      </View>
    
    
    <View style={styles.header}>
  
      <View style={styles.nickname}>
      <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black', marginBottom: 15 }}>닉네임: {name}</Text>

      </View>

      <View style={styles.container}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black', marginBottom: 15 }}>사용자 코드</Text>
        <View style={styles.codeContainer}>
          {splitUserCode(userCode).map((part, index) => (
            <View key={index} style={styles.codePartContainer}>
              <Text style={styles.codePart}>{part}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
    </>
  );
};

//닉네임 입력
const NameInputScreen = ({ navigateTo }) => {
  const [name, setName] = useState('');

  const handleSaveName = async () => {
    if (name.trim() !== '') {
      const userCode = generateUserCode();
      await AsyncStorage.setItem('userName', name);
      await AsyncStorage.setItem('userCode', userCode);

      // Firebase Realtime Database에 닉네임과 고유 번호 저장
      await database().ref('users').push({ name, userCode });

      navigateTo('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>닉네임을 입력하세요</Text>
      <TextInput
        style={styles.nicknamebox}
        placeholder="닉네임"
        value={name}
        onChangeText={setName}
      />
      <Button title="저장" onPress={handleSaveName} />
    </View>
  );
};

//사용자 정보
const UserInfo = ({ navigateTo }) => (
  <>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigateTo('Home')}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: "black" }}>← 사용자 정보</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.container}>
      <Text style={{ fontSize: 25, fontWeight: 'bold', color: "black", marginBottom: 15 }}>내 정보 관리</Text>
      
      <TouchableOpacity onPress={() => navigateTo('Private')}>
      <Text style={{ fontSize: 15, color: "black", marginBottom: 15 }}>개인 정보 관리</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateTo('Parentaccount')}>
      <Text style={{ fontSize: 15, color: "black", marginBottom: 25 }}>보호자 등록</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 25, fontWeight: 'bold', color: "black", marginBottom: 15 }}>약통 관리</Text>

      <TouchableOpacity onPress={() => navigateTo('Medical')}>
      <Text style={{ fontSize: 15, color: "black", marginBottom: 15 }}>내 약통 관리</Text>
      </TouchableOpacity>

    </View>
  </>
);

// 16자리 난수 생성 함수
const generateUserCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const codeLength = 16;
  let code = '';
  for (let i = 0; i < codeLength; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

const ParentaccountScreen = ({ navigateTo }) => {
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [parentCodes, setParentCodes] = React.useState(['', '', '', '']);

  const handleCodeChange = (text, index) => {
    // 공백 제거하여 하나의 문자열로 만듭니다
    const newParentCodes = [...parentCodes];
    newParentCodes[index] = text.replace(/\s/g, ''); // 정규식을 사용하여 공백 제거
    setParentCodes(newParentCodes);

    if (text.length === 4 && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  
  const searchUserByParentCode = async (parentCode) => {
    try {
      const snapshot = await database().ref('users').orderByChild('userCode').equalTo(parentCode).once('value');
      const user = snapshot.val();
      return user;
    } catch (error) {
      console.error('사용자를 검색하는 중 오류 발생:', error);
      throw error;
    }
  };

  const sendRegistrationRequestToParent = async () => {
    try {
      const parentCode = parentCodes.join('');
      const user = await searchUserByParentCode(parentCode);
      
      if (user) {
        Alert.alert('보호자로 등록하시겠습니까?');
        // 여기에 사용자를 찾았을 때의 처리를 추가하세요.
      } else {
        Alert.alert('유효하지 않은 사용자 코드입니다.');
      }
    } catch (error) {
      console.error('보호자 등록 요청 중 오류 발생:', error);
      Alert.alert('보호자 등록 요청 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('UserInfo')}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black' }}>← 보호자 등록</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', color: "black", marginBottom: 15 }}>보호자 코드</Text>
        <View style={styles.inputContainer}>
          {[0, 1, 2, 3].map((index) => (
            <React.Fragment key={index}>
              <TextInput
                ref={inputRefs[index]}
                placeholder="0000"
                maxLength={4}
                onChangeText={(text) => handleCodeChange(text, index)}
                value={parentCodes[index]}
                style={styles.input}
              />
              {index < 3 && <Text style={styles.hyphen}>-</Text>}
            </React.Fragment>
          ))}
        </View>
        <Button title="보호자 등록 요청 보내기" onPress={sendRegistrationRequestToParent} />
      </View>
    </>
  );
};

const MedicalScreen = ({ navigateTo }) => {
  const bleManagerRef = useRef(new BleManager());
  const [isScanning, setIsScanning] = useState(false);

  const requestBluetoothPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);

      return (
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] === PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] === PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED
      );
    } else if (Platform.OS === 'ios') {
      const granted = await request(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL);
      return granted === 'granted';
    }
    return false;
  };

  const checkBluetoothState = async () => {
    const state = await bleManagerRef.current.state();
    if (state !== 'PoweredOn') {
      Alert.alert('Bluetooth 필요', '블루투스를 켜주세요.');
      return false;
    }
    return true;
  };

  const handleRegisterPillBox = async () => {
    const hasPermission = await requestBluetoothPermissions();
    if (!hasPermission) {
      Alert.alert('권한 필요', '블루투스 권한이 필요합니다.');
      return;
    }

    const isBluetoothOn = await checkBluetoothState();
    if (!isBluetoothOn) {
      return;
    }

    try {
      if (isScanning) {
        bleManagerRef.current.stopDeviceScan();
      }

      setIsScanning(true);

      bleManagerRef.current.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.error('스캔 중 오류 발생:', error);
          Alert.alert('스캔 오류', '블루투스 스캔 중 오류가 발생했습니다.');
          setIsScanning(false);
          return;
        }

        if (device && device.name === 'YourPillBoxName') {
          bleManagerRef.current.stopDeviceScan();
          setIsScanning(false);
          device.connect().then((connectedDevice) => {
            console.log('디바이스에 연결되었습니다:', connectedDevice);
          }).catch((connectError) => {
            console.error('디바이스 연결 중 오류 발생:', connectError);
            Alert.alert('연결 오류', '디바이스 연결 중 오류가 발생했습니다.');
          });
        }
      });
    } catch (error) {
      console.error('블루투스 스캔 시작 오류:', error);
      Alert.alert('스캔 시작 오류', '블루투스 스캔을 시작하는 동안 오류가 발생했습니다.');
      setIsScanning(false);
    }
  };

  useEffect(() => {
    return () => {
      if (isScanning) {
        bleManagerRef.current.stopDeviceScan();
        setIsScanning(false);
      }
      bleManagerRef.current.destroy();
    };
  }, [isScanning]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('UserInfo')}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: "black" }}>← 내 약통 관리</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TouchableOpacity onPress={handleRegisterPillBox} style={styles.registrationButton}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: "black" }}>내 약통 등록</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [screenStack, setScreenStack] = useState(['Home']);
  const [lastBackPress, setLastBackPress] = useState(0);

  useEffect(() => {
    const checkUserName = async () => {
      const userName = await AsyncStorage.getItem('userName');
      if (userName) {
        setCurrentScreen('Home');
      } else {
        setCurrentScreen('NameInput');
      }
    };
    checkUserName();
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => backHandler.remove();
  }, [currentScreen, screenStack]);

  const handleBackPress = () => {
    if (currentScreen === 'Home') {
      const currentTime = Date.now();
      if (currentTime - lastBackPress < 2000) {
        BackHandler.exitApp();
      } else {
        ToastAndroid.show('한 번 더 누르면 종료됩니다.', ToastAndroid.SHORT);
        setLastBackPress(currentTime);
      }
      return true;
    }

    if (screenStack.length > 1) {
      const newStack = [...screenStack];
      newStack.pop();
      setCurrentScreen(newStack[newStack.length - 1]);
      setScreenStack(newStack);
      return true;
    }

    return false; // 기본 동작을 수행 (앱 종료)
  };

  const navigateTo = (screen) => {
    setCurrentScreen(screen);
    setScreenStack([...screenStack, screen]);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Calendar':
        return <CalendarScreen navigateTo={navigateTo} />;
      case 'Settings':
        return <SettingsScreen navigateTo={navigateTo} />;
      case 'Private':
        return <PrivateScreen navigateTo={navigateTo} />;
      case 'Parentaccount':
        return <ParentaccountScreen navigateTo={navigateTo} />;
      case 'Medical':
        return <MedicalScreen navigateTo={navigateTo} />;
      case 'NameInput':
        return <NameInputScreen navigateTo={navigateTo} />;
      case 'UserInfo':
        return <UserInfo navigateTo={navigateTo} />;
      case 'Home':
      default:
        return <HomeScreen navigateTo={navigateTo} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 2,
    resizeMode: 'cover',
    marginBottom: 15,
  },
  daystext: {
    fontSize: 18,
    fontWeight:'bold', 
    padding:"1%",
    marginLeft: 5,
    color: '#000000'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  
  nicknamebox: {
    
    padding: 10,
    textAlign: 'center',
    width: '80%',
  },

  Calendar: { //캘린더
    marginTop: 20,
    flex: 1,
    backgroundColor: '#fff',
    dayTextAtIndex0: { color: 'red'},
    datTextAtOmdex6: { color:'blue'}
  },

  // 보호자 코드
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    textAlign: 'center',
    width: '20%',
  },
  inputContainer: {
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'black'
  },
  headerIcons: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  banner: {
    width: '100%',
    height: 150,
  },
  medicationReminder: {
    marginTop: 10,
    marginBottom:10,
    padding: 10,
    backgroundColor: '#e0f7fa',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reminderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reminderIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  reminderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reminderTime: {
    fontSize: 14,
    color: '#666',
  },
  medicationList: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  medicationItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  medicationImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  medicationDescription: {
    textAlign: 'center',
  },
  bottomNavigation: { //화면 하단 네이게이션바
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    padding: 20,
    backgroundColor: '#a5d6a7',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  bottomIcon: {
    width: 24,
    height: 24,
  },
  header: {
    // 스타일을 여기에 정의합니다
  },
  container: {
    padding: 20,
    // 스타일을 여기에 정의합니다
  },

  //사용자 코드 컨테이너
  codeContainer: {
    padding: 10,
    flexDirection: 'row', // 가로 방향으로 정렬
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'flex-start',
    borderColor: '#000', // 언더바 색상을 설정합니다
    width: '100%', // 너비를 설정합니다 (필요에 따라 조정하세요)
    marginBottom: 25, // 하단 여백 추가
  },
  codePartContainer: {
    flex: 1, // 동일한 너비를 가지도록 설정
    marginHorizontal: 5, // 부분 간 간격 조절
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    alignItems: 'center',
  },
  userCodeText: {
    fontSize: 20,
    color: "black"
  },

  content: {
    justifyContent: 'center',
    alignItems: 'flex-end', // 오른쪽 정렬로 변경
    marginVertical: 30, // 버튼을 아래로 내릴 수 있는 여백 조절
  },
  
  
  
});

export default App;