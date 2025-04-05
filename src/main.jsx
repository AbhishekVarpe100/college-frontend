import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './store';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <div  style={{ fontFamily : '"Nunito Sans", sans-serif'}}>
    <App />
    </div>
    </Provider>
  </React.StrictMode>,
)
