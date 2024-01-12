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
          <a href='tel:0668982969'><p className={s.yellow}>066 898 2969</p></a>
        </div>
        <div className={s.itemdiv}>
          <div className={s.item}>
            <EmailIcon sx={{ fontSize: "50px" }} />
          </div>
          <p>Наша пошта</p>
          <a href='mailto:pizzasmart0@gmail.com'><p className={s.yellow}>pizzasmart0@gmail.com</p></a>
        </div>
      </div>
      <div className={s.itemdiv}>
        <div className={s.item}>
          <PlaceIcon sx={{ fontSize: "50px" }} />
        </div>
        <p>Наша адреса</p>
        <p className={s.yellow}>Вулиця Кооперативна, 9/3</p>
        <iframe
          className={s.map}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.290236126404!2d36.234015045742645!3d49.9879695438647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4127a15a095ea411%3A0x97f57cbcf365ce8e!2z0J_QuNGG0YbQtdGA0LjRjyBTbWFydA!5e0!3m2!1suk!2sua!4v1705065115293!5m2!1suk!2sua"
          style={{border: 0}} loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  );
};
