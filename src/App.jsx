import React from 'react';
import Form from './components/form/Form';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';

const App = () => {


    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/coverbuildergenerator" element={<Form />} />
          </Routes>
        </BrowserRouter>
      </>
    );
}

export default App