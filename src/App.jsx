import React from "react";
import Layout from "./components/Layout/Layout";
import UserMainPage from "./containers/UserMainPage/UserMainPage";
import LandingMain from "./components/LandingMain/LandingMain";

function App() {
  return (
    <div className="App">
      <Layout>
        <LandingMain />
      </Layout>
    </div>
  );
}

export default App;
