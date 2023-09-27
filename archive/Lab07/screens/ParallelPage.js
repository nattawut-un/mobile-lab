import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  Image,
  Animated,
  Easing,
} from 'react-native'
import { useRef } from 'react'

import IT_Logo from '../assets/IT_Logo.png'

export default function ParallelPage() {
  const springVal = useRef(new Animated.Value(0.3)).current
  const textVal = useRef(new Animated.Value(0)).current
  const spring = Animated.spring(springVal, {
      toValue: 1,
      friction: 1,
      useNativeDriver: true,
    }
  )
  const text = textVal.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -50, 0, 50, 0]
  })
  const textBounce = Animated.timing(textVal, {
    toValue: 1,
    friction: 1,
    duration: 5000,
    easing: Easing.bounce,
    useNativeDriver: true,
  })

  const animate = () => {
    Animated.parallel([spring, textBounce]).start(() => {
      springVal.setValue(0.3)
      textVal.setValue(0)
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Animated.Image
          source={IT_Logo}
          style={{
            height: 200,
            width: 200,
            objectFit: 'contain',
            transform: [{ scale: springVal }],
          }}
        />
        <Animated.Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: 'orange',
            transform: [{ translateX: text }],
          }}
        >
          Welcome to Faculty of IT!!
        </Animated.Text>
      </View>
      <View style={{ width: '100%' }}>
        <Button title="Run Parallel" onPress={animate} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
