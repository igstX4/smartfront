import s from "../styles/MenuAdminItem.module.scss";
import React, { FC, useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { yellow } from "@mui/material/colors";
import '../styles/select.css'
import { savedDataI } from '../pages/Admin'
interface MenuItemI {
  name: string,
  description: string,
  price: number,
  isFavourite: boolean,
  id: string,
  category: string,
  setSave: (obj : savedDataI) => void
}
export const MenuAdminItem : FC<MenuItemI> = ({name, id, setSave, category, description, isFavourite, price}) => {
  const [nameValue, setNameValue] = useState(name)
  const [deskValue, setDeskValue] = useState(description)
  const [priceValue, setPriceValue] = useState(price)
  const [categoryS, setCategoryS] = useState(category)
  const sxStyles = {
    width: 200,
  }
  useEffect(() => {
    if (name !== nameValue || category !== categoryS || description !== deskValue || price !== priceValue) {
      setSave({name: nameValue, id: id, category: categoryS, price: priceValue, descr: deskValue})
    }
  }, [nameValue, deskValue, priceValue, categoryS])
  const handleAll = (func : any) => {
    setSave({name: nameValue, id: id, category: categoryS, price: priceValue, descr: deskValue})
  }
  return <div className={s.menuItemDiv}>
    <input value={nameValue} onChange={(e) => {
      setNameValue(e.target.value)

    }} className={s.name}/>
    <textarea value={deskValue} onChange={(e) => {
      setDeskValue(e.target.value)
    }} className={s.description} />
    <div className={s.infoDiv}>
      <input className={s.price} value={priceValue} onChange={(e) => {+e.target.value ?setPriceValue(+e.target.value) : setPriceValue(0)

      }} />
    </div>
    <FormControl>
      <InputLabel id="demo-simple-select-label">Категорія</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={categoryS}
        label="Категорія"
        sx={sxStyles}
        color={"warning"}
        onChange={(event) => {
          setCategoryS(event.target.value)
        }}
      >
        <MenuItem value={'Menu'}>Меню</MenuItem>
        <MenuItem value={'Pizza'}>Піца</MenuItem>
        <MenuItem value={'Salad'}>Салати</MenuItem>
        <MenuItem value={'First'}>Перші страви</MenuItem>
        <MenuItem value={'Second'}>Другі страви</MenuItem>
        <MenuItem value={'FastFood'}>Фаст фуд</MenuItem>
        <MenuItem value={'Cold'}>Холодні напої</MenuItem>
        <MenuItem value={'Hot'}>Гарячі напої</MenuItem>
        <MenuItem value={'Dessert'}>Десерти</MenuItem>
        <MenuItem value={'Other'}>Інше</MenuItem>
      </Select>
    </FormControl>

  </div>
}
// ["Pizza" , "Salad" ,"First" , "Second" , "FastFood" , "Cold" , "Hot" , "Dessert" , "Other"]