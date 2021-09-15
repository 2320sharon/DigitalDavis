import React from "react";
import { useState, useRef } from "react";
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

  // Fires when animation ends
  const handleComplete = (isToggled) => {
    if (isToggled !== toggled) {
      setToggled(isToggled);
      onToggle(isToggled);
    }
  };

  const AnimatedGestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      //when a gesture is started start keeping track of the state of toggled
      context.completed = toggled;
    },

    onActive: (e, context) => {
      X.value = e.translationX;
      //updates the current X variable with the amount the user moved the button
      let newValue;

      if (context.completed) {
        //if the it is in the toggle state:
        //update newValue to the amount you can swipe and the amount that was moved
        newValue = H_SWIPE_RANGE + e.translationX;
      } else {
        //if the button is not in the toggled state
        //newValue is just the amount the button was moved
        newValue = e.translationX;
      }
      //If the newValue is in the Horizontal swipe range then move X (the button) to that place
      if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
        X.value = newValue;
      }
    },

    onEnd: (e) => {
      if (X.value < BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2) {
        X.value = withSpring(0); // if  X (the button) is moved < halfway across the screen snap back to origin
        runOnJS(handleComplete)(false);
      } else {
        X.value = withSpring(H_SWIPE_RANGE);
        runOnJS(handleComplete)(true);
      }
    },
  });

  const InterpolateXInput = [0, H_SWIPE_RANGE];
  //The value to transition x from starting position to Horizontal Swipe Range

  const AnimatedStyles = {
    swipeCont: useAnimatedStyle(() => {
        return {};
      }),
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
    <Animated.View style={[styles.swipeCont, AnimatedStyles.swipeCont]}>
      <Text style={[styles.swipeTextButton]}>Current</Text>
      <PanGestureHandler onGestureEvent={AnimatedGestureHandler}>
        <Animated.View
          style={[styles.swipeable, AnimatedStyles.swipeable]}
        ></Animated.View>
      </PanGestureHandler>
      <Animated.Text style={[styles.swipeTextBack]}>Recent</Animated.Text>
      </Animated.View>
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
    width: SWIPEABLE_DIMENSIONS, //+ 70, //160
    borderRadius: SWIPEABLE_DIMENSIONS,
    zIndex: 3,
    backgroundColor: "white",
  },
  swipeTextButton: {
    alignSelf: "center",
    alignItems: "flex-start",
    right: 60,
    fontSize: 20,
    fontWeight: "bold",
    zIndex: 4,
    color: "black",
  },
  swipeTextBack: {
    alignSelf: "center",
    alignItems: "flex-start",
    left: 60,
    fontSize: 20,
    fontWeight: "bold",
    zIndex: 2,
    color: "grey",
  },
});

export default SwipeButton;
