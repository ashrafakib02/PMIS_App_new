import {
  Alert,
  Image,
  Platform,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Footer from './Footer'
import tw from 'tailwind-react-native-classnames'
import ActivityByPackage from '../Components/ActivityByPackage'
import AllContractor from '../Components/AllContractor'
import IncidentType from '../Components/IncidentType'
import { useNavigation } from '@react-navigation/native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import PackageActivity from '../Components/PackageActivity'
import * as Location from 'expo-location'

export default function SiteDiaryEntry() {
  const navigation = useNavigation()

  const site_diary_entry = global.site_diary_entry
  const site_diary_fileupload = global.site_diary_fileupload

  const user_cd = global.user_cd

  const [file, setFile] = useState([])
  const [date2, setDate2] = useState('')
  const [time2, setTime2] = useState('')
  const [title, setTitle] = useState('')
  const [employerName, setEmployerName] = useState('0')
  const [activity, setActivity] = useState('0')
  const [description, setDescription] = useState('')
  const [isClicked, setClicked] = useState(false)
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  let DocuploadResult = 0
  let DocuploadResult2 = 0

  const dataFetch = (data, data2) => {
    if (data != '0') {
      setEmployerName(data)
    }

    if (data2 != '0') {
      setActivity(data2)
    }
  }

  useEffect(() => {
    (async () => {
      dateSet()
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setLatitude(location.coords.latitude)
      setLongitude(location.coords.longitude)

      let text = 'Waiting..'
  if (errorMsg) {
    text = errorMsg
  } else if (location) {
    text = JSON.stringify(location)
  }
    })()
  }, [])

  

  const dateSet = () => {
    var curDate = new Date().getDate()
    var curMonth = new Date().getMonth() + 1
    var curYear = new Date().getFullYear()
    var curHours = new Date().getHours()
    var curMin = new Date().getMinutes()
    var curSec = new Date().getSeconds()
    setDate2(curYear + '-' + curMonth + '-' + curDate)
    setTime2(curHours + ':' + curMin + ':' + curSec)
  }
  const insSubmit = () => {
    if (employerName == '0') {
      alert('Please Select Employer!')
    } else if (activity == '0' || activity == 'undefined') {
      alert('Please Select Activity!')
    }else if (title.length == 0) {
      alert('Please Enter Title!')
    } else if (description.length == 0) {
      alert('Please Enter Description!')
    } else if (file.length == 0) {
      alert('Please Select a File !')
    } else {
      setClicked(true)

      fetch(site_diary_entry, {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eid: user_cd,
          empID: employerName,
          wsid: activity,
          item_name: title.value,
          item_desc: description.value,
          pdate: date2,
          latitude: latitude,
          longitude: longitude,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          let loginObj = JSON.stringify(response)
          var parsed = JSON.parse(loginObj)
          var success = parsed.success
          if (success == 1) {
        
            uploadDocFiles()
          }else{
            setClicked(false)
          }
        })
        .catch((error) => {
          alert('Error ' + error)
        })
    }
  }
  const uploadDocFiles = async () => {
    // If file selected then create FormData
    for (let i = 0; i < file.length; i++) {
      const fileToUpload = file[i]
      const data = new FormData()
      data.append('name', fileToUpload.name)
      data.append('file_attachment', fileToUpload)
      // Please change file upload URL
      let res = await fetch(site_diary_fileupload, {
        method: 'post',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data; ',
        },
      })
      let responseJson = await res.json()
      if (responseJson.status == 1) {
        DocuploadResult++
      }
    }
    if ((DocuploadResult = file.length)) {
      Alert.alert('SUCCESS', 'Data Added Successfully', [
        {
          text: 'Cancel',
          onPress: () => navigation.replace('MainDashboard'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => navigation.replace('MainDashboard'),
        },
      ])
    }
  }

  const pickDocument = () => {
    let result = DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true,
    }).then((response) => {
      if (response.type == 'success') {
        let { name, size, uri } = response
        let nameParts = name.split('.')
        let fileType = nameParts[nameParts.length - 1]
        var fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: 'application/' + fileType,
        }
        console.log(fileToUpload.name, '...............file')

        docDataPicker(fileToUpload)
      }
    })
  }

  const docDataPicker = (docFull) => {
    setFile([...file, docFull])

    console.log('Doc: ' + file)
  }
