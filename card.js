import React, { useRef } from "react";
import { Animated, Dimensions } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";

const ScreenWidth = Dimensions.get("window").width;

const MyCard = ({ venue }) => {
  // Animation value
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const url = "http://localhost:8000/choices";

  // Handler for press event
  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{ scale: scaleAnim }],
  };

  const handleChoice = async (e) => {
    const data = {
      venue: [e] 
    };
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`error posting ${res.status}`);
    } catch (error) {
      console.error(error.message);
    }
  };
  // function handleChoice(e) {}

  return (
    <Animated.View
      style={[{ width: ScreenWidth - 20, margin: 10, top: 25 }, animatedStyle]}
    >
      <Card onPressIn={onPressIn} onPressOut={onPressOut}>
        <Card.Content>
          <Title>{venue.name}</Title>
          <Paragraph>{venue.category}</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: venue.image }} style={{ margin: 10 }} />
        <Card.Actions>
          <Button
            onPress={() => handleChoice(venue.name)}
            style={{ width: "100%", alignSelf: "center" }}
          >
            Propose
          </Button>
        </Card.Actions>
      </Card>
    </Animated.View>
  );
};

export default MyCard;
