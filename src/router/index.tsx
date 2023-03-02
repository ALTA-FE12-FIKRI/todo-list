import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";

import Home from "../pages/Home";
import Detail from "../pages/Detail";

const App = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos/:id" element={<Detail />} />
        </Routes>
        </BrowserRouter>
    )
}

export default App;