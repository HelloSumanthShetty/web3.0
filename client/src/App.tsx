import {Navbar,Footer,Services,Transactions,Welcome} from "./components"

const App = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="gradient-bg-welcome max-sm:px-5 px-10">
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