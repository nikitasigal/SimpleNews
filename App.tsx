import React, {useEffect, useState} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BootSplash from 'react-native-bootsplash';

import NewsScreen from './screens/news/NewsScreen';
import OnboardingScreen from './screens/onboarding/OnboardingScreen';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [hasFinishedOnboarding, setHasFinishedOnboarding] = useState(false);

  useEffect(() => {
    BootSplash.hide({fade: true});
  }, []);

  return !hasFinishedOnboarding ? (
    <OnboardingScreen setFinished={setHasFinishedOnboarding} />
  ) : (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="News"
            options={{
              headerLargeTitle: true,
            }}
            component={NewsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
