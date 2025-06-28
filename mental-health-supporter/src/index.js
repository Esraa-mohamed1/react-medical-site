import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import './index.css';
import './styles/global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import localeEn from './locales/en.json';
import localeAr from './locales/ar.json';
import { Provider } from 'react-redux';
import store from './store';

i18n.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: 'en',                              // default language
  resources: {
    en: {
      translation: localeEn
    },
    ar: {
      translation: localeAr
    }
  }
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
