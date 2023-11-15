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
  const [isSaving, setSaving] = useState<boolean>(false)
  const [isActive, setIsActive] = useState<boolean>(false)
  const [oldData, setOldData] = useState<MenuItemI[]>([])
  const [search, setSearch] = useState('')
  console.log(saved)
  useEffect(() => {
    dispatch(fetchUserById())
  }, [ ])
  // useEffect(() => {
  //   if (saved.length === savedData.length) {
  //     setSaving(false)
  //   }
  // }, [savedData])
  console.log(savedData)
  const setSavedFunc = (id : string) => {
    if (!saved.includes(id)) {
      setSaved((savedArray) => [...savedArray, id])
    }
  }
  const handleActive = () => {
    setIsActive((active) => !active)
  }
  const setSaveHandle = () => {
    setSaving(false)
    setOldData([])
    setSavedData([])
    setSaved([])
  }
  const setSavedDataFunc = (obj : savedDataI) => {
    if (saved.includes(obj.id)) {
      // console.log(savedData ,obj.id)
      const maybeArr = savedData.find((item) => item.id == obj.id)
      // console.log(maybeArr)
      if (maybeArr) {
        console.log(savedData.indexOf(maybeArr))
        savedData.splice(savedData.indexOf(maybeArr), 1, obj)

        // console.log(newArr)
        // setSavedData((data) => [...newArr, obj])
      } else {
        setSavedData((data) => [...data, obj])
        const oldObj = items.find((item) => item._id === obj.id)
        if (oldObj) {
          setOldData((data) => [...data, oldObj])
        }
      }
      setIsActive(true)
    }

  }
  // console.log(savedData)
  const items = useAppSelector((state) => state.menu.items)
  const filteredMenu = items.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase())
  })
  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state.admin)
  // console.log(saved)
  const submit = async () => {
    dispatch(fetchAuth({password: value}))
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
      <AdminModal oldData={oldData} setActive={handleActive} setSave={setSaveHandle} setOnlySave={setSaving} isActive={isActive} savedArray={savedData} />
    <div className={s.mainData}>
      <div className={s.searchDiv}>
        <Search value={search} setValue={setSearch}/>
        <button onClick={() => {
          setSearch('')
          setSaving(true)
        }} className={s.savebtn}>Сохранить</button>
      </div>
      <div className={s.items}>
        {filteredMenu ? filteredMenu.map((el) => (
          <MenuAdminItem isSaving={isSaving} setData={setSavedDataFunc} setSavedId={setSavedFunc} category={el.category}  key={el.name} id={el._id} name={el.name} description={el.description} price={el.price} isFavourite={true} />
        )) : <h1>Loading</h1>}
      </div>

    </div>

    </>

  )

}