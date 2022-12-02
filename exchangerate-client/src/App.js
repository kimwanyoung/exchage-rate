import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Reset } from "styled-reset";
import Main from "./pages/Main";

const client = new ApolloClient({
  uri:"http://localhost:5110",
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Reset />
      <Main />
    </ApolloProvider>
  );
}

export default App;
