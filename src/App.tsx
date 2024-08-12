import type { FC } from 'react'
import { Provider } from 'react-redux'
import { RoutesWrapper } from 'libraries/router'
import { BrowserRouter } from 'react-router-dom'

import { store } from 'libraries/redux'
import 'styles/index.global.scss'

const App: FC = () => (
  <BrowserRouter>
    <Provider store={store}>
      <main>
        <RoutesWrapper />
      </main>
    </Provider>
  </BrowserRouter>
)
export default App
