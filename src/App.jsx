import {Fragment} from 'react'
import {Header, HomePage} from './components'
import {Outlet} from "react-router-dom";
const App = () => {
  return (
    <Fragment>    
       <Header/>
       <Outlet/>
    </Fragment>
  )
}

export default App