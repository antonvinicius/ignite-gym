import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base'

import BackgroundImage from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

export function SignUp() {
  return (
    <ScrollView
      keyboardShouldPersistTaps='always'
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1
      }}
    >

      <VStack flex={1} bgColor="gray.700" px={10} pb={16}>

        <Image
          source={BackgroundImage}
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

          <Input
            placeholder='Nome'
            autoCapitalize='words'
          />

          <Input
            placeholder='E-mail'
            keyboardType='email-address'
            autoCapitalize='none'
          />

          <Input
            placeholder='Senha'
            secureTextEntry
          />

          <Button
            title='Acessar'
          />
        </Center>

        <Center mt={24}>

          <Button
            title='Voltar para o login'
            variant={'outline'}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}