import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Routes/components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/tv" component={Tv} />
        <Route path="/search" component={Search} />
        <Route exact path={["/", "/movie/:movieId"]} component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
