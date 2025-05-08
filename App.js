import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Image } from 'react-native';
import { Header, ListItem, Text, Avatar, SearchBar, Icon } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';

export default function App() {
  const [search, setSearch] = useState('');
  const [contatos, setContatos] = useState([]);

  const updateSearch = (text) => {
    setSearch(text);
  };

  useEffect(() => {
    axios.get('http://localhost:3000/contatos')
      .then(response => {
        setContatos(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar contatos:', error);
      });
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header
          centerComponent={
            <View style={styles.centrodotopo}>
              <Image
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRulDoK4v3q3unfWFobuG57blop8RyeIfLox8jUun5ZAg5ZRrT_y4hMkaw5hbqacLpx3A&usqp=CAU' }}
                style={styles.logochat}
              />
              <Text style={styles.nomechat}>ChatDaResenha</Text>
            </View>
          }
          rightComponent={{ icon: 'check', color: '#fff', onPress: () => alert('todos foram lidos') }}
          leftComponent={<Avatar rounded source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} size="small" />}
          containerStyle={styles.header}
        />
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Pesquisar contatos"
            onChangeText={updateSearch}
            value={search}
            lightTheme
            round
            containerStyle={styles.searchBar}
          />
        </View>

        <FlatList
          data={contatos}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({ item }) => (
            <ListItem bottomDivider>
              <Avatar
                rounded
                source={{
                  uri: item.avatar || 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
                }}
                size="medium"
              />
              <ListItem.Content>
                <ListItem.Title style={styles.nome}>{item.nome}</ListItem.Title>
                <ListItem.Subtitle style={styles.mensagem}>{item.mensagem || 'Sem mensagem cria'}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )}
        />

        <View style={styles.botoesatalhos}>
          <Icon name='home' type='material' />
          <Icon name='chat' type='material' />
          <Icon name='mail' type='material' />
          <Icon name='person' type='material' />
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centrodotopo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logochat: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  nomechat: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  searchBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  mensagem: {
    color: '#555',
  },
  header: {
    backgroundColor: '#333333',
    borderBottomWidth: 0,
  },
  botoesatalhos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    color: '#333333',
    backgroundColor: '#FFD700'
  }
});