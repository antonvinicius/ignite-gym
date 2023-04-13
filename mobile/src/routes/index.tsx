import { useTheme, Box } from 'native-base'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { AuthRoutes } from '@routes/auth.routes'
import { AppRoutes } from '@routes/app.routes'

import { useAuth } from '@hooks/useAuth'

import { Loading } from '@components/Loading'

export function Routes() {
  const theme = useTheme()

  const { user, isLoadingUserStorageData } = useAuth()

  DefaultTheme
    .colors.background = theme.colors.gray[700]

  const userAuthenticated = !!user.id

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <Box
      flex={1}
      bg={'gray.700'}
    >

      <NavigationContainer>

        {userAuthenticated ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}