import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { StyleSheet, Text, View, Image, Button, Animated, PanResponder } from "react-native";
import Example01 from "./examples/Example01";
import Example02 from "./examples/Example02";
import Example03 from "./examples/Example03";
import Example04 from "./examples/Example04";
import IT_Logo from './assets/IT_Logo.png'

export default function App() {
  return <Homework />
}

function Homework() {
  const pan = useRef(new Animated.ValueXY()).current
  const scale = useRef(new Animated.Value(1)).current
  const spin = useRef(new Animated.Value(0)).current

  const rotate = spin.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-360deg', '0deg', '360deg'],
  })

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt, gestureState) => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value,
      })
      pan.setValue({ x: 0, y: 0 })
    },
    onPanResponderMove: (evt, gestureState ) => {
      const touches = evt.nativeEvent.touches
      if (touches.length >= 2) {
        const coodsA = {
          x: touches[0].locationX,
          y: touches[0].locationY,
        }
        const coodsB = {
          x: touches[1].locationX,
          y: touches[1].locationY,
        }
        // const rotation = calculateRotationAngle(coodsA, coodsB)
        const distance = calculateDistance(coodsA, coodsB)
        Animated.timing(scale, {
          duration: 5,
          toValue: distance / 100,
          useNativeDriver: false,
        }).start()
        // spin.setValue(rotation / 360)
        // console.log(
        //   'distance:', distance.toFixed(4),
        //   'rotation:', rotation.toFixed(4)
        // )
      }
      pan.setValue({
        x: gestureState.dx,
        y: gestureState.dy,
      })
    },
    onPanResponderRelease: () => {
      pan.flattenOffset()
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: false,
      }).start()
      // Animated.spring(spin, {
      //   toValue: 0,
      //   friction: 10,
      //   useNativeDriver: false,
      // }).start()
    },
  })

  return (
    <View style={styles.container}>
      <Animated.Image
        {...panResponder.panHandlers}
        source={IT_Logo}
        style={[
          pan.getLayout(),
          styles.image,
          { transform: [{ scale }, { rotate }] },
        ]}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 50,
          zIndex: -9999
        }}
      >
        <Button title="Reset" onPress={() => pan.setValue({ x: 0, y: 0 })} />
      </View>
    </View>
  )
}

/**
 * Pythagorean theorem
 * 
 * @param {{x: number, y: number}} p1 
 * @param {{x: number, y: number}} p2 
 * @returns Distance betwen two points
 */
function calculateDistance(p1, p2) {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  return distance
}

/**
 * Find rotation
 * 
 * @param {{x: number, y: number}} p1 
 * @param {{x: number, y: number}} p2 
 * @returns Rotation angle betwen two points
 */
function calculateRotationAngle(p1, p2) {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y

  let angle = Math.atan2(dy, dx);
  angle = (angle * 180) / Math.PI;

  if (angle < 0) {
    angle += 360;
  }

  return angle;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    objectFit: 'contain',
    width: 100,
    height: 100,
  },
})
