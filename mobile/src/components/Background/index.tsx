import React, { ReactNode } from 'react'
import { ImageBackground } from 'react-native'

import backgroundGalaxy from '../../assets/background-galaxy.png'
import { styles } from './styles'

interface BackgroundProps {
  children: ReactNode
}

export function Background({ children }: BackgroundProps) {
  return (
    <ImageBackground
      source={backgroundGalaxy}
      defaultSource={backgroundGalaxy}
      style={styles.container}
    >
      {children}
    </ImageBackground>
  )
}
