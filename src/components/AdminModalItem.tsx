import { FC } from "react";
import s from '../styles/AdminItem.module.scss'

interface AdminModalItemI {
  name: string,
  deskr: string,
  price: number,
  category : string,
}
export const AdminModalItem : FC<AdminModalItemI> = ({name, category, deskr, price}) => {
  return (
    <div className={s.adminItem}>
      <h1>{name}</h1>
      <p>{deskr}</p>
      <p>{category}</p>
      <p>{price}</p>
    </div>
  )
}