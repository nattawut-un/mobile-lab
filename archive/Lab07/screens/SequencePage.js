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

export default function SequencePage() {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const spinAnim = useRef(new Animated.Value(0)).current
  const fade = fadeAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 1]
  })
  const spin = spinAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '360deg', '0deg']
  })
  const fading = Animated.timing(fadeAnim, {
    toValue: 1, duration: 2500, useNativeDriver: true
  })
  const spinning = Animated.timing(spinAnim, {
    toValue: 1, duration: 2500, useNativeDriver: true
  })

  const animate = () => {
    Animated.sequence([fading, spinning]).start(() => {
      fadeAnim.setValue(0)
      spinAnim.setValue(0)
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
            opacity: fade,
            transform: [{ rotate: spin }]
          }}
        />
      </View>
      <View style={{ width: '100%' }}>
        <Button title="Run Sequence" onPress={animate} />
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
