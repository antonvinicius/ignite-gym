import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Center, ScrollView, Text, VStack, Skeleton, Heading } from 'native-base'

import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

const PHOTO_SIZE = 33

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  return (
    <VStack
      flex={1}
    >

      <ScreenHeader
        title={'Perfil'}
      />

      <ScrollView
        keyboardShouldPersistTaps
      >

        <Center
          mt={6}
          px={10}
        >

          {photoIsLoading ?
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              borderRadius={'full'}
              startColor={'gray.400'}
              endColor={'gray.300'}
            />
            :
            <UserPhoto
              source={{ 'uri': 'https://github.com/antonvinicius.png' }}
              alt={'Foto de perfil'}
              size={PHOTO_SIZE}
            />
          }

          <TouchableOpacity>

            <Text
              marginBottom={8}
              marginTop={2}
              fontSize={'md'}
              fontWeight={'bold'}
              color={'green.500'}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input
            placeholder={'Nome'}
            bg={'gray.600'}
          />

          <Input
            isDisabled
            value={'antonvinicius@gmail.com'}
            bg={'gray.600'}
          />
        </Center>

        <VStack
          px={10}
          mt={12}
          mb={9}
        >

          <Heading
            color={'gray.200'}
            fontSize={'md'}
            mb={2}
          >
            Alterar senha
          </Heading>

          <Input
            bg={'gray.600'}
            placeholder={'Senha antiga'}
            secureTextEntry
          />

          <Input
            bg={'gray.600'}
            placeholder={'Nova senha'}
            secureTextEntry
          />

          <Input
            bg={'gray.600'}
            placeholder={'Confirme a nova senha'}
            secureTextEntry
          />

          <Button
            title={'Atualizar'}
            mt={4}
          />
        </VStack>

      </ScrollView>
    </VStack>
  )
}