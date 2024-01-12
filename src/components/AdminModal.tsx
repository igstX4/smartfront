import {savedDataI} from "../pages/Admin";
import { FC } from "react";
import s from '../styles/AdminModal.module.scss'
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchUserById, MenuItemI } from "../redux/reducers/menuitems.reducer";
import { MenuAdminItem } from "./MenuAdminItem";
import { AdminModalItem } from "./AdminModalItem";
import { $api } from "../http/axios";

interface AdminModalI {
  savedArray: savedDataI[],
  isActive: boolean,
  setActive : () => void,
  oldData : MenuItemI[],
  cleanData: () => void
}

export const AdminModal : FC<AdminModalI> = ({savedArray, cleanData, isActive, oldData,setActive}) => {
  const menu = useAppSelector((state) => state.menu.items)
  const dispatch = useAppDispatch()
  const handleSave = () => {
    savedArray.map((item, i) => {
      if (i == savedArray.length-1) {
        dispatch(fetchUserById()) //
        setActive()
      }
      $api.patch(`/menu/${item.id}`, {name: item.name, description: item.descr, price: item.price, category: item.category})
    })
    cleanData()
  }
  if (isActive) {
    return (
      <div className={s.modal} onClick={() => {
        setActive()
      }}>
          <div onClick={(e) =>{
            e.stopPropagation()
          }} className={s.modalcontent}>
            <div className={s.data}>
              <div className={s.before}>
                <h1>Старые данные</h1>
                {oldData.map((item) => <AdminModalItem name={item.name} deskr={item.description} price={item.price} category={item.category} />)}
              </div>
              <div className={s.after}>
                <h1>Новые данные</h1>
                {savedArray.map((item) => <AdminModalItem name={item.name} deskr={item.descr} price={item.price} category={item.category} />)}
              </div>
            </div>
            <button onClick={handleSave} className={s.btn}>Save</button>
          </div>
      </div>
    )
  } else {
    return null
  }
}