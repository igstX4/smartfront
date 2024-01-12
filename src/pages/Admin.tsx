import s from '../styles/Admin.module.scss'
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchAuth } from "../redux/reducers/admin.reducer";
import { $api } from "../http/axios";
import { Search } from "../components/Search";
import { fetchUserById } from "../redux/reducers/menuitems.reducer";
import { MenuItem } from "../components/MenuItem";
import { MenuAdminItem } from "../components/MenuAdminItem";
import { AdminModal } from "../components/AdminModal";
import {MenuItemI} from "../redux/reducers/menuitems.reducer";


export interface savedDataI {
  name : string,
  descr: string,
  category: string,
  price: number,
  id: string
}
export const Admin = () => {
  const [value, setValue] = useState('')
  const [saved, setSaved] = useState<Array<string>>([])
  const [savedData, setSavedData] = useState<savedDataI[]>([])
  const [oldData, setOldData] = useState<MenuItemI[]>([])
  const [search, setSearch] = useState('')
  const [active, setActive] = useState(false)

  console.log(savedData)
  useEffect(() => {
    dispatch(fetchUserById())
  }, [ ])
  const items = useAppSelector((state) => state.menu.items)
  const filterMenu = () => {
    const newItems = items.concat()
    savedData.map(savedItem => {
      newItems.map((newItem, i ) => {
        if (savedItem.id === newItem._id) {
          newItems.splice(i, 1, {name: savedItem.name, price: savedItem.price, category: savedItem.category, description: savedItem.descr, _id: savedItem.id, image: ''})
        }
      })
    })

    const filteredMenu = newItems.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase())
    })
    return filteredMenu
  }
  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state.admin)
  // console.log(saved)
  const submit = async () => {
    dispatch(fetchAuth({password: value}))
  }
  const setNewData = (obj : savedDataI) => {
    console.log(obj, 232323)
    const el = savedData.find((item) => item.id === obj.id)
    const oldEl = oldData.find((item) => item._id === obj.id)

    if (!oldEl) {
      const el1 = items.find((item) => item._id === obj.id)
      if (el1) {
        setOldData([...oldData, el1])
      }
    }
    if (!el) {
      setSavedData((data) => [...data, obj])
    } else {
        const index = savedData.indexOf(el)
        console.log(index, 12341)
        const newArr = savedData.concat()
        newArr.splice(index, 1, obj)
        setSavedData(newArr)
    }
  }
  const cleanData = () => {
    setOldData([])
    setSavedData([])
    setActive(false)
  }
  if (!state.isAuth) {
    return (
      <div className={s.admin}>
        <div className={s.inputdiv}>
          <div>
            <h1 style={{marginTop: 0, marginBottom: '5px', textAlign: 'center'}}>Enter password</h1>
            <input maxLength={24} placeholder={'Password'} value={value} onChange={(e) => setValue(e.target.value)} type={'text'}/>
          </div>
          <button onClick={submit}>Login</button>
        </div>
      </div>
    )
  }

  return (
    <>
      <AdminModal cleanData={cleanData} oldData={oldData} setActive={() => setActive((active) => !active)} isActive={active} savedArray={savedData} />
    <div className={s.mainData}>
      <div className={s.searchDiv}>
        <Search value={search} setValue={setSearch}/>
        {savedData.length === 0 ? null : <button onClick={() => {
          setActive(true)
          setSearch('')
        }} className={s.savebtn}>Сохранить</button>}
      </div>
      <div className={s.items}>
        {filterMenu() ? filterMenu().map((el) => (
          <MenuAdminItem setSave={setNewData} category={el.category}  key={el._id} id={el._id} name={el.name} description={el.description} price={el.price} isFavourite={true} />
        )) : <h1>Loading</h1>}
      </div>

    </div>

    </>

  )

}