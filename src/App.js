import { Provider } from 'react-redux';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Error from './components/Error';
import CreateQuestion from './components/CreateQuestion';
import store from './store/store';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Provider store={store}>
      <div className="App container-fluid">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/createQuestion' element={<CreateQuestion />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<Error />} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
