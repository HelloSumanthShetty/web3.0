import {Navbar,Footer,Services,Transactions,Welcome} from "./components"

const App = () => {
  return (
    <div className="min-h-screen w-full">
      <div id="home" className="gradient-bg-welcome max-sm:px-5 px-10">
      <Navbar/>
      <Welcome/>
      </div>
      <div id="services">
        <Services/>
      </div>
      <div id="transactions">
        <Transactions/>
      </div>
      <div id="about">
        <Footer/>
      </div>
    </div>

  )
}

export default App