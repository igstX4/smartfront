import title from '../images/title.png'
import s from '../styles/Header.module.scss'
import logo from '../images/logo.png'
import React, { FC } from "react";
import '../styles/BurgerMenu.css'
import { NavLink, useNavigate } from "react-router-dom";

interface HeaderI {
  setActive(name : string, category: string):void
}
export const Header : FC<HeaderI> = ({setActive}) => {
    // ["Pizza" , "Salad" ,"First" , "Second" , "FastFood" , "Cold" , "Hot" , "Dessert" , "Other"]
    const [value, setValue] = React.useState(false);
    const categories = [{name: 'Піца', category : 'Pizza'}, {name : 'Салати', category: 'Salad'}, {name: 'Меню', category: 'Menu'}, {name : 'Перші страви', category: 'First'}, {name : 'Другі страви', category: 'Second'}, {name : 'Фаст фуд', category: 'FastFood'},{name : 'Гарячі напої', category: 'Hot'}, {name : 'Холодні напої', category: 'Cold'}, {name : 'Десерти', category: 'Dessert'}]
    const navigate = useNavigate()
  return (
    <div className={s.header}>
      <img className={s.title} src={title} alt={""}/>
        <div className="hamburger-menu">
            <input
                id="menu__toggle"
                type="checkbox"
                checked={value}
                onChange={(e) => setValue(e.target.checked)}
            />
            <label className="menu__btn" htmlFor="menu__toggle">
                <span></span>
            </label>
            <ul className="menu__box">
                <img className={s.logo} src={logo} alt={''}/>
                <div id="logo">
                    <h1 className="burger_title">Меню</h1>
                </div>

                { categories.map((el) => <li className={s.menuItemBox} onClick={() => {
                  setActive(el.name, el.category)
                  navigate('/')
                }}>
                    <h1 className="menu__item">
                        {el.name}
                    </h1>
                </li>)}
                <NavLink to={'/contacts'} className={s.menuItemBox}>
                    <h1 className="burger_title contacts">Контакти</h1>
                </NavLink>


            </ul>
        </div>

    </div>
  )
}