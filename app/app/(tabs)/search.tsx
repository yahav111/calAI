// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   TextInput,
//   Button,
//   ActivityIndicator,
// } from "react-native";
// import FoodListItem from "@/components/search/FoodListItem";
// import { useState } from "react";
// // import { gql, useLazyQuery } from "@apollo/client";
// import { Ionicons } from "@expo/vector-icons";
// import { Camera } from "expo-camera";
// import "../../global.css";
// // const query = gql`
// //   query search($ingr: String, $upc: String) {
// //     search(ingr: $ingr, upc: $upc) {
// //       text
// //       hints {
// //         food {
// //           label
// //           brand
// //           foodId
// //           nutrients {
// //             ENERC_KCAL
// //           }
// //         }
// //       }
// //     }
// //   }
// // `;

// export default function SearchScreen() {
//   const [search, setSearch] = useState("");
//   const [scannerEnabled, setScannerEnabled] = useState(false);

//   //   const [runSearch, { data, loading, error }] = useLazyQuery(query);

//   const [permission, requestPermission] = Camera.useCameraPermissions();
//   const runSearch = () => {
//     // runSearch({ variables: { ingr: search } });
//     // setSearch('');
//   };
//   // Request only if permission is not granted, and we can ask again
//   requestPermission();

//   const performSearch = () => {
//     // runSearch({ variables: { ingr: search } });
//     // setSearch('');
//   };

//   // if (loading) {
//   //   return <ActivityIndicator />;
//   // }

//   //   if (error) {
//   //     return <Text>Failed to search</Text>;
//   //   }

//   if (scannerEnabled && permission?.granted) {
//     return (
//       <View style={{ backgroundColor: "#141414" }}>
//         <Camera />
//         <Ionicons
//           onPress={() => setScannerEnabled(false)}
//           name="close"
//           size={30}
//           color="dimgray"
//           style={{ position: "absolute", right: 10, top: 10 }}
//         />
//       </View>
//     );
//   }

//   const items = data?.search?.hints || [];

//   return (
//     <View style={styles.container}>
//       <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
//         <TextInput
//           value={search}
//           onChangeText={setSearch}
//           placeholder="Search..."
//           style={styles.input}
//         />
//         <Ionicons
//           onPress={() => setScannerEnabled(true)}
//           name="barcode-outline"
//           size={32}
//           color="dimgray"
//         />
//       </View>
//       {search && <Button title="Search" onPress={performSearch} />}

//       {/* {loading && <ActivityIndicator />} */}
//       <FlatList
//         data={items}
//         renderItem={({ item }) => <FoodListItem item={item} />}
//         ListEmptyComponent={() => <Text>Search a food</Text>}
//         contentContainerStyle={{ gap: 5 }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#141414",
//     padding: 10,
//     gap: 10,
//     color: "white",
//   },
//   input: {
//     backgroundColor: "#1f1f1f",
//     padding: 10,
//     borderRadius: 20,
//     flex: 1,
//     color: "white",
//   },
// });
