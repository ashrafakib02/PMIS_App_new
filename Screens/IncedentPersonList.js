import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import React, { useEffect, useState } from 'react'
import '../global'
import Footer from './Footer';
import { useNavigation } from '@react-navigation/native';
import Header from '../Components/Header';
import tw from 'tailwind-react-native-classnames';

export default function IncedentPersonList({ route }){
  const { incident_form_id } = route.params
  const navigation = useNavigation();
  var fetch_accident_person=global.fetch_accident_person;


  const loginId = global.user_cd;
  const [title, setTitle] = useState('0');
  const [label, setLabel] = useState('0');
  const [user, setUser] = useState('0');


  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  

  const onItemPressed = item => {
    navigation.navigate('IncedentPersonDetails', {
      incident_person_id: item.incident_person_id,
    }
    );
  };
  useEffect(() => {
    fetch(fetch_accident_person, {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: incident_form_id,

      }),
    })
      .then(response => response.json())
      .then(json => setData(json))
      .finally(setLoading(false));
  },[]);
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Header style={{ color: 'black' }} />
      <View>
        <Text style={tw` ml-10 mt-5 font-bold`}>Welcome, {global.name} </Text>
      </View>
      <View>
        <Text style={tw` ml-10 mt-5 mb-2.5 text-indigo-700 text-xl font-bold`}>Showing Injured Person List</Text>
      </View>
      {data.success == '1'?
                   <View style={{flex:1}}>
      {isLoading ? (
        <ActivityIndicator animating={true} size="large" color="#0000ff" />
      ) : (
        <View style={{
          flex: 1,
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 10,
          margin: 10, paddingTop: 5
          , paddingBottom: 5,
        }}>

          <FlatList
            data={data.users_data}
            keyExtractor={({ rfi_form_id }, index) => rfi_form_id}
            renderItem={({ item }) => (
              
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => onItemPressed(item)}>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: 'black',
                    backgroundColor: 'white',
                    marginLeft: 5,
                    marginRight: 5,
                    marginTop: 5,
                    padding: 5,
                    borderRadius: 10,

                    shadowColor: "rgba(0,0,1,1)",
                    shadowOffset: {
                      width: 2,
                      height: 2
                    },
                    elevation: 2,
                    shadowOpacity: 0.90,
                    shadowRadius: 1
                  }}>
                  <Text
                    style={styles.boxtext}>
                    Person Name:  {item.name}
                  </Text>
                  <Text
                    style={styles.boxtext}>
                    Accident No.:  {item.accidentNo}
                  </Text> 
                  <Text
                    style={styles.boxtext}>
                    Employer Name:  {item.employerName2}
                  </Text> 
                  <Text
                    style={styles.boxtext}>
                    Date:  {item.submissionDate}
                  </Text>
                  
                 
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

      )}
       </View>: <View style={{flex:1}}>
      <View style={{
          flex: 1,
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 10,
          margin: 10, paddingTop: 5
          , paddingBottom: 5,
        }}>
<Text style={{
          flex: 1,
         fontSize:15,
          margin: 10, paddingTop: 5
          , paddingBottom: 5,
        }}>No data Found</Text>
        </View>
        
        </View>}
      <Footer />
    </SafeAreaView>
  );

}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 5,
  },
  box: {
    width: '50%',
    height: '50%',
    padding: 5,
  },
  inner: {
    borderRadius: 10,
    flex: 1,
    backgroundColor: '#002a55',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxtextsty: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  boxtext: {
    marginTop: 5,
    backgroundColor: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
  },
  boxtextRed: {
    marginTop: 5,
    backgroundColor: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    color: 'red',
  },
  positiontextRed: {
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 18,
    color: '#ff4466',
  },
  positiontextGreen: {
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 18,
    color: '#1cfebd',
  },
  
  button: {
    width: 70,
    height: 30,
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#80b900',
    padding: 5,
    borderRadius: 10,
  },
  buttonSearch: {
    flexDirection: 'row',
    width: 130,
    height: 40,
    marginTop: 5,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#72a400',
    padding: 5,
    borderRadius: 10,
  },
  buttonSearch2: {
    flexDirection: 'row',
    width: 130,
    height: 40,
    marginTop: 20,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#003da6',
    padding: 5,

    borderRadius: 10,
  },
  dropdownStyles: {
    backgroundColor: '#eee',
    width: '100%',
    height: 50,
    padding: 15,
    borderRadius: 10,
  },
});