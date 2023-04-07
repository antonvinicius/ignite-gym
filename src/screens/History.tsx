import { useState } from 'react'
import { Center, Heading, Text, VStack, SectionList } from 'native-base'

import { ScreenHeader } from '@components/ScreenHeader'
import { HistoryCard } from '@components/HistoryCard'

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '26.08.2020',
      data: ['Puxada frontal', 'Remada frontal']
    },
    {
      title: '27.08.2020',
      data: ['Rosca cross', 'Rosca martelo']
    }
  ])

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <HistoryCard />
        )}
        renderSectionHeader={({ section }) => (
          <Heading
            color={'gray.100'}
            fontSize={'md'}
            mt={10}
            mb={3}
          >
            {section.title}
          </Heading>
        )}
        ListEmptyComponent={() => (
          <Text
            color={'gray.100'}
            textAlign={'center'}
          >
            Não há exercícios registrados ainda. {'\n'}
            Vamos fazer exercícios hoje?
          </Text>
        )}
        contentContainerStyle={
          exercises.length === 0 && {
            flex: 1,
            justifyContent: 'center'
          }
        }
        showsVerticalScrollIndicator={false}
        px={8}
      />
    </VStack>
  )
}