/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import { Image, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import { api } from '../../services/api'

import logoImg from '../../assets/logo-nlw-esports.png'
import { Background } from '../../components/Background'
import { GameCard, Game } from '../../components/GameCard'
import { Heading } from '../../components/Heading'

import { styles } from './styles'

export function Home() {
  const [games, setGames] = useState<Game[]>([])
  const navigation = useNavigation()

  useEffect(() => {
    api.get('/games').then((response) => setGames(response.data))
  }, [])

  const handleOpenGame = ({ id, title, bannerUrl }: Game) => {
    navigation.navigate('game', {
      id,
      title,
      bannerUrl,
    })
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          contentContainerStyle={styles.contentList}
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </SafeAreaView>
    </Background>
  )
}
