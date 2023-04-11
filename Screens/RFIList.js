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
import DropDownPicker from 'react-native-dropdown-picker'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import '../global'
import Footer from './Footer'
import { useNavigation } from '@react-navigation/native'
import Header from '../Components/Header'
import tw from 'tailwind-react-native-classnames'
import AllPackages from '../Components/AllPackages'
import AllApproval from '../Components/AllApproval'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

export default function RFIList({ route }) {
  const { userId } = route.params
  global.superUserId=userId;
  const navigation = useNavigation()
  var rfi_list = ''
  var loginId = '0'

  const [title, setTitle] = useState('0')
  const [label, setLabel] = useState('ALL')
  const [user, setUser] = useState('0')
  const [approvalId, setApprovalId] = useState('ALL')
  const [date2, setDate2] = useState('Select Start Date')
  const [date3, setDate3] = useState('Select End Date')
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false)
  const [isFilter, setIsFilter] = useState(false);

  if (userId != '0') {
    loginId = userId
  } else {
    loginId = global.user_cd
  }

  if (global.admin_rfi == '1' && userId != '0') {
    rfi_list = global.rfi_fetch_sup
  } else if (global.admin_rfi == '1' && userId == '0') {
    rfi_list = global.rfi_admin_list
  } else if (global.rfi_super == '1') {
    rfi_list = global.rfi_fetch_sup
  } else if (global.rfi_cre == '1' && userId != '0') {
    rfi_list = global.rfi_fetch_sup
  } else if (global.rfi_cre == '1' && userId == '0') {
    rfi_list = global.rfi_gc_list
  } else {
    rfi_list = global.rfi_fetch_cont
  }
  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }
  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date) => {
    // setDate2(date);
    var curDate = date.getDate()
    var curMonth = date.getMonth() + 1
    var curYear = date.getFullYear()
    setDate2(curYear + '-' + curMonth + '-' + curDate)
    console.log(date2)
    hideDatePicker()
  }

  const showDatePicker2 = () => {
    setDatePickerVisibility2(true)
  }
  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false)
  }

  const handleConfirm2 = (date) => {
    // setDate2(date);
    var curDate = date.getDate()
    var curMonth = date.getMonth() + 1
    var curYear = date.getFullYear()
    setDate3(curYear + '-' + curMonth + '-' + curDate)
    console.log(date2)
    hideDatePicker2()
  }

  const onItemPressed = (item) => {
    navigation.navigate('RFIDetails', {
      rfi_form_id: item.rfi_form_id,
    })
  }
  const filterSet=()=>{

    if(!isFilter){
      setIsFilter(true)
    }else{setIsFilter(false)}
  
  }
  const dataFetch2=(data, label, user)=>{
setTitle(data);
setLabel(label);
setUser(user);
  
  }
  const dataFetch=(data)=>{
    if(data!=1)
    {setApprovalId(data);}
    else{setApprovalId("ALL");}
      }
  useEffect(() => {
    const aboutCont = new AbortController()
    fetch(rfi_list, {
      signal: aboutCont.signal,
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loginID: loginId,
        title: label,
        approvalId:approvalId,
        startDate:date2,
        endDate:date3,
      }),
    })
      .then((response) => response.json())
      .then((json) => setData(json))
      .finally(setLoading(false))
      console.log(data);
    // dataFetch(title, label, user)
  }, [label,approvalId,date2,date3])
  // const dataFetch = (data, label, user) => {
   
  // }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Header style={{ color: 'black' }} />
      <View>
        <Text style={tw` ml-10 mt-5 font-bold`}>Welcome, {global.name} </Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <Text style={styles.textstyle}>
          Showing RFI List{' '}
        </Text>
      <TouchableOpacity style={styles.container2} onPress={filterSet}>
      <Icon name={"filter"} style={styles.caption}></Icon>
      <Text style={{textAlign:'right'}}>Filter</Text>
    </TouchableOpacity>
      </View>
      {global.admin_rfi == '1' ? <AllPackages onChange={dataFetch2} /> : null}
      {global.rfi_super == '1' ? <AllPackages onChange={dataFetch2} /> : null}
      {global.rfi_cre == '1' ? <AllPackages onChange={dataFetch2} /> : null}
      {isFilter ?
      <View style={{marginBottom:20}}>
        <AllApproval onChange={dataFetch}/>
        <View style={{ flexDirection: 'row', marginLeft: 5 ,marginBottom:20}}>
          <Text
            onPress={showDatePicker}
            style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.dropdown]}
          >
            {date2}
          </Text>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <Text
            onPress={showDatePicker2}
            style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.dropdown]}
          >
            {date3}
          </Text>
          <DateTimePickerModal
            isVisible={isDatePickerVisible2}
            mode="date"
            onConfirm={handleConfirm2}
            onCancel={hideDatePicker2}
          />
        </View>
      </View>:null}

      {isLoading ? (
        <ActivityIndicator animating={true} size="large" color="#0000ff" />
      ) : (
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            margin: 10,
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          {data.success == '1' ? (
            <FlatList
              data={data.users_data}
              keyExtractor={({ rfi_form_id }, index) => rfi_form_id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => onItemPressed(item)}
                >
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

                      shadowColor: 'rgba(0,0,1,1)',
                      shadowOffset: {
                        width: 2,
                        height: 2,
                      },
                      elevation: 2,
                      shadowOpacity: 0.9,
                      shadowRadius: 1,
                    }}
                  >
                    <Text style={styles.boxtext}>
                      Package Name: {item.package_name}
                    </Text>
                    <Text style={styles.boxtext}>RFI No: {item.rfi_no}</Text>
                    <Text style={styles.boxtext}>
                      Submission Date: {item.submission_date}
                    </Text>

                    {item.verify_status == '0' &&  global.rfi_cre == '1' && userId=='0'? (
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
                          backgroundColor: '#DFFF00',
                          padding: 5,
                          borderRadius: 10,
                        }}
                      >
                        Not Yet Verified
                      </Text>
                    ) : null}
                    {item.verify_status == '2' &&  global.rfi_cre == '1'  && userId=='0'? (
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
                          backgroundColor: '#C41E3A',
                          padding: 5,
                          borderRadius: 10,
                        }}
                      >
                        Rejected
                      </Text>
                    ) : null}
                    {item.verify_status == '1' &&  global.rfi_cre == '1'  && userId=='0'? (
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
                          backgroundColor: '#50C878',
                          padding: 5,
                          borderRadius: 10,
                        }}
                      >
                        Verified
                      </Text>
                    ) : null}
                    {item.rfi_approved_status == '0' &&
                    ((global.admin_rfi== '1' ||
                      global.rfi_super == '1' ||
                      global.rfi_contractor == '1')  || (global.rfi_cre == '1' && userId!='0'))? (
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
                          backgroundColor: '#DFFF00',
                          padding: 5,
                          borderRadius: 10,
                        }}
                      >
                        Pending
                      </Text>
                    ) : null}
                    {item.rfi_approved_status == '1' &&
                    ((global.admin_rfi == '1'||
                      global.rfi_super == '1' ||
                      global.rfi_contractor == '1') || (global.rfi_cre == '1' && userId!='0')) ? (
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
                          backgroundColor: '#50C878',
                          padding: 5,
                          borderRadius: 10,
                        }}
                      >
                        Approved
                      </Text>
                    ) : null}
                    {item.rfi_approved_status == '2' &&
                    ((global.admin_rfi == '1'||
                      global.rfi_super == '1' ||
                      global.rfi_contractor == '1') || (global.rfi_cre == '1' && userId!='0'))? (
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
                          backgroundColor: '#FFA500',
                          padding: 5,
                          borderRadius: 10,
                        }}
                      >
                        Not Approved
                      </Text>
                    ) : null}
                    {item.rfi_approved_status == '3' &&
                    ((global.admin_rfi == '1'||
                      global.rfi_super == '1' ||
                      global.rfi_contractor == '1') || (global.rfi_cre == '1' && userId!='0'))? (
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
                          backgroundColor: '#FF0000',
                          padding: 5,
                          borderRadius: 10,
                        }}
                      >
                        Rejected By Supervisor
                      </Text>
                    ) : null}
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 15,
                  margin: 10,
                  paddingTop: 5,
                  paddingBottom: 5,
                }}
              >
               No Data Found
              </Text>
            </View>
          )}
        </View>
      )}
      <Footer />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 5,
  },
  titleBox: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 5,
    fontSize: 14,
    width: 100,
    textAlignVertical: 'center',
  },
  dropdown: {
    flex: 1,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    fontSize:16,
    paddingTop:5,
    paddingLeft:10,
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
  container2: {
    flex:1,
    alignItems:'flex-end',
    borderRadius: 2,
    marginTop:40,
    marginRight:15,
  },
  caption: {
    color: 'black',
    fontSize: 24,
    justifyContent:'center',
    alignItems:'flex-end'
  },
  textstyle:{
    marginTop:40,
    marginLeft:40,
    fontWeight:'bold',
    fontSize:22,
    color:'indigo',
    flex:1

  }
})
