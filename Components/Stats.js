import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
export default function Stats (props) {
  return (
   
<View style={{marginBottom:20}}>
  <View style={{flexDirection:'row'}}>
    <View style={styles.boxStyle}>
    <View style={{flexDirection:'row'}}>
    <Image
          style={styles.boxImageStyle}
          source={require("../assets/planned.png")}
        />
        <Text style={styles.boxTextStyle}>
        Planned Progress </Text>
    </View>
    <Text style={styles.numberStyle}>
        100% </Text>
    </View>
    <View style={styles.boxStyle}>
    <View style={{flexDirection:'row'}}>
    <Image
          style={styles.boxImageStyle}
          source={require("../assets/progress.png")}
        />
        <Text style={styles.boxTextStyle}>
        Physical  Progress </Text>
    </View>
    <Text style={styles.numberStyle}>
        68.00% </Text>
    </View>
    <View style={styles.boxStyle}>
    <View style={{flexDirection:'row'}}>
    <Image
          style={styles.boxImageStyle}
          source={require("../assets/financial.png")}
        />
        <Text style={styles.boxTextStyle}>
        Financial Progress </Text>
    </View>
    <Text style={styles.numberStyle}>
    75.00%</Text>
    </View>
    
  </View>
  <View style={{flexDirection:'row'}}>
    <View style={styles.boxStyle}>
    <View style={{flexDirection:'row'}}>
    <Image
          style={styles.boxImageStyle}
          source={require("../assets/contract_value.png")}
        />
        <Text style={styles.boxTextStyle}>
        Total Project Cost</Text>
    </View>
    <Text style={styles.numberStyle}>
    81,962,455,475 KZT </Text>
    </View>
    <View style={styles.boxStyle}>
    <View style={{flexDirection:'row'}}>
    <Image
          style={styles.boxImageStyle}
          source={require("../assets/payment.png")}
        />
        <Text style={styles.boxTextStyle}>
        Total Payment</Text>
    </View>
    <Text style={styles.numberStyle}>
    68,696,322,571 KZT</Text>
    </View> 
  </View>
</View>

  )
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
