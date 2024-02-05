import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetchUser from './hooks/useFetchUser';
import useFetchSubscription from './hooks/useFetchSubscription';
import useFetchUserPlaylists from './hooks/useFetchUserPlaylists';

import { Outlet } from "react-router-dom";
import Header from './components/Header';
import Sidebar from './components/Sidebar';

import { toggleSidebarOpen, updateDeviceSize } from './store/slices/state';
import { screenTypeHandler } from './utils/functions';

function App() {

  const dispatch = useDispatch();
  const screenSize = useSelector(store => store.states.deviceSize);

  useFetchUser();
  useFetchSubscription();
  useFetchUserPlaylists();

  useEffect(() => {
    const screenSize = screenTypeHandler(window.innerWidth);
    dispatch(updateDeviceSize(screenSize));
    if (screenSize === "ph") {
      dispatch(toggleSidebarOpen({ type: "state", state: false }));
    }

    const resize = (() => {
      let timer;
      return (e) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          const screenSize = screenTypeHandler(window.innerWidth);
          dispatch(updateDeviceSize(screenSize));
          if (screenSize === "ph") {
            dispatch(toggleSidebarOpen({ type: "state", state: false }));
          }
        }, 300);
      }
    })();

    window.addEventListener('resize', (e) => resize(e));
    return () => window.removeEventListener('resize', (e) => resize(e));
  }, []);
  return (
    <div className=" min-h-[100vh] w-[100vw] bg-light_bg_00 dark:bg-dark_bg_00">
      <Header />
      {<div className={`flex ${screenSize === "ph" ? "relative" : ""}`}>
        <Sidebar />
        <Outlet />
      </div>}
    </div>
  );
}
export default App;