const GotoDelete = (itemNme) => {
    const updatedFile = file.filter((item) => item.name !== itemNme);
    setFile(updatedFile);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Text style={styles.header}>Inspection Details</Text>
        <ScrollView style={{ flex: 1, margin: 2 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              DATE
            </Text>
            <Text
              style={[
                tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                styles.DataInputBox,
              ]}
            >
              {date2}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              TIME
            </Text>
            <Text
              style={[
                tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                styles.DataInputBox,
              ]}
            >
              {time2}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              EXACT LOCATION
            </Text>
            <Text
              style={[
                tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                styles.DataInputBox,
              ]}
            >
              {latitude}, {longitude}
            </Text>
          </View>
          <PackageActivity onChange={dataFetch} />

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              TITLE
            </Text>
            <TextInput
              style={[
                tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                styles.DataInputBox,
              ]}
              onChangeText={(text) => setTitle({ value: text, error: '' })}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.titleBoxBig}>DETAILS</Text>
            <TextInput
              style={[tw`text-indigo-700`, styles.DataBoxBig]}
              onChangeText={(text) =>
                setDescription({ value: text, error: '' })
              }
              multiline={true} // ios fix for centering it at the top-left corner
              numberOfLines={10}
            />
          </View>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              Attachment
            </Text>
            <Text
              onPress={pickDocument}
              style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}
            >
              Attach Document
            </Text>
          </View>
          <ScrollView
            style={[tw`text-indigo-700`, styles.DocBox]}
            horizontal={true}
          >
            {file.map((data) => (
              <View>
                {data.name.includes('.pdf') ? (
                 <ImageBackground
                 source={{
                   uri: "https://cdn.pixabay.com/photo/2017/03/08/21/20/pdf-2127829_960_720.png",
                 }}
                 style={{ width: 200, height: 200, margin: 10, padding: 5 }}
               >
                 <View style={{ padding: 5, alignItems: "flex-end" }}>
                   <TouchableOpacity
                     style={{ borderColor: "black", borderWidth: 1 }}
                     onPress={() => GotoDelete(data.name)}
                   >
                     <Image
                       source={require("../assets/trash.png")}
                       style={{
                         width: 20,
                         height: 20,
                         margin: 5,
                         alignContent: "flex-end",
                       }}
                     />
                   </TouchableOpacity>
                 </View>
               </ImageBackground>
             ) : (
               <ImageBackground
                 source={{ uri: data.uri }}
                 style={{ width: 200, height: 200, margin: 10, padding: 5 }}
               >
                 <View style={{ padding: 5, alignItems: "flex-end" }}>
                   <TouchableOpacity
                     style={{ borderColor: "black", borderWidth: 1 }}
                     onPress={() => GotoDelete(data.name)}
                   >
                     <Image
                       source={require("../assets/trash.png")}
                       style={{
                         width: 20,
                         height: 20,
                         margin: 5,
                         alignContent: "flex-end",
                       }}
                     />
                   </TouchableOpacity>
                 </View>
               </ImageBackground>
                )}
              </View>
            ))}
          </ScrollView>

          {!isClicked ? (
            <TouchableOpacity
              onPress={insSubmit}
              activeOpacity={0.8}
              style={{
                flex: 1,
                marginTop: 10,
                marginLeft: 10,
                marginRight: 10,
                justifyContent: 'center',
                marginBottom: 5,
                backgroundColor: 'blue',
                padding: 5,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 18,
                  textAlign: 'center',
                  justifyContent: 'center',
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          ) : null}
        </ScrollView>
      </View>
      <Footer />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  header: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleBox: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 5,
    fontSize: 14,
    width: 100,
    textAlignVertical: 'center',
  },
  DataBox: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    fontSize: 14,
    backgroundColor: '#d0f5e6',
    textAlignVertical: 'center',
  },
  dropDown: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 14,
    backgroundColor: '#d0f5e6',
  },
  DataInputBox: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    fontSize: 14,
  },
  titleBoxBig: {
    flex: 1,
    backgroundColor: 'blue',
    color: 'white',
    padding: 5,
    fontSize: 14,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  DataBoxBig: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    fontSize: 14,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    height: 100,
    flexShrink: 1,
    textAlignVertical: 'top',
  },
})
