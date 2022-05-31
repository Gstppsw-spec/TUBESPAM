import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import apiCall from "./ApiActionCreator";
import { Card } from "react-native-paper";

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.apiReducer.data);
  const loading = useSelector((state) => state.apiReducer.loading);
  useEffect(() => {
    dispatch(apiCall("https://fakestoreapi.com/products"));
  }, []);

  return (
    <View style={{ backgroundColor: 'white' }}>
      <View style={{ backgroundColor: "black", borderBottomWidth: 1, borderColor:'lightgray' }}>
        <Text style={{ color: 'white', fontWeight: '700', padding: '5%', fontSize:'130%' }}> Products</Text>
      </View>

  

      <ScrollView>

        {loading ? (
          <ActivityIndicator size="large" color="red" />
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Card
                style={{
                  marginLeft: "3.5%",
                  marginTop: "4%",
                  backgroundColor: "white",
                  borderRadius: 8,
                  width: "45%",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4
                }}
              >

                <View style={{ margin: 10 }}>
                  <Card.Cover source={{ uri: item.image }} style={{  }} />
                  <Text style={{ fontWeight: '700', fontSize: '120%', marginTop: '7%' }}>$ {item.price} </Text>
                  <Text style={{ fontWeight: '500', fontSize: '100%' }}>{item.title}</Text>
                </View>

              </Card>
            )}
            ItemSeparatorComponent={() => <ScrollView> </ScrollView>}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Home;
