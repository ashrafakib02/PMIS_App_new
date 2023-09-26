import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationActions } from '@react-navigation/native'
import React from "react";
import tw from "tailwind-react-native-classnames";
import Footer from "./Footer";
import Stats from "../Components/Stats"
import ChartShow from "../Components/ChartShow";
import Videoplay from "../Components/VideoPlay";
import NewsAutoScroll from "../Components/NewsAutoScroll";
import ImageCarousel from "../Components/ImageCarousel";

export default function DashBoard({ navigation }) {
  const loadInBrowser = () => {
    Linking.openURL(
      "http://117.247.187.20:8071/IDIP2/index.php",
    ).catch((err) => console.error("Couldn't load page", err))
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.containerTop}>
        <Image
          style={styles.imageStyle}
          source={require("../assets/smec.png")}
        />
        <View >
          <Text
            style={{
             width:'60%',
              fontWeight: "bold",
              textShadowColor: "#000",
              textShadowOffset: {
      width: -.4,
      height: .5
    },
    textShadowOpacity: 0.1,
    textShadowRadius: .5,
    elevation: 5,
    overflow: "hidden"
            }}
          >
            Project Monitoring and Management Information System (PMIS)
          </Text>
          <Text
            style={{
              width:'60%',
              fontSize: 12,
              
            }}
          >
           Second Irrigation and Drainage Improvement Project IDIP 2 Time Based
          </Text>
        </View>
      </View>
      <View style={{flexDirection:'row',marginBottom:10,justifyContent:'center', backgroundColor:"#e6e6fa"}}>
        
      <TouchableOpacity 
               onPress={() => loadInBrowser()}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: 'blue',
                backgroundColor: 'white',
                marginLeft: '5%',
                marginRight: '5%',
                marginTop: 10,
                padding:5,
                shadowColor: "rgba(0,0,1,1)",
shadowOffset: {
  width: 3,
  height: 3
},
elevation: 5,
shadowOpacity: 0.50,
shadowRadius: 2

              }}>
                <Text style={{ fontWeight: 'bold' }}>Go to PMIS</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
              onPress={()=>navigation.navigate('MainDashboard', {
                
              })}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: 'blue',
                backgroundColor: 'white',
                padding:5,
                marginLeft: '5%',
                marginRight: '5%',
                marginTop: 10,
                shadowColor: "rgba(0,0,1,1)",
shadowOffset: {
  width: 3,
  height: 3
},
elevation: 5,
shadowOpacity: 0.50,
shadowRadius: 2

              }}>
                <Text style={{ fontWeight: 'bold' }}>See Modules</Text>
              </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: "white", }}>
        <Stats/>
        <ImageCarousel />
     <ChartShow />
     <Videoplay/>
     <NewsAutoScroll />
     </ScrollView>
      <Footer />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  containerTop: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'center',
    backgroundColor: "#e6e6fa",
  },
  imageStyle: {
    resizeMode: "contain",
    height: 80,
    width: 80,
    marginLeft: 5,
    
  },
  boxStyle:{
    flex:1,
    backgroundColor: "#e6e6fa",
    marginTop:20,
    marginLeft:5,
    marginRight:5,
    justifyContent:'center',
    padding:5,
    borderRadius:5,
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 5,
    overflow: "hidden"
  },
  boxImageStyle: {
    resizeMode: "contain",
    height: 25,
    width: 25,
    marginLeft: 5,
    
    
  },
  boxTextStyle: {
    fontWeight: "bold",
   fontSize:14,
   textAlign:'justify',
   marginLeft:5,    
  },
  numberStyle: {
    fontWeight: "bold",
    marginLeft:5,
   fontSize:20,
   textAlign:'justify'    
  },
});
