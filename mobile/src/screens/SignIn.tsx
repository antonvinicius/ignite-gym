import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import BackgroundImage from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

type FormDataSignIn = {
  email: string,
  password: string
}

const signInSchema = yup.object({
  email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
  password: yup.string().required('Informe a senha')
})

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const { control, formState: { errors }, handleSubmit } = useForm<FormDataSignIn>({
    resolver: yupResolver(signInSchema)
  })

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  function handleSignIn(formData: FormDataSignIn) {
    console.log(formData)
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps='always'
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1
      }}
    >

      <VStack flex={1} px={10} pb={16}>

        <Image
          source={BackgroundImage}
          defaultSource={BackgroundImage}
          alt="Pessoas treinando na academia"
          resizeMode='contain'
          position='absolute'
        />

        <Center my={24}>

          <LogoSvg />

          <Text color={'gray.100'} fontSize={'sm'}>
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>

          <Heading
            color={'gray.100'}
            fontSize={'xl'}
            mb={6}
            fontFamily={'heading'}
          >
            Acesse sua conta
          </Heading>

          <Controller
            control={control}
            name={'email'}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='E-mail'
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='password'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Senha'
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button
            onPress={handleSubmit(handleSignIn)}
            title='Acessar'
          />
        </Center>

        <Center mt={24}>

          <Text
            color={'gray.100'}
            fontSize={'sm'}
            mb={3}
            fontFamily={'body'}
          >
            Ainda não tem acesso?
          </Text>

          <Button
            onPress={handleNewAccount}
            title='Criar conta'
            variant={'outline'}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}