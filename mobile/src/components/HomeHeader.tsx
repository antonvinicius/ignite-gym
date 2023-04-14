import { TouchableOpacity } from "react-native";
import { Heading, HStack, VStack, Text, Icon } from "native-base";
import { MaterialIcons } from '@expo/vector-icons'

import { api } from "@services/api";

import { useAuth } from "@hooks/useAuth";

import userPhotoDefault from '@assets/userPhotoDefault.png'

import { UserPhoto } from "@components/UserPhoto";

export function HomeHeader() {
  const { user, signOut } = useAuth()

  return (
    <HStack
      bg={'gray.600'}
      pt={16}
      px={8}
      pb={5}
      alignItems={'center'}
    >

      <UserPhoto
        source={user.avatar ? { uri: `${api.defaults.baseURL}avatar/${user.avatar}` } : userPhotoDefault}
        size={16}
        alt={'Foto de perfil do usuário'}
        mr={4}
      />

      <VStack flex={1}>

        <Text
          color={'gray.100'}
          fontSize={'md'}
        >
          Olá,
        </Text>

        <Heading
          color={'gray.100'}
          fontSize={'md'}
          fontFamily={'heading'}
        >
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity
        onPress={signOut}
      >
        <Icon
          as={MaterialIcons}
          name={'logout'}
          color={'gray.200'}
          size={7}
        />
      </TouchableOpacity>
    </HStack>
  )
}