import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Inviting from './pages/Inviting';
import Map from './pages/Map';
import Settings from './pages/Settings';

import RoutesManager from './routes/RoutesManager';
import AuthManager from './routes/AuthManager';
import GroupSingle from './components/Group/GroupSingle';
import GroupForm from './components/Group/GroupForm';

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          {/*Auth routes*/}
          <Route path='/auth' element={<AuthManager />} />

          {/*Others routes */}
          <Route path='/' element={<RoutesManager />}>
            <Route path='/' exact element={<Home />} />
            <Route path='/group/create' exact element={<GroupForm />} />
            <Route path='/group/:codeGroup' exact element={<GroupSingle />} />
            {/* <Route
              path='/group/:id/invitation'
              exact
              element={<GroupSingle />}
            /> */}
            <Route path='/map' element={<Map />} />
            <Route path='/inviting' element={<Inviting />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/home' element={<Navigate to='/' />} />
          </Route>
          <Route
            path='*'
            element={
              <div style={{ marginTop: '308px' }}>
                <p>There's nothing here !</p>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
