import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import CreateAudio from "../pages/CreateAudio";
import CreateClip from "../pages/CreateClip";
import ModifyAudio from "../pages/ModifyAudio";
import Profile from "../pages/Profile";
import Tag from "../pages/Tag";
import Selectlogin from "../pages/SelectLogin";
import Signup from "../pages/Signup";
import Emaillogin from "../pages/Emaillogin";
import Notfound from "../pages/Notfound";
import Search from "../pages/Search";
import KakkaoRedirect from "../pages/KakkaoRedirect";
import { routers } from "../constants/router";
import NaverRedirect from "../pages/NaverRedirect";
import MyAlarm from "../pages/MyAlarm";
import MyAlbum from "../pages/MyAlbum";
import ModifyClip from "../pages/ModifyClip";
import AllViewAudioClip from "../pages/AllViewAudioClip";
import ClipPlay from "../pages/ClipPlay";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Notfound />} />
        <Route path="/" element={<Home />} />
        <Route path={`/${routers.CREATERADIO}`} element={<CreateAudio />} />
        <Route path={`/${routers.CREATECLIP}`} element={<CreateClip />} />
        <Route path={`/${routers.MODIRADIO}`} element={<ModifyAudio />} />
        <Route path={`/${routers.MODICLIP}`} element={<ModifyClip />} />
        <Route path={`/${routers.SELECTLOGIN}`} element={<Selectlogin />} />
        <Route path={`/${routers.SIGNUP}`} element={<Signup />} />
        <Route path={`/${routers.EMAILLOGIN}`} element={<Emaillogin />} />
        <Route path={`/${routers.PROFILE}`} element={<Profile />} />
        <Route path={`/${routers.CLIPPLAY}`} element={<ClipPlay />} />
        <Route path={`/${routers.SEARCH}`} element={<Search />} />
        <Route path={`/${routers.TAG}`} element={<Tag />} />
        <Route path={`/${routers.KAKAORE}`} element={<KakkaoRedirect />} />
        <Route path={`/${routers.NAVERRE}`} element={<NaverRedirect />} />
        <Route path={`/${routers.MYALARM}`} element={<MyAlarm />} />
        <Route path={`/${routers.MYALBUM}`} element={<MyAlbum />} />
        <Route
          path={`/${routers.ALLVIEWAUDIOCLIP}`}
          element={<AllViewAudioClip />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
