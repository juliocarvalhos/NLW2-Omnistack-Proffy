import React, { useState} from 'react';
import {View, ScrollView, Text} from 'react-native';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage'
import { Feather } from '@expo/vector-icons'

import api from '../../services/api';

import PageHeader from '../../components/PagerHeader';
import TeacherItem, { Teacher } from '../../components/teacherItem';

import styles from './Styles';

function TeacherList() {
  const[teachers, setTeachers] = useState([])
  const[favorites, setFavorites] = useState<number[]>([])
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  
  const [subject, Setsubject] = useState('');
  const [weekDay, SetWeekDay] = useState('');
  const [time, SetTime] = useState('');

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response)
        const favoritedTeachersID = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id
        })

        setFavorites(favoritedTeachersID)
      }
    })
  }
  
  useFocusEffect(() => {
    loadFavorites()
  })

  function handleToggleFiltersVisible(){
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function handleFiltersSubmit() {
    loadFavorites()

    const response = await api.get('classes', {
      params: {
          subject,
          weekDay,
          time,
      }
  })
  
  setIsFiltersVisible(false)
  setTeachers(response.data)
    
  }

  return(
    <View style={styles.container}>
      <PageHeader 
        title="Proffys disponíveis" 
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible} > 
            <Feather name='filter' size={20} color="#FFF"/>
          </BorderlessButton>
        )}
      > 

       { isFiltersVisible && (
            <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput 
              style={styles.input}
              value={subject}
              onChangeText={text => Setsubject(text)}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput 
                  style={styles.input}
                  value={weekDay}
                  onChangeText={text => SetWeekDay(text)}
                  placeholder="Qual dia da semana?"
                  placeholderTextColor="#c1bccc"
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput 
                  style={styles.input}
                  value={time}
                  onChangeText={text => SetTime(text)}
                  placeholder="Qual o horário?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
            </View>

            <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}> Filtrar </Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

    <ScrollView 
      style={styles.teacherList} 
      contentContainerStyle={{
        paddingHorizontal:16, 
        paddingBottom:16,
      }}
    > 
      {teachers.map((teacher: Teacher) => {
        return  ( 
        <TeacherItem 
          key={teacher.id} 
          teacher={teacher}
          favorited ={favorites.includes(teacher.id)}
        />
        )
      })}
    </ScrollView>

    </View> 
  )
}

export default TeacherList