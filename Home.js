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
    <View style={{backgroundColor:'#dce3f0'}}>
      {loading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Card
              style={{ margin: 5, backgroundColor: "white", borderRadius: 3 }}
            >
              <Text style={{ fontWeight: "bold", textAlign: 'center' , fontSize: 20}}>{item.title}</Text>
              {/* <Card.Title
                title={item.title}
                style={{margin:10}}
              /> */}
              <View style={{ margin: 10 }}>
                <Card.Cover source={{ uri: item.image }} />
                <Text style={{color:'red'}}>Price : {item.price} $</Text>
                <Text>Description : {item.description}</Text>
              </View>
            </Card>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default Home;
