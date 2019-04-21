import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getLaunches } from './api';
import { FlatList } from 'react-native-gesture-handler';

export default class App extends React.Component {
  state = {
    launches: []
  };

  async componentDidMount() {
    const launches = await getLaunches();
    this.setState({ launches });
  }

  render() {
    const { launches } = this.state;

    if (launches.length === 0) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={launches}
          renderItem={({ item }) => (
            <Text style={styles.item}>{item.missionName}</Text>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});
