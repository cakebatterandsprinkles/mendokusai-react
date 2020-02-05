import React from "react";
import Layout from "./components/Layout/Layout";
import UserMainPage from "./containers/UserMainPage/UserMainPage";

function App() {
  return (
    <div className="App">
      <Layout>
        <UserMainPage />
      </Layout>
    </div>
  );
}

export default App;
