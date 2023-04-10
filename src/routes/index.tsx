import { useTheme, Box } from 'native-base'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { AuthRoutes } from '@routes/auth.routes'
import { AppRoutes } from '@routes/app.routes'

export function Routes() {
  const theme = useTheme()

  DefaultTheme
    .colors.background = theme.colors.gray[700]

  const userAuthenticated = false

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