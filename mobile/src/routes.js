import React from 'react';
import { createAppContainer} from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';

import Login from './pages/Login';
import Book from './pages/Book';
import List from './pages/List';


const Routes = createAnimatedSwitchNavigator(
    {
      Login,
      List,
      Book,
    },
    {
      transition: (
        <Transition.Together>
          <Transition.Out
            type="slide-top"
            durationMs={200}
            interpolation="easeIn"
          />
          <Transition.In type="fade" durationMs={200} />
        </Transition.Together>
      ),
    },
  );

export default createAppContainer(Routes);
