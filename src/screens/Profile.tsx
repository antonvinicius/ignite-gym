import { useState } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { Center, ScrollView, Text, VStack, Skeleton, Heading, useToast } from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';

import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

const PHOTO_SIZE = 33

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [photo, setUserPhoto] = useState('https://github.com/antonvinicius.png')

  const toast = useToast()

  async function handleUserPhotoSelect() {
    try {
      setPhotoIsLoading(true)

      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) return

      const uri = photoSelected.assets[0].uri

      if (uri) {
        const photoInfo = await FileSystem.getInfoAsync(uri)

        if (photoInfo.exists && (photoInfo.size / 1024 / 1024) > 3) {
          toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 3 MB.',
            placement: 'top',
            bg: 'red.500'
          })
          return
        }

        setUserPhoto(uri)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  return (
    <VStack
      flex={1}
    >

      <ScreenHeader
        title={'Perfil'}
      />

      <ScrollView
        keyboardShouldPersistTaps={'always'}
        _contentContainerStyle={{
          pb: 12
        }}
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
              source={{ 'uri': photo }}
              alt={'Foto de perfil'}
              size={PHOTO_SIZE}
            />
          }

          <TouchableOpacity
            onPress={handleUserPhotoSelect}
          >

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

        <Center
          px={10}
          mt={12}
          mb={9}
        >

          <Heading
            color={'gray.200'}
            fontSize={'md'}
            mb={2}
            alignSelf={'flex-start'}
            fontFamily={'heading'}
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
        </Center>

      </ScrollView>
    </VStack>
  )
}