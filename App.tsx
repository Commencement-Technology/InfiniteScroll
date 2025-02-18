import React from 'react';
import {useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import InfiniteScroll from './src/screens/InfiniteScroll';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider style={{flex: 1}}>
      <Provider store={store}>
        <InfiniteScroll />
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
