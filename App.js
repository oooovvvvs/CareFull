// App.js
import React, { useState, useEffect, useRef  } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ImageBackground, TextInput, Button, Alert  } from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = ({ navigateTo }) => (
  <ScrollView style={styles.container}>
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
    <View style={{marginBottom:10}}>
      <ImageBackground source={require('./assets/pill_drop.jpg')} styles={styles.backgroundImage}>
    <Text style={{fontSize:30, fontWeight:'bold', padding:"1%"}}>금일 투약 횟수</Text>
    <Text style={styles.daystext}>아침</Text>
    <Text style={styles.daystext}>점심</Text>
    <Text style={styles.daystext}>저녁</Text>
    </ImageBackground>
    </View>
    <View style={styles.medicationReminder}>
      <Text style={styles.sectionTitle}>투약 알림</Text>
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
    </View>
  </ScrollView>
);

const CalendarScreen = ({ navigateTo }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => navigateTo('Home')}>
    <Text style={{fontSize:30, fontWeight:'bold', color:"black"}}>← 캘린더</Text>
    </TouchableOpacity>
  </View>
);

const SettingsScreen = ({ navigateTo }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => navigateTo('Home')}>
      <Text style={{fontSize:30, fontWeight:'bold', color:"black"}}>← 알림</Text>
    </TouchableOpacity>
  </View>
);

const PrivateScreen = ({ navigateTo }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => navigateTo('UserInfo')}>
      <Text style={{fontSize:30, fontWeight:'bold', color:"black"}}>← 개인 정보 관리</Text>
    </TouchableOpacity>
  </View>
);

const PasswordScreen = ({ navigateTo }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => navigateTo('UserInfo')}>
      <Text style={{fontSize:30, fontWeight:'bold', color:"black"}}>← 비밀번호 변경</Text>
    </TouchableOpacity>
  </View>
);


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

      <TouchableOpacity onPress={() => navigateTo('Password')}>
      <Text style={{ fontSize: 15, color: "black", marginBottom: 15 }}>비밀번호 변경</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateTo('Usercode')}>
        <Text style={{ fontSize: 15, color: "black", marginBottom: 15 }}>사용자 코드</Text>
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
  const randomCode = Math.random().toString(36).substr(2, 16).toUpperCase();
  return `${randomCode.slice(0, 4)}-${randomCode.slice(4, 8)}-${randomCode.slice(8, 12)}-${randomCode.slice(12, 16)}`;
};


//사용자 고유 번호
const UsercodeScreen = ({ navigateTo }) => {
  const [userCode, setUserCode] = useState('');

  // 임의의 사용자 코드 생성
  const generateUserCode = () => {
    // 사용자 코드를 무작위 문자열로 생성하는 로직
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const codeLength = 16;
    let code = '';
    for (let i = 0; i < codeLength; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  // 사용자 코드 생성 및 AsyncStorage에 저장
  useEffect(() => {
    AsyncStorage.getItem('userCode').then((savedCode) => {
      if (savedCode) {
        // AsyncStorage에 이미 사용자 코드가 저장되어 있는 경우
        setUserCode(savedCode); // 저장된 코드를 사용하여 화면에 표시
      } else {
        // AsyncStorage에 사용자 코드가 저장되어 있지 않은 경우
        const code = generateUserCode(); // 새로운 사용자 코드 생성
        setUserCode(code); // 화면에 표시
        AsyncStorage.setItem('userCode', code); // 생성된 코드를 AsyncStorage에 저장
      }
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

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('UserInfo')}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black' }}>← 사용자 코드</Text>
        </TouchableOpacity>
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
    </>
  );
};


//보호자 등록
const ParentaccountScreen = ({ navigateTo }) => {
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleCodeChange = (text, index) => {
    const newParentCodes = [...parentCodes];
    newParentCodes[index] = text;
    setParentCodes(newParentCodes);

    if (text.length === 4 && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const [parentCodes, setParentCodes] = React.useState(['', '', '', '']);

  const sendRegistrationRequestToParent = async () => {
    try {
      const parentCode = parentCodes.join('');
      await AsyncStorage.setItem('parentCode', parentCode);
      Alert.alert('보호자 등록 요청을 보냈습니다.');
    } catch (error) {
      console.error('보호자 등록 요청 실패:', error);
      Alert.alert('보호자 등록 요청을 보내지 못했습니다. 나중에 다시 시도해주세요.');
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

const MedicalScreen = ({ navigateTo }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigateTo('UserInfo')}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: "black" }}>← 내 약통 관리</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.content}>
      <TouchableOpacity onPress={() => navigateTo('약통등록')} style={styles.registrationButton}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: "black" }}>내 약통 등록</Text>
      </TouchableOpacity>
    </View>
  </View>
);




const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Home');

  const renderScreen = () => {
    switch (currentScreen) {

      // 홈 화면 상당
      case 'Calendar':
        return <CalendarScreen navigateTo={setCurrentScreen} />;
     
      case 'Settings':
        return <SettingsScreen navigateTo={setCurrentScreen} />;

        // 사용자 정보
      case 'Private':
          return <PrivateScreen navigateTo={setCurrentScreen} />;

      case 'Password':
            return <PasswordScreen navigateTo={setCurrentScreen} />;

      case 'Usercode':
          return <UsercodeScreen navigateTo={setCurrentScreen} />;

      case 'Parentaccount':
          return <ParentaccountScreen navigateTo={setCurrentScreen} />;

      case 'Medical':
          return <MedicalScreen navigateTo={setCurrentScreen} />;




          // 메인 화면
      case 'UserInfo':
        return <UserInfo navigateTo={setCurrentScreen} />;
      
        case 'Home':
      default:
        return <HomeScreen navigateTo={setCurrentScreen} />;
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
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#a5d6a7',
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
