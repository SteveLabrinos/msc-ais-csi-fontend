import { makeStyles } from '@material-ui/core'
import { lazy, Suspense } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import { theme } from './shared/theme';
import Layout from './Layout/Layout';
import LoadingProgress from './UI/LoadingProgress/LoadingProgress';

const Dashboard = lazy(() => import(`./components/Dashboard/Dashboard`));


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
export const localDeployment = true;

function App() {
  const classes = useStyles();

  const routing = (
      <Switch>
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
