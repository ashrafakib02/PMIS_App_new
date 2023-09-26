import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ResizeMode, Video } from 'expo-av'
export default function Videoplay (props) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View>
      <Video
        source={{
          uri: 'http://117.247.187.20:8071/IDIP2/videos/IDIP2.mp4',
        }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        useNativeControls
        resizeMode='cover'
        isLooping={false}
        shouldPlay={false}
        useNativeControls
style={{height:200,margin:10,borderRadius:10, shadowColor: "#000",
shadowOffset: {
  width: -2,
  height: 2
},
shadowOpacity: 0.1,
shadowRadius: 1.5,
elevation: 5,
overflow: "hidden"}}      />
    </View>
  )
}


const styles = StyleSheet.create({})