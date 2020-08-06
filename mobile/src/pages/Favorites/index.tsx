import React from 'react';
import {View} from 'react-native';
import PageHeader from '../../components/PagerHeader';

import styles from './Styles'

function Favorites() {
  return(
    <View style={styles.container}>
      <PageHeader title="Proffys favoritos" />
    </View> 
  )
}

export default Favorites;