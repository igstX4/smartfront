import s from "../styles/AdminModal.module.scss";
import { AdminModalItem } from "./AdminModalItem";
import React, { FC, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { $api } from "../http/axios";
import { fetchUserById } from "../redux/reducers/menuitems.reducer";
import { useAppDispatch } from "../redux/hooks";

interface CreateModal {
  setActive: () => void
}
export const CreateModal : FC<CreateModal> = ({setActive}) => {
  const [categoryS, setCategoryS] = useState('Pizza')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [error, setError] = useState('')
  const dispatch = useAppDispatch()
  const createItem = () => {

    if (name.trim() !== '' && price.trim() !== '') {
      $api.post('/menu/add', {name : name, description: description, category : categoryS, price: +price, image: ''}).then(() => {
        dispatch(fetchUserById())
        setActive()
      })
    } else {
      setError('Заполинте все поля!')
    }
  }
  return (
    <div className={s.modal}>
      <h1 onClick={setActive} className={s.cross}>x</h1>
      <div onClick={(e) =>{
        e.stopPropagation()
      }} className={s.modalContentCreate}>
        <h1 className={s.title}>Добавление новой позиции</h1>

        <input value={name} onChange={(e) => setName(e.target.value)} className={s.name} placeholder={'Имя'}/>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={s.textarea} placeholder={'Описание/состав'}/>
        <FormControl style={{marginTop: '20px', zIndex: 999}}>
          <InputLabel id="demo-simple-select-label">Категорія</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={categoryS}
            label="Категорія"
            sx={{ width: 200}}
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
        <input value={price} onChange={(e) => setPrice(e.target.value)} className={s.price} placeholder={'Цена'}/>
        <button onClick={createItem} className={s.button}>Создать</button>
        {error !== '' ? <p>{error}</p> : null}
      </div>
    </div>
  )
}