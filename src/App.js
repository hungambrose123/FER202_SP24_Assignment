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
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import UserProfile from './components/UserProfile';
import UserQuestionList from './components/UserQuestionList';

function App() {
  return (
    <Provider store={store}>
      <div className="App container-fluid px-0">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/createQuestion' element={<PostForm />} />
            <Route path='/login' element={<Login />} />
            <Route path='/login/:id' element={<Login/>} />
            <Route path='/register' element={<Register />} />
            <Route path='/userProfile' element={<UserProfile />} />
            <Route path='/userQuestionList' element={<UserQuestionList />} />
            <Route path='/postDetail/:id' element={<PostDetail/>} />
            <Route path='*' element={<Error />} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
