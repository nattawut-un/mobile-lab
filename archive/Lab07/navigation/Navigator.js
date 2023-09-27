import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons, Ionicons, Entypo } from '@expo/vector-icons'

import SpringPage from "../screens/SpringPage";
import SequencePage from "../screens/SequencePage";
import ParallelPage from "../screens/ParallelPage";

const Tab = createBottomTabNavigator()

export default function Navigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Spring"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'orange',
        }}
      >
        <Tab.Screen
          name="Spring"
          component={SpringPage}
          options={{
            tabBarIcon: ({ size, color }) => (
              <SimpleLineIcons name="graph" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Sequence"
          component={SequencePage}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Entypo name="menu" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Parallel"
          component={ParallelPage}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="git-merge" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
