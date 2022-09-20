import {useEffect, useState} from "react"
import {View, Text, TouchableOpacity, Image, FlatList} from "react-native"
import {SafeAreaView} from "react-native-safe-area-context"
import {useRoute, useNavigation} from "@react-navigation/native"
import {Entypo} from "@expo/vector-icons"

import {api} from "../../services/api"
import {GameParams} from "../../@types/navigation"

import logoImg from "../../assets/logo-nlw-esports.png"
import {styles} from "./styles"
import {THEME} from "../../theme"

import {Background} from "../../components/Background"
import {Heading} from "../../components/Heading"
import {DuoCard, DuoCardProps} from "../../components/DuoCard"
import { DuoMatch } from "../../components/DuoMatch"

export function Game() {
    const [gameAds, setGameAds] = useState<DuoCardProps[]>([])
    const [discordDuoSelected, setDiscordDuoSelected] = useState("")

    const navigation = useNavigation()
    const route = useRoute()
    const game = route.params as GameParams

    useEffect(() => {
        api.get(`/games/${game.id}/ads`).then((response) =>
            setGameAds(response.data)
        )
    }, [game])

    const getUserDiscord = (adId: string) => {
        api.get(`ads/${adId}/discord`).then((response) => {
            setDiscordDuoSelected(response.data.discord)
        })
    }

    const handleGoBack = () => {
        navigation.goBack()
    }

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo
                            name="chevron-thin-left"
                            color={THEME.COLORS.CAPTION_300}
                            size={20}
                        />
                    </TouchableOpacity>
                    <Image source={logoImg} style={styles.logo} />
                    <View style={styles.right} />
                </View>

                <Image
                    source={{ uri: game.bannerUrl }}
                    style={styles.cover}
                    resizeMode="cover"
                />

                <Heading
                    title={game.title}
                    subtitle="Conecte-se e comece a jogar!"
                />

                <FlatList
                    data={gameAds}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <DuoCard
                            data={item}
                            onConnect={() => getUserDiscord(item.id)}
                        />
                    )}
                    horizontal
                    style={styles.containerList}
                    contentContainerStyle={[
                        gameAds.length > 0
                            ? styles.contentList
                            : styles.emptyListContent,
                    ]}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>
                            Ainda não há anúncios publicados nesse jogo...
                        </Text>
                    )}
                />

                <DuoMatch
                    visible={discordDuoSelected.length > 0}
                    discord={discordDuoSelected}
                    onClose={() => setDiscordDuoSelected("")}
                />
            </SafeAreaView>
        </Background>
    )
}
