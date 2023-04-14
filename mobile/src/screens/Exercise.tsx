import { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { Heading, HStack, Icon, Text, VStack, Image, Box, ScrollView, useToast } from 'native-base'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'

import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { api } from '@services/api'

import { ExerciseDTO } from '@dtos/ExerciseDTO'

import { AppError } from '@utils/AppError'

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionSvg from '@assets/repetitions.svg'

import { Button } from '@components/Button'
import { Loading } from '@components/Loading'

type RouteParamsProps = {
  exerciseId: string
}

export function Exercise() {
  const [isLoading, setIsLoading] = useState(true)
  const [submitingRegister, setSubmitingRegister] = useState(false)
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const route = useRoute()
  const toast = useToast()

  const { exerciseId } = route.params as RouteParamsProps

  function handleGoBack() {
    navigation.goBack()
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true)

      const response = await api.get(`exercises/${exerciseId}`)
      setExercise(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do exercício'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleExerciseHistoryRegister() {
    try {
      setSubmitingRegister(true)

      await api.post('history', { exercise_id: exerciseId })

      toast.show({
        title: 'Parabéns! Exercício registrado no seu histórico.',
        placement: 'top',
        bgColor: 'green.700'
      })

      navigation.navigate('history')
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível registrar o exercício'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setSubmitingRegister(false)
    }
  }

  useEffect(() => {
    fetchExerciseDetails()
  }, [exerciseId])

  return (
    isLoading ? <Loading /> :
      <VStack
        flex={1}
      >

        <VStack
          px={8}
          bg={'gray.600'}
          pt={12}
        >

          <TouchableOpacity
            onPress={handleGoBack}
          >

            <Icon
              as={Feather}
              name={'arrow-left'}
              color={'green.500'}
              size={6}
            />
          </TouchableOpacity>

          <HStack
            mt={4}
            mb={8}
            alignItems={'center'}
            justifyContent={'space-between'}
          >

            <Heading
              color={'gray.100'}
              fontSize={'lg'}
              flexShrink={1}
              fontFamily={'heading'}
            >
              {exercise.name}
            </Heading>

            <HStack
              alignItems={'center'}
            >

              <BodySvg

              />

              <Text
                color={'gray.200'}
                ml={1}
                textTransform={'capitalize'}
              >
                {exercise.group}
              </Text>
            </HStack>
          </HStack>
        </VStack>

        <ScrollView>

          <VStack
            p={8}
          >

            <Box>
              <Image
                w="full"
                h={80}
                source={{ uri: `${api.defaults.baseURL}exercise/demo/${exercise.demo}` }}
                alt={'Nome do exercício'}
                mb={3}
                resizeMode={'cover'}
                rounded={'lg'}
              />
            </Box>

            <Box
              bg={'gray.600'}
              rounded={'md'}
              pb={4}
              px={4}
            >

              <HStack
                alignItems={'center'}
                justifyContent={'space-around'}
                mb={6}
                mt={5}
              >

                <HStack>

                  <SeriesSvg />

                  <Text
                    color={'gray.200'}
                    ml={2}
                  >
                    3 séries
                  </Text>
                </HStack>

                <HStack>

                  <RepetitionSvg />

                  <Text
                    color={'gray.200'}
                    ml={2}
                  >
                    12 repetições
                  </Text>
                </HStack>
              </HStack>

              <Button
                onPress={handleExerciseHistoryRegister}
                title={'Marcar com realizado'}
                isLoading={submitingRegister}
              />
            </Box>
          </VStack>
        </ScrollView>
      </VStack>
  )
}