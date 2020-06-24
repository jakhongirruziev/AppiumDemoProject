// import React from 'react';
// import { View, Text, Image,TouchableWithoutFeedbackProps, StyleSheet } from 'react-native';
// import  Touchable  from "delever/lib/components/Touchable";
// import { NavigationScreenProp, NavigationState } from 'react-navigation';

// type MarketScreenProps = {
//     onPress?: TouchableWithoutFeedbackProps['onPress'];
//     navigation: NavigationScreenProp<NavigationState>;
//   };

// export const MarketScreen = ({onPress, navigation }: MarketScreenProps) => {
//     return (
//     <Touchable onPress={() => {
//         navigation.navigate('Menu');
//     }}
//     >
//       <View style={styles.item}>
//         <View style={styles.imgCont}>
//           {image ? (<Image source={{ uri: image }} style={styles.image} resizeMode="cover"/>) : (<View style={styles.image}>
//               <Text style={styles.placeholder}>No image</Text>
//             </View>)}
//         </View>
//       </View>
//     </Touchable>
//     );
// };
// var styles = StyleSheet.create({
//     item: {
//         flexDirection: "row",
//         alignItems: "center"
//     },
//     imgCont: {
//         paddingVertical: 10,
//         paddingHorizontal: 15
//     },
//     image: {
//         width: 100,
//         height: 75,
//         backgroundColor: constants_1.Colors.lightGrey,
//         borderRadius: 10,
//         justifyContent: "center"
//     },
//     placeholder: {
//         alignSelf: "center",
//         textAlign: "center",
//         color: "#fff"
//     },
// });
