import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  StatusBar,
  ActivityIndicator,
  ScrollView,
  SectionList,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import tw from 'tailwind-react-native-classnames'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Footer from './Footer'
import Header from '../Components/Header'
import "../global"
import AllSupervisor from '../Components/AllSupervisor'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from "@react-navigation/native";

export default function RFIAdminDash (){
  const navigation = useNavigation();  

  const rfi_admin_dash = global.rfi_fetch_admin;
  const rfi_super_dash = global.sup_dash;
  const loginID = global.user_cd;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [data3, setData2] = useState('0');
  const [isFilter, setIsFilter] = useState(false);
  const [superId, setSuperId] = useState('0');
  const [superData, setSuperData] = useState([]);
  const filterSet=()=>{

    if(!isFilter){
      setIsFilter(true)
    }else{setIsFilter(false)}
  
  }
  const dataFetch = (data2) => {
    setData2(data2);
    fetch(rfi_super_dash, {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loginID: data2,
      }),
    })
      .then(response => response.json())
      .then(json => setSuperData(json))
      .catch((error) => console.error(error))
      .finally(setLoading(false));
  }
  useEffect(() => {
    fetch(rfi_admin_dash, {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loginID: loginID,
      }),
    })
      .then(response => response.json())
      .then(json => setData(json))
      .catch((error) => console.error(error))
      .finally(setLoading(false));
  }, []);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white',padding:5 }}>
    <Header style={{ color: 'black' }} />
    <View style={{flexDirection:'row'}}>
      <Text style={styles.textStyle}>Welcome, {global.name} </Text>
      <TouchableOpacity style={styles.container2} onPress={filterSet}>
      <Icon name={"filter"} style={styles.caption}></Icon>
      <Text>Filter</Text>
    </TouchableOpacity>
    </View>
    <ScrollView>
    <View>
      <Text style={tw` ml-10 mt-10 font-bold`}>Request for Inspection (RFI) </Text>
    </View>
    {isLoading ? (
      <ActivityIndicator animating={true} size="small" color="#0000ff" />
    ) : (
      <FlatList
        data={data.users_data}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>


            <View style={[tw`pt-5 pl-5 pr-5 pb-5 ml-5 mr-5 mt-5 shadow-neutral-900 rounded-3xl bg-indigo-900`,styles.shadow]}>
              <View style={{flexDirection: 'row',}}>

                <View style={{  flex: 1, alignItems: 'flex-start',  }}>
                  <Text style={styles.box_text}>RFI Recieved:</Text>
                </View>

                <View style={{ flex: 1, alignItems:'flex-end'  }}>
                  <Text style={styles.box_text}>{item.raised}</Text>
                </View>

              </View>
              <View style={{ marginTop: 10,flexDirection: 'row' }}>

                <View style={{flex: 1, alignItems: 'flex-start',  }}>
                  <Text style={styles.box_text}>RFI Approved:</Text>
                </View>

                <View style={{flex: 1, alignItems: 'flex-end',  }}>
                  <Text style={styles.box_text}>{item.Approved}</Text>
                </View>

              </View>

              <View style={{ marginTop: 10,flexDirection: 'row' }}>

                <View style={{flex: 1, alignItems: 'flex-start',  }}>
                  <Text style={styles.box_text}>RFI Not Approved:</Text>
                </View>

                <View style={{ flex: 1, alignItems: 'flex-end',  }}>
                  <Text style={styles.box_text}>{item.NotApproved}</Text>
                </View>

              </View>

              <View style={{flexDirection: 'row', marginTop: 10, }}>

                <View style={{ flex: 1, alignItems: 'flex-start',  }}>
                  <Text style={styles.box_text}>RFI Feedback Pending:</Text>
                </View>

                <View style={{ alignItems: 'flex-end',  }}>
                  <Text style={styles.box_text}>{item.pending}</Text>
                </View>

              </View>

              <View style={{ marginTop: 10,flexDirection: 'row' }}>

                <View style={{flex: 1, alignItems: 'flex-start',  }}>
                  <Text style={styles.box_text}>Next RFI date:</Text>
                </View>

                <View style={{  flex: 1, alignItems: 'flex-end',  }}>
                  <Text style={styles.box_text}>{item.submission_date}</Text>
                </View>

              </View>
            </View>
            <View>
              
              <TouchableOpacity 
              onPress={()=>navigation.navigate('RFIList', {
                pkgId: global.package_title,
                userId:data3,
              })}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: 'blue',
                backgroundColor: 'white',
                height: 50,
                marginLeft: '20%',
                marginRight: '20%',
                marginTop: 30,
                shadowColor: "rgba(0,0,1,1)",
shadowOffset: {
  width: 3,
  height: 3
},
elevation: 5,
shadowOpacity: 0.50,
shadowRadius: 2

              }}>
                <Text style={{ fontWeight: 'bold' }}>RFI List</Text>
              </TouchableOpacity>
            </View>
          </View>

        )}
      />
    )}
    {isFilter?
    <View>
    <AllSupervisor onChange={dataFetch}  />
      {!superId == '0'?
<View>
{isLoading ? (
      <ActivityIndicator animating={true} size="small" color="#0000ff" />
    ) : (
      <FlatList
        data={superData.users_data}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>


            <View style={[tw`pt-5 pl-5 pr-5 pb-5 ml-5 mr-5 mt-5 shadow-neutral-900 rounded-3xl bg-indigo-900`,styles.shadow]}>
              <View style={{flexDirection: 'row',}}>

                <View style={{  flex: 1, alignItems: 'flex-start',  }}>
                  <Text style={styles.box_text}>RFI Recieved:</Text>
                </View>

                <View style={{ flex: 1, alignItems:'flex-end'  }}>
                  <Text style={styles.box_text}>{item.raised}</Text>
                </View>

              </View>
              <View style={{ marginTop: 10,flexDirection: 'row' }}>

                <View style={{flex: 1, alignItems: 'flex-start',  }}>
                  <Text style={styles.box_text}>RFI Approved:</Text>
                </View>

                <View style={{flex: 1, alignItems: 'flex-end',  }}>
                  <Text style={styles.box_text}>{item.Approved}</Text>
                </View>

              </View>

              <View style={{ marginTop: 10,flexDirection: 'row' }}>

                <View style={{flex: 1, alignItems: 'flex-start',  }}>
                  <Text style={styles.box_text}>RFI Not Approved:</Text>
                </View>

                <View style={{ flex: 1, alignItems: 'flex-end',  }}>
                  <Text style={styles.box_text}>{item.NotApproved}</Text>
                </View>

              </View>

              <View style={{flexDirection: 'row', marginTop: 10, }}>

                <View style={{ flex: 1, alignItems: 'flex-start',  }}>
                  <Text style={styles.box_text}>RFI Feedback Pending:</Text>
                </View>

                <View style={{ alignItems: 'flex-end',  }}>
                  <Text style={styles.box_text}>{item.pending}</Text>
                </View>

              </View>

              <View style={{ marginTop: 10,flexDirection: 'row' }}>

                <View style={{flex: 1, alignItems: 'flex-start',  }}>
                  <Text style={styles.box_text}>Next RFI date:</Text>
                </View>

                <View style={{  flex: 1, alignItems: 'flex-end',  }}>
                  <Text style={styles.box_text}>{item.submission_date}</Text>
                </View>

              </View>
            </View>
            <View>
              
              <TouchableOpacity 
              onPress={()=>navigation.navigate('RFIList', {
                pkgId: global.package_title,
                userId:data3,
              })}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: 'blue',
                backgroundColor: 'white',
                height: 50,
                marginLeft: '20%',
                marginRight: '20%',
                marginTop: 30,
                shadowColor: "rgba(0,0,1,1)",
shadowOffset: {
  width: 3,
  height: 3
},
elevation: 5,
shadowOpacity: 0.50,
shadowRadius: 2

              }}>
                <Text style={{ fontWeight: 'bold' }}>Supervisor RFI List</Text>
              </TouchableOpacity>
            </View>
          </View>

        )}
      />
    )}
</View>:null
      }
    
    </View>
    :null}
    </ScrollView>
    <Footer/>
  </SafeAreaView>

  );
}


const styles = StyleSheet.create({
  box_text: {
    color: 'white'
  },
  shadow:{
    shadowColor: "rgba(0,0,1,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 10,
    shadowOpacity: 0.60,
    shadowRadius: 2
  },
  container2: {
    justifyContent: 'flex-end',
    borderRadius: 2,
    marginTop:20,
    marginRight:15,
  },
  caption: {
    color: 'black',
    fontSize: 24,
    justifyContent:'flex-end'
  },
  // tw`my-10 ml-10 mt-5 font-bold`,
  textStyle:{
    marginTop:20,
    marginLeft:40,
    // marginTop:20,
    fontWeight:'bold',
    fontSize:16,
    flex:1



  }
})