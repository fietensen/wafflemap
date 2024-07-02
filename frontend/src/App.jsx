import { Link } from "react-router-dom"

function App() {
  return (
    <div>
      Hello World!
      <br />
      <Link to={'/profile/1'}>Click me to have a look at a profile!</Link>
    </div>
  )
}

export default App