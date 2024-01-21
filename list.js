import { ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState, useEffect} from "react";
import MyCard from "./card";
export default function List() {
    const[data, setData] = useState([])
    const[searchTerm, setSearchTerm] = useState('')
    const url = 'http://localhost:3000/venues'

    useEffect(() => {getData()}, [])
    console.log(data)

    const getData = async () => {
        try{
            const res = await fetch(url)
            if(!res.ok) throw new Error(`error fetching ${res.status}`)
            setData(await res.json())
        }catch(error){
            console.error(error.message)
        }
    }

    const allData = data && data.filter(venues => venues.name.toLowerCase().includes(searchTerm.toLowerCase()))


    
  return (
    <ScrollView style ={{flex: 1}}>
      <Text style={{ textAlign: 'center', marginVertical: 10, top: 25, bottom: 15, fontSize: 22 }}>Propose a Place</Text>

      <View>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            width: 350,
            borderWidth: 1,
            borderRadius: 15, // Increased border radius for rounded corners
            paddingHorizontal: 10,
            top: 20, 
            left: 15,
            right: 15
          }}
          placeholder="Search"
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
        />
      </View>
      <View>
        {allData && allData.map(venue => <MyCard venue = {venue}/>)}
        
      </View>
    </ScrollView>
  );
}
