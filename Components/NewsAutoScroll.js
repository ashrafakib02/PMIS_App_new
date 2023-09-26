import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";

export default function NewsAutoScroll() {
  const data = [
    {
      head: "Training Workshops of the Component-3",
      detail: "2023-01-13",
    },
    {
      head: "TRAINING WORKSHOPS OF THE COMPONENT-2",
      detail: "2022-09-28",
    },
    {
      head: "Component -4 Reports for January 2023",
      detail: "2023-01-11",
    },
    {
      head: "Meeting with the Contractor and Client",
      detail: "2022-11-23",
    },
    {
      head: "SMEC appointed to revive key Tajikistan road sections",
      detail: "2021-12-15",
    },
    {
      head: "Component -4 Reports for January 2023",
      detail: "2023-01-11",
    }, {
        head: "Training Workshops of the Component-3",
        detail: "2023-01-13",
      },
      {
        head: "TRAINING WORKSHOPS OF THE COMPONENT-2",
        detail: "2022-09-28",
      },
      {
        head: "Component -4 Reports for January 2023",
        detail: "2023-01-11",
      },
      {
        head: "Meeting with the Contractor and Client",
        detail: "2022-11-23",
      },
      {
        head: "SMEC appointed to revive key Tajikistan road sections",
        detail: "2021-12-15",
      },
      {
        head: "Component -4 Reports for January 2023",
        detail: "2023-01-11",
      }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      scrollViewRef.current.scrollTo({
        x: 0,
        y: (currentIndex + 1) * 10, // assuming each item height is 50
        animated: true,
      });
      setCurrentIndex((currentIndex + 1) % data.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <View
      style={{
        flex: 1,
        height: 300,
        padding: 10,
        backgroundColor: "#eff3ff",
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 16,
        shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 5,
    overflow: "hidden"
      }}
    >
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ height: data.length *80 }}
      >
        {data.map((item, index) => (
          <View
            key={index}
            style={{
              height: 80,
              borderBottomWidth: 0.5,
              borderBottomColor: "gray",
              borderBottomStyle: "dashed",
            }}
          >
            <Text style={{fontWeight:'600',fontSize:16,marginTop:2,color:'blue'}}>{item.head}</Text>
            <Text style={{fontSize:14,marginTop:2,marginTop:5,}}>{item.detail}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({});
