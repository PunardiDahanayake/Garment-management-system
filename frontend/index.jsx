import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./components/app";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { routes } from "./route";
import ConfigDB from "./data/customizer/config";
import { classes } from "./data/layouts";

const Root = (props) => {
  const [anim, setAnim] = useState("");
  const animation =
    localStorage.getItem("animation") ||
    ConfigDB.data.router_animation ||
    "fade";
  const abortController = new AbortController();
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();

  useEffect(() => {
    setAnim(animation);
    console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
    console.disableYellowBox = true;
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <Fragment>
      <Provider store={store}>
        <BrowserRouter basename={`/`}>
          <Switch>
            <App>
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/`}
                render={() => {
                  return (
                    <Redirect
                      to={`${process.env.PUBLIC_URL}/production/QC/${layout}`}
                    />
                  );
                }}
              />
              <TransitionGroup>
                {routes.map(({ path, Component }) => (
                  <Route
                    key={path}
                    exact
                    path={`${process.env.PUBLIC_URL}${path}`}
                  >
                    {({ match }) => (
                      <CSSTransition
                        in={match != null}
                        timeout={100}
                        classNames={anim}
                        unmountOnExit
                      >
                        <div>
                          <Component />
                        </div>
                      </CSSTransition>
                    )}
                  </Route>
                ))}
              </TransitionGroup>
            </App>
          </Switch>
        </BrowserRouter>
      </Provider>
    </Fragment>
  );
};
ReactDOM.render(<Root />, document.getElementById("root"));

serviceWorker.unregister();
