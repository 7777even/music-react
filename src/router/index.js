import React, { lazy } from "react";
import { Redirect } from "react-router-dom";


/** Discover 页面  */
const Discover = lazy(() => import("@/pages/discover"));

const Player = lazy(() => import("../pages/player"));
const Recommend = lazy(() => import("@/pages/discover/child-pages/recommend"));
const RankList = lazy(() => import("@/pages/discover/child-pages/ranklist"));
const PlayList = lazy(() => import("@/pages/discover/child-pages/playlist"));

/** Discover DjRadio  */
const DjRadio = lazy(() => import("@/pages/discover/child-pages/djradio"));
const Category = lazy(() => import("../pages/discover/child-pages/djradio/child-pages/category"));
const Default = lazy(() => import("../pages/discover/child-pages/djradio/child-pages/default"));

/** Discover Artist  */
const Artist = lazy(() => import("@/pages/discover/child-pages/artist"));

const Recommendation = lazy(() => import("../pages/discover/child-pages/artist/child-pages/recommendation"));
const Settled = lazy(() => import("../pages/discover/child-pages/artist/child-pages/settled"));
const Genre = lazy(() => import("../pages/discover/child-pages/artist/child-pages/genre"));

/** Discover Album  */
const Album = lazy(() => import("@/pages/discover/child-pages/album"));


const Mine = lazy(() => import("@/pages/mine"));
const Friend = lazy(() => import("@/pages/friend"));
const Product = lazy(() => import("@/pages/product"));
const NMusician = lazy(() => import("@/pages/nmusician"));
const Download = lazy(() => import("@/pages/download"));


const routes = [
    {
        path: "/",
        exact: true,
        render: () => (<Redirect to="/discover" />)
    },
    {
        path: "/discover",
        component: Discover,
        children: [
            {
                path: "/discover",
                exact: true,
                render: () => (<Redirect to="/discover/recommend" />)
            },
            {
                path: "/discover/recommend",
                component: Recommend
            },
            {
                path: "/discover/ranklist",
                component: RankList
            },
            {
                path: "/discover/playlist",
                component: PlayList
            },
            {
                path: "/discover/djradio",
                component: DjRadio,
                children: [
                    {
                        path: "/discover/djradio",
                        component: Default,
                        exact: true
                    },
                    {
                        path: "/discover/djradio/category",
                        component: Category
                    }
                ]
            },
            {
                path: "/discover/artist",
                component: Artist,
                children: [
                    {
                        path: "/discover/artist",
                        component: Recommendation,
                        exact: true
                    },
                    {
                        path: "/discover/artist/settled",
                        component: Settled
                    },
                    {
                        path: "/discover/artist/genre",
                        component: Genre,
                    }
                ]
            },
            {
                path: "/discover/album",
                component: Album
            },
            {
                path: "/discover/player",
                component: Player
            }
        ]
    },
    {
        path: "/mine",
        component: Mine
    },
    {
        path: "/friend",
        component: Friend
    },
    {
        path: "/product",
        component: Product
    },
    {
        path: "/nmusician",
        component: NMusician
    },
    {
        path: "/download",
        component: Download
    }
]


export default routes;


// /** Discover  */
// import Discover from "@/pages/discover";

// import Player from "../pages/player";
// import Recommend from "@/pages/discover/child-pages/recommend";
// import RankList from "@/pages/discover/child-pages/ranklist";
// import PlayList from "@/pages/discover/child-pages/playlist";

// /** Discover DjRadio  */
// import DjRadio from "@/pages/discover/child-pages/djradio";

// import Category from "../pages/discover/child-pages/djradio/child-pages/category";
// import Default from "../pages/discover/child-pages/djradio/child-pages/default";

// /** Discover Artist  */
// import Artist from "@/pages/discover/child-pages/artist";
// import Recommendation from "../pages/discover/child-pages/artist/child-pages/recommendation";
// import Settled from "../pages/discover/child-pages/artist/child-pages/settled";
// import Genre from "../pages/discover/child-pages/artist/child-pages/genre";

// /** Discover Album  */
// import Album from "@/pages/discover/child-pages/album";

// import Mine from "@/pages/mine";
// import Friend from "@/pages/friend";
// import Product from "@/pages/product";
// import NMusician from "@/pages/nmusician";
// import Download from "@/pages/download";