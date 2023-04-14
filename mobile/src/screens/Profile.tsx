import { useState } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { Center, ScrollView, Text, VStack, Skeleton, Heading, useToast } from 'native-base'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';
import * as yup from 'yup'

import userPhotoDefault from '@assets/userPhotoDefault.png'

import { api } from '@services/api'

import { AppError } from '@utils/AppError'

import { useAuth } from '@hooks/useAuth'

import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

const PHOTO_SIZE = 33

type FormDataProps = {
  name: string
  email: string
  old_password: string
  password: string
  confirm_password: string
}

const profileSchema = yup.object({
  name: yup
    .string()
    .required('Informe o nome.'),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 dígitos.')
    .nullable()
    .transform((value) => !!value ? value : null),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => !!value ? value : null)
    .oneOf([yup.ref('password'), null], 'As senhas não conferem.')
    .when('password', {
      is: (field: any) => field,
      then: (schema) => schema
        .nullable()
        .required('Informe a confirmação da senha.')
        .transform((value) => !!value ? value : null)
    })
})

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  const toast = useToast()
  const { user, updateUserProfile } = useAuth()
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema)
  })

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
      const type = photoSelected.assets[0].type

      if (uri) {
        const photoInfo = await FileSystem.getInfoAsync(uri)

        if (photoInfo.exists && (photoInfo.size / 1024 / 1024) > 5) {
          toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 5 MB.',
            placement: 'top',
            bg: 'red.500'
          })
          return
        }

        const fileExtension = uri.split('.').pop()

        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase(),
          uri,
          type: `${type}/${fileExtension}`
        } as any

        const userPhotoUploadForm = new FormData()
        userPhotoUploadForm.append('avatar', photoFile)

        const avatarResponse = await api.patch('users/avatar', userPhotoUploadForm, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        const userUpdated = user
        userUpdated.avatar = avatarResponse.data.avatar

        updateUserProfile(userUpdated)

        toast.show({
          title: 'Foto atualizada',
          placement: 'top',
          bg: 'green.700'
        })
      }
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível atualizar a foto'

      toast.show({
        title,
        placement: 'top',
        bg: 'red.500'
      })
    } finally {
      setPhotoIsLoading(false)
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true)

      const userUpdated = user
      userUpdated.name = data.name

      await api.put('users', data)

      await updateUserProfile(userUpdated)

      toast.show({
        title: 'Perfil atualizado com sucesso',
        placement: 'top',
        bg: 'green.700'
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível atualizar os dados'

      toast.show({
        title,
        placement: 'top',
        bg: 'red.500'
      })
    } finally {
      setIsUpdating(false)
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
              source={user.avatar ? { 'uri': `${api.defaults.baseURL}avatar/${user.avatar}` } : userPhotoDefault}
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

          <Controller
            control={control}
            name={'name'}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder={'Nome'}
                bg={'gray.600'}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name={'email'}
            render={({ field: { onChange, value } }) => (
              <Input
                isDisabled
                placeholder='E-mail'
                bg={'gray.600'}
                onChangeText={onChange}
                value={value}
              />
            )}
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

          <Controller
            control={control}
            name={'old_password'}
            render={({ field: { onChange, value } }) => (
              <Input
                bg={'gray.600'}
                placeholder={'Senha antiga'}
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name={'password'}
            render={({ field: { onChange, value } }) => (
              <Input
                bg={'gray.600'}
                placeholder={'Nova senha'}
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name={'confirm_password'}
            render={({ field: { onChange, value } }) => (
              <Input
                bg={'gray.600'}
                placeholder={'Confirme a nova senha'}
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button
            onPress={handleSubmit(handleProfileUpdate)}
            title={'Atualizar'}
            mt={4}
            isLoading={isUpdating}
          />
        </Center>

      </ScrollView>
    </VStack>
  )
}