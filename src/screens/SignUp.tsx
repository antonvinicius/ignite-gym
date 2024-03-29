import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import BackgroundImage from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

type FormDataProps = {
  name: string,
  email: string,
  password: string,
  password_confirm: string
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  email: yup.string().required('Informe o email').email('E-mail inválido'),
  password: yup.string().required('Informe a senha').min(6, 'A senha precisa ter no mínimo 6 caracteres'),
  password_confirm: yup.string().required('Confirme a senha').oneOf([yup.ref('password')], 'Senhas não conferem')
})

export function SignUp() {
  const navigation = useNavigation()
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  })

  function handleGoBack() {
    navigation.goBack()
  }

  function handleSignUp(formData: FormDataProps) {
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
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name={'name'}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Nome'
                autoCapitalize='words'
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
            name={'password'}
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

          <Controller
            control={control}
            name={'password_confirm'}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Confirme a senha'
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            onPress={handleSubmit(handleSignUp)}
            title='Criar e acessar'
          />
        </Center>

        <Center mt={8}>

          <Button
            onPress={handleGoBack}
            title='Voltar para o login'
            variant={'outline'}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}