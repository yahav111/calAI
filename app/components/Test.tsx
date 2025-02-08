import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";

const { width } = Dimensions.get("window");

const ITEM_WIDTH = width * 0.25; // Width of each item
const SPACING = 10; // Spacing between items

const HorizontalPicker = ({ items, selectedIndex = 0, onItemChange }) => {
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const scrollViewRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  // Update the activeIndex when the selectedIndex prop changes
  useEffect(() => {
    if (selectedIndex !== activeIndex) {
      setActiveIndex(selectedIndex);
      scrollToIndex(selectedIndex);
    }
  }, [selectedIndex]);

  const scrollToIndex = (index) => {
    const centerPosition =
      index * (ITEM_WIDTH + SPACING) - (width / 2 - ITEM_WIDTH / 2);
    scrollViewRef.current.scrollTo({ x: centerPosition, animated: true });
  };

  // Handle item click
  const handleItemClick = (index) => {
    setActiveIndex(index);
    onItemChange(index); // Notify parent of the new active index
    scrollToIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + SPACING} // Snap to each item
        decelerationRate="fast" // Smooth snap
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16} // Smooth scrolling
      >
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleItemClick(index)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.item,
                activeIndex === index && styles.activeItem, // Highlight the active item
              ]}
            >
              <Text
                style={[
                  styles.text,
                  activeIndex === index
                    ? styles.activeText
                    : styles.inactiveText,
                ]}
              >
                {item.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  item: {
    width: ITEM_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginRight: SPACING,
    borderRadius: 25, // Rounded corners
  },
  activeItem: {
    color: "white", // White background for the active item
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  activeText: {
    color: "orange", // White text for the selected item
    fontWeight: "bold",
  },
  inactiveText: {
    color: "rgba(255, 255, 255, 0.6)", // Muted color for non-selected items
  },
});

export default HorizontalPicker;
