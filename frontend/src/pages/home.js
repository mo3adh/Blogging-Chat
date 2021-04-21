import CreatePost from "../components/cratePost";
import GetPosts from "../components/getPosts";
import React, { useEffect, useState } from "react";

export const ThemeContext = React.createContext();

const Home = () => {
    return ( 
        <div className="Home">
            <CreatePost />
            <GetPosts />
        </div>
    );
}
 
export default Home;