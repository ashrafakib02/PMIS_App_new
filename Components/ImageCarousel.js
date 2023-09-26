import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Image, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const images = [
  { id: 1, url: 'http://117.247.187.20:8071/IDIP2/pages/project-tools/photo_slider/banner/thump_1683003900.jfif' },
  { id: 2, url: 'http://117.247.187.20:8071/IDIP2/pages/project-tools/photo_slider/banner/thump_1683003958.jpg' },
  { id: 3, url: 'http://117.247.187.20:8071/IDIP2/pages/project-tools/photo_slider/banner/thump_1683003924.png' },
  { id: 2, url: 'http://117.247.187.20:8071/IDIP2/pages/project-tools/photo_slider/banner/thump_1683003938.jpeg' },
  { id: 3, url: 'http://117.247.187.20:8071/IDIP2/pages/project-tools/photo_slider/banner/thump_1683003949.jpeg' },
];

export default function ImageCarousel  (){
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageChange = (index) => {
    setCurrentIndex(index);
  };

  const renderImage = ({ item }) => (
    <Image source={{ uri: item.url }} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={(event) => {
          const { x } = event.nativeEvent.contentOffset;
          const index = Math.round(x / windowWidth);
          handleImageChange(index);
        }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderImage}
      />
      <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === currentIndex && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:10,
    marginTop:10
  },
  image: {
    width: windowWidth,
    height: 200,
    resizeMode: 'cover',

  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 16,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'gray',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: 'white',
  },
});

