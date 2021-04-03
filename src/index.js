import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import './main.scss'



class App extends Component {


    render() {
        return (<button onClick={() => { throw new Error() }}> ErrorS</button >)
    }

}

ReactDOM.render(<App />, document.getElementById('root'))

// "browserslist": [
//     "last 2 chrome versions",
//     "last 2 edge versions",
//     "last 2 ie versions"
//   ],