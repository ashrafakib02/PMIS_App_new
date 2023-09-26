import { Dimensions, StyleSheet, Text, View } from 'react-native'
import  React, { useEffect, useState } from 'react';
import {LineChart} from "react-native-chart-kit";
import axios from 'axios';
import '../global'
export default function ChartShow()  {
  const [isLoading, setLoading] = useState(true);
  const [plannedData, setPlannedData] = useState([0]);
  const [actualData, setActualData] = useState([0]);
  const dashGraph = global.dashGraph;
  const [label, setLabel] = useState([]);
  const loginID = global.user_cd;
  const [value, setValue] = useState('0');
  const [isFocus, setIsFocus] = useState(false);
 

  useEffect(() => {
    var getpkgdatadrop={
        method:'get',
        url:dashGraph,
        headers:{
            'abc':'abc'
        }
    }
    axios(getpkgdatadrop)
.then (res=> {
    var count=Object.keys(res.data).length;
    let plannedArray=[];
    let actualArray=[];

    for (var i = 0; i < count; i++) {
      if(!parseFloat(res.data[i].planned)==0){
        plannedArray.push(parseFloat(res.data[i].planned));
      }
      if(!parseFloat(res.data[i].actual)==0){
        actualArray.push(parseFloat(res.data[i].actual));      }
       
    }
    setPlannedData(plannedArray);
    setActualData(actualArray);    
})
.catch(err=>{
    console.log(err)
});
console.log(plannedData);
console.log(actualData);

},[]);


  return (
    <View style={{flex:1}}>
    <LineChart
    // bezier
    withHorizontalLabels={true}
    withVerticalLabels={true}
    yAxisSuffix="%"
    data={{
      labels: ["Jan", "Feb","Mar", "Apr", "May", "June","Jul", "Aug","Sep", "Oct", "Nov", "Dec"],
        // labels: [' jan', ' feb', ' mar', ' apr', ' june', ' july'],
       
        datasets: [
         
                    {
                      data: plannedData,
                    
                      color: (opacity = 1) => `rgba(0,255,255, ${opacity})`, // optional
                                strokeWidth: 2,
                    },
                    {
                                data: actualData,
                                color: (opacity = 1) => `rgba(128,0,128, ${opacity})`, // optional,
                                strokeWidth: 2,
                    },
                ],
        legend: ['Planned', 'Actual'],
        }}
        width={Dimensions.get('window').width}
        height={200}
        chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        barPercentage:1 ,
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 0,
                        
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                           
                        },
                    }}
        style={{
                borderRadius: 16,
            }}
                />
    </View>
  )
}


const styles = StyleSheet.create({})