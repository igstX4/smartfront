import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";

import PlaceIcon from "@mui/icons-material/Place";
import s from "../styles/Contacts.module.scss";

export const Contacts = () => {
  return (
    <div className={s.main}>
      <h1 className={s.title}>Контакти</h1>
      <div className={s.items}>

        <div className={s.itemdiv}>
          <div className={s.item}>
            <CallIcon className={s.img} sx={{ fontSize: "50px" }} />
          </div>
          <p>Наш номер телефону</p>
          <p className={s.yellow}>066 898 2969</p>
        </div>
        <div className={s.itemdiv}>
          <div className={s.item}>
            <EmailIcon sx={{ fontSize: "50px" }} />
          </div>
          <p>Наша пошта</p>
          <p className={s.yellow}>pizzasmart0@gmail.com</p>
        </div>
        <div className={s.itemdiv}>
          <div className={s.item}>
            <PlaceIcon sx={{ fontSize: "50px" }} />
          </div>
          <p>Наша адреса</p>
          <p className={s.yellow}>Вулиця Кооперативна, 9/3</p>
        </div>
      </div>

    </div>
  );
};
