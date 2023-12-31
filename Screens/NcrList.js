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
import AllPackages from '../Components/AllPackages';

export default function NcrList(){
  const navigation = useNavigation();
    var eshs_list="";
  
  
    const loginId = global.user_cd;
    const [title, setTitle] = useState('0');
    const [label, setLabel] = useState('0');
    const [user, setUser] = useState('0');
    

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
  
    if (global.admin =='1') {
      eshs_list = global.fetch_ncn_admin;
    }
    else if (global.eshs_super =='1') {
      eshs_list = global.fetch_ncn_gc;
    } else if(global.eshs_contractor =='1'){
        eshs_list = global.fetch_ncn_con;
  
    }else{
      eshs_list = global.fetch_ncn;
    }
  
    const onItemPressed = item => {
      navigation.navigate('NcrDetails', {
        ncnId: item.ncnId,
        ncn_submitted_by: item.name,
        ncn_submitted_by: item.name,
      }
      );
    };
    useEffect(() => {
      dataFetch(title,label,user);
    },[]);
    const dataFetch=(data,label,user)=>{
      fetch(eshs_list, {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: loginId,
          title:label
  
        }),
      })
        .then(response => response.json())
        .then(json => setData(json))
        .finally(setLoading(false));
  }
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <Header style={{ color: 'black' }} />
        <View>
          <Text style={tw` ml-10 mt-5 font-bold`}>Welcome, {global.name} </Text>
        </View>
        <View>
          <Text style={tw` ml-10 mt-5 mb-2.5 text-indigo-700 text-xl font-bold`}>Showing NCR List</Text>
        </View>
        {global.eshs_super == '1' ?
                      <AllPackages onChange={dataFetch}/> : null
                    }
                    {global.rfi_cre == '1' ?
                      <AllPackages onChange={dataFetch}/> : null
                    }
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
  {data.success == '1'?
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
                      Package:  {item.packag}
                    </Text>
                    <Text
                      style={styles.boxtext}>
                      NCR No.:  {item.ncnNo}
                    </Text> 
                    <Text
                      style={styles.boxtext}>
                      Target Date:  {item.date}
                    </Text> 
                    <Text
                      style={styles.boxtext}>
                      Submitted By:  {item.name}
                    </Text>
                    
                     {item.outdated == '1' ?
                     <Text
                       style={{
                         flex: 1,
                         color: 'black',
                         fontWeight: 'bold',
                         fontSize: 14,
                         height: 30,
                         marginTop: 10,
                         marginLeft: 5,
                         marginRight: 5,
                         marginBottom: 5,
                         textAlign: 'center',
                         backgroundColor: '#FF0000',
                         padding: 5,
                         borderRadius: 10
                        
                       }}>
                       Target Date is over
                     </Text> : null
                   }
                    
                    {item.outdated != '1' && item.isReviewed == '0' && item.isApproved == '0' ?
                      <Text
                        style={{
                          flex: 1,
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: 14,
                          height: 30,
                          marginTop: 10,
                          marginLeft: 5,
                          marginRight: 5,
                          marginBottom: 5,
                          textAlign: 'center',
                          backgroundColor: '#fce65f',
                          padding: 5,
                          borderRadius: 10
                        }}>
                        Under Review
                      </Text> : null
                    }
                    {item.outdated != '1' && item.isReviewed == '1' && item.isApproved == '0' ?
                      <Text
                        style={{
                          flex: 1,
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 14,
                          height: 30,
                          marginTop: 10,
                          marginLeft: 5,
                          marginRight: 5,
                          marginBottom: 5,
                          textAlign: 'center',
                          backgroundColor: '#FFBF00',
                          padding: 5,
                          borderRadius: 10
                        }}>
                        Not Closed
                      </Text> : null
                    }
                    {item.outdated != '1'&& item.isReviewed == '1' && item.isApproved == '1' ?
                      <Text
                        style={{
                          flex: 1,
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 14,
                          height: 30,
                          marginTop: 10,
                          marginLeft: 5,
                          marginRight: 5,
                          marginBottom: 5,
                          textAlign: 'center',
                          backgroundColor: '#A6CE4C',
                          padding: 5,
                          borderRadius: 10
                        }}>
                        Closed
                      </Text> : null
                    }
                  </View>
                </TouchableOpacity>
              )}
            /> : <View style={{flex:1}}>
      
<Text style={{
          flex: 1,
         fontSize:15,
          margin: 10, paddingTop: 5
          , paddingBottom: 5,
        }}>No data Found</Text>
        
        
        </View>}
          </View>
  
        )}
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