import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    Image,
    StyleSheet,
    TextInput,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import axios from 'axios';
  
  interface Product {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
  }
  const LIMIT = 20;
  
  const App = () => {
    const [data, setData] = useState<Product[]>([]);
    const [loader, setLoader] = useState(false);
    const [filteredData, setFilteredData] = useState<Product[]>([]);
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(0);
    const LIMIT = 10;
  
    useEffect(() => {
      fetchProducts();
    }, []);
  
    const fetchProducts = async () => {
      if (loader) return;
      setLoader(true);
      try {
        const response = await axios.get(
          `https://dummyjson.com/products?limit=${LIMIT}&skip=${0}`,
        );
        const products = response?.data?.products || [];
        setData(products);
        setFilteredData(products);
      } catch (error) {
        console.log('Fetch error:', error);
      } finally {
        setLoader(false);
      }
    };
  
    const renderItem = ({item}: any) => {
      return (
        <View style={styles.card}>
          <Image source={{uri: item.thumbnail}} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      );
    };
  
    const handleSearch = (text: string) => {
      setSearchText(text);
      const filtered = data.filter(
        item =>
          item.title.toLowerCase().includes(text.toLowerCase()) ||
          item.description.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredData(filtered);
    };
  
    return (
      <View style={styles.wrapper}>
        <SafeAreaView />
        {loader ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <>
            <TextInput
              style={styles.textInputStyle}
              value={searchText}
              onChangeText={handleSearch}
              placeholder="Search products..."
              placeholderTextColor={'black'}
            />
            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={item => item?.id?.toString()}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              contentContainerStyle={{paddingBottom: 100}}
              ListFooterComponent={
                loader ? <ActivityIndicator size="small" color="gray" /> : null
              }
            />
          </>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 12,
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      backgroundColor: '#f4f6f8',
      flexDirection: 'row',
      padding: 4,
      borderRadius: 10,
      elevation: 3, // Android shadow
      shadowColor: '#000', // iOS shadow
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 12,
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingRight: 8,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 4,
    },
    description: {
      fontSize: 14,
      color: '#666',
    },
    separator: {
      height: 10,
    },
    textInputStyle: {
      paddingHorizontal: 20,
      height: 40,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: 'grey',
      color: 'black',
    },
  });
  
  export default App;
  