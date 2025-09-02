import {Navbar,Footer,Loader,Services,Transactions,Welcome} from "./components"
type Props = {}

const App = (props: Props) => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
      <Navbar/>
      <Welcome/>
      </div>
      <Services/>
      <Transactions/>
      <Footer/>
    </div>

  )
}

export default App