    import './App.css'
    // import FruitTable from './components/FruitTable';
    import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
    import Update from './components/Update';

    function App() {
        return (
        <Router>
            <Switch>
                <Route path='/update'
                        element={<Update />} />
            </Switch>
        </Router>
        );
    }


    export default App
