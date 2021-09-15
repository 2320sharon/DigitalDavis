import React from "react";
import { useState,useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolate,
  useAnimatedGestureHandler,
} from "react-native-reanimated";

const BUTTON_WIDTH = 350;
const BUTTON_HEIGHT = 100;
const BUTTON_PADDING = 10;
const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING;

const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING;
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;

const SwipeButton = ({ onToggle }) => {
  const X = useSharedValue(0);
    // Toggled State
  const [toggled, setToggled] = useState(false);
  const buttonText=useRef("Active");

  // //thie useEffect function is called whenever the state of toggled is modified
  // useEffect(() => {
  //   if(toggled){
  //     buttonText.current = 'Recent'
  //   }
  //   else{
  //     buttonText.current = 'Active'
  //   }
  // }, [toggled])

  const AnimatedGestureHandler = useAnimatedGestureHandler({
    onActive: (e) => {
      X.value = e.translationX;
      //updates the current X variable with the amount the user moved the button
    },

    onEnd: (e) => {
      if (X.value < BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2) {
        X.value = withSpring(0); // if  X (the button) is moved < halfway across the screen snap back to origin
      } else {
        X.value = withSpring(H_SWIPE_RANGE);
      }
    },
  });

  const InterpolateXInput = [0, H_SWIPE_RANGE];
  //The value to transition x from starting position to Horizontal Swipe Range
  const AnimatedStyles = {
    swipeable: useAnimatedStyle(() => {
      return {
        transform: [{ translateX: X.value }],
      };
    }),
    swipeText: useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          X.value,
          InterpolateXInput,
          [0.7, 0],
          Extrapolate.CLAMP
        ),
        transform: [
          {
            translateX: interpolate(
              X.value,
              InterpolateXInput,
              [0, BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS],
              Extrapolate.CLAMP
            ),
          },
        ],
      };
    }),
  };

  return (
    <View style={styles.swipeCont}>
      <Text style={[styles.swipeText, AnimatedStyles.swipeText]}>
        Current
      </Text>
      <PanGestureHandler onGestureEvent={AnimatedGestureHandler}>
        <Animated.View
          style={[styles.swipeable, AnimatedStyles.swipeable]}
        ></Animated.View>
      </PanGestureHandler>
      <Animated.Text style={[styles.swipeText, AnimatedStyles.swipeText]}>
        Recent
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  swipeCont: {
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
    backgroundColor: "#fff",
    borderRadius: BUTTON_HEIGHT,
    padding: BUTTON_PADDING,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#DDDDDD",
  },
  swipeable: {
    position: "absolute",
    left: BUTTON_PADDING,
    height: SWIPEABLE_DIMENSIONS,
    width: SWIPEABLE_DIMENSIONS, //160
    borderRadius: SWIPEABLE_DIMENSIONS,
    zIndex: 3,
    backgroundColor: "white",
  },
  swipeText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    zIndex: 2,
    color: "#1b9aaa",
  },
});

export default SwipeButton;
