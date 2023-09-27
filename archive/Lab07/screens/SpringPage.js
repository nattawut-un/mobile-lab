import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  Image,
  Animated,
} from 'react-native'
import { useRef } from 'react'

import IT_Logo from '../assets/IT_Logo.png'

export default function SpringPage() {
  const springVal = useRef(new Animated.Value(0.3)).current
  const spring = () => {
    Animated.spring(springVal, {
      toValue: 1,
      friction: 1,
      useNativeDriver: true,
    }).start(() => springVal.setValue(0.3))
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
      </View>
      <View style={{ width: '100%' }}>
        <Button title="Spring" onPress={spring} />
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
