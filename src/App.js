import { makeStyles } from '@material-ui/core'
import { lazy, Suspense } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

import { theme } from './shared/theme';
// import Layout from './hoc/Layout/Layout';
import LoadingProgress from './UI/LoadingProgress/LoadingProgress';

const Dashboard = lazy(() => import(`./containers/Dashboard/Dashboard`));


/** @author Stavros Labrinos [stalab at linuxmail.org] on 26/5/21.*/

const useStyles = makeStyles(theme => ({
  mainApp: {
    fontSize: 'calc(8px + 2vmin)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  }
}));

//  change to request backend communication locally or from deployed vm
export const localDeployment = false;

function App() {
  const classes = useStyles();

  const routing = (
      <Switch>
        <Route path="/reports" render={ props => <Report {...props} /> } />
        <Route path="/" exact render={ props => <Dashboard {...props} /> } />
        <Redirect to="/" />
      </Switch>
  );

  return (
      <ThemeProvider theme={theme}>
        <div className={classes.mainApp}>
          <Layout>
            <Suspense fallback={ <LoadingProgress /> }>{ routing }</Suspense>
          </Layout>
        </div>
      </ThemeProvider>
  );
}

export default withRouter(App);
