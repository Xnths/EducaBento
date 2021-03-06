import React,{useState} from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../styles/global'
import themes from '../styles/themes'
import NProgress from 'nprogress'
import Router from 'next/router'

Router.events.on('routeChangeStart', (url) => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {

  const [theme, setTheme] = useState(themes.light)

  const ToggleTheme = () =>{
    setTheme(theme.title === '0' ? themes.dark : themes.light)
  }

  return (

     <ThemeProvider theme={theme}>
         <Component {...pageProps} />
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default MyApp
