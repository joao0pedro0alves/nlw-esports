import {
  ImageBackground,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { styles } from './styles'
import { THEME } from '../../theme'

export interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

interface Props extends TouchableOpacityProps {
  data: Game
}

export function GameCard({ data, ...props }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <ImageBackground
        style={styles.cover}
        source={{
          uri: data.bannerUrl,
        }}
      >
        <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
          <Text style={styles.name}>{data.title}</Text>
          <Text style={styles.ads}>{data._count.ads} anúncios</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  )
}
