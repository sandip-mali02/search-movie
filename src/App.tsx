import React, { ErrorInfo } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { ErrorBoundary } from "react-error-boundary";
import FallbackComponent from "./components/errorBoundry/FallbackComponent";
import SearchMovie from "./components/searchMovie/SearchMovie";

function App() {
  const logError = (error: Error, info: ErrorInfo) => {
    //
  };
  return (
    <div className="App">
      <Provider store={store}>
        <ErrorBoundary FallbackComponent={FallbackComponent} onError={logError}>
          <SearchMovie />
        </ErrorBoundary>
      </Provider>
    </div>
  );
}

export default App;
