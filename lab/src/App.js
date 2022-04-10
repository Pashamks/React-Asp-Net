import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import BoardComponent from './components/boardComponent'
import HeaderComponent from './components/headerComponent'
import FooterComponent from './components/footerComponent'
import ContentComponent from './components/ContentComponent'


function App() {
    return (
        <div className="App">
          <HeaderComponent/>
          <ContentComponent/>
          <FooterComponent/>
        </div>
    );
}

export default App;

