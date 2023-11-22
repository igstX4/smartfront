import React, { useEffect, useState } from "react";
import s from "./styles/app.module.scss";
import { Header } from "./components/Header";
import { MenuItem } from "./components/MenuItem";
import { Search } from "./components/Search";
import { Delivery } from "./components/Delivery";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { fetchUserById } from "./redux/reducers/menuitems.reducer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Contacts } from "./pages/Contacts";
import { Layout } from "./layouts/layout";
import { Admin } from "./pages/Admin";
import { fetchMe } from "./redux/reducers/admin.reducer";


function App() {
  const [active, setActive] = useState({name : "Піца", category : "Pizza"});
  const [search, setSearch] = useState('')
  const [onlyFavourite, setOnlyFavourite] = useState(false)
  const dispatch = useAppDispatch()
  const setOnlyFavouriteFunc = () => {
    setOnlyFavourite((state) => !state)
  }
  console.log(active)
  useEffect(() => {
      dispatch(fetchUserById())
      dispatch(fetchMe())
  }, [ ])
  const menu = useAppSelector((state) => state.menu).items.filter(el => el.category == active.category);
  let filteredMenu = menu.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase())
  })
  if (onlyFavourite) {
    const favourites = window.localStorage.getItem('Favourites')
    if (favourites) {
      const favouritesArr = JSON.parse(favourites)
    filteredMenu = filteredMenu.filter((item) => {
      return favouritesArr.includes(item._id)
    })}
  }
  const setActiveFucn = (name : string, category : string) => {
    setActive({name, category})
  }

  const router2 = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout setActive={setActiveFucn}/>
      ),
      children : [
        {
          path: "/",
          element: (
            <div className={s.pageContent}>
                <Search value={search} setValue={setSearch} IsFavourite={onlyFavourite} setFavourite={setOnlyFavouriteFunc}/>
              <div>
                <h1 className={s.title}>{active.name}</h1>
                {filteredMenu ? filteredMenu.length === 0 ? <h1 style={{textAlign: 'center'}}>На жаль нічого не знайдено</h1> : filteredMenu.map((el) => (
                  <MenuItem key={el._id} id={el._id} name={el.name} description={el.description} price={el.price} />
                )) : <h1>Loading...</h1>}
              </div>
              <Delivery />
            </div>
          ),
        },
        {
          path: "contacts",
          element: <Contacts />,
        },
        {
          path: "admin",
          element: <Admin />
        }
      ]
    },

  ]);
  return (
    <div className="App">
      <RouterProvider router={router2} />
    </div>
  );
}

export default App;
