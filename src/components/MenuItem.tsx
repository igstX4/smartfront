import { FC, useEffect, useState } from "react";
import s from "../styles/MenuItem.module.scss"
import '../styles/valuebtn.css'

interface MenuItemI {
    name: string,
    description: string,
    price: number,
    id: string
}

export const MenuItem: FC<MenuItemI> = ({name, description, price, id}) => {
    const [isFavourite, setIsFavourite] = useState(false)
    useEffect(() => {
        setFavourite()
    }, [ ])
    const setFavourite = () => {
        const favourites = window.localStorage.getItem('Favourites')
        if (favourites) {
            const favouritesArr = JSON.parse(favourites)
            const item = favouritesArr.find((item : any) => item == id)
            if (item) {
                setIsFavourite(true)
            } else {
                setIsFavourite(false)
            }
        }
    }

    const HandleFavourites = () => {
        const favourites = window.localStorage.getItem('Favourites')
        if (favourites) {
            const favouritesArr = JSON.parse(favourites)
            const item = favouritesArr.find((item : string) => item == id)
            if (item) {
                const newArr = favouritesArr.filter((item : string) => item !== id)
                window.localStorage.setItem('Favourites', JSON.stringify(newArr))
            } else {
                const newArr = [...favouritesArr, id]
                window.localStorage.setItem('Favourites', JSON.stringify(newArr))
            }
        } else {
            const newArr = [id]
            window.localStorage.setItem('Favourites', JSON.stringify(newArr))
        }
        setFavourite()
    }
    return (
        <div className={s.menuItemDiv}>
            <h1 className={s.name}>{name}</h1>
            <p className={s.description}>{description}</p>
            <div className={s.infoDiv}>
                <p className={s.price}>{price}грн</p>
                <div className={s.div}>
                    <div onClick={HandleFavourites} className={isFavourite ? 'active' : ''} id="star">
                        <svg width="42px" height="40px" viewBox="0 0 42 40" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21,34 L10.4346982,39.5545079 C8.47875732,40.5828068 7.19697214,39.6450119 7.56952871,37.4728404 L9.5873218,25.7082039 L1.03981311,17.3764421 C-0.542576313,15.8339937 -0.0467737017,14.3251489 2.13421047,14.0082334 L13.946577,12.2917961 L19.2292279,1.58797623 C20.2071983,-0.393608322 21.7954064,-0.388330682 22.7707721,1.58797623 L28.053423,12.2917961 L39.8657895,14.0082334 C42.0525979,14.3259953 42.5383619,15.8381017 40.9601869,17.3764421 L32.4126782,25.7082039 L34.4304713,37.4728404 C34.8040228,39.6508126 33.5160333,40.5800681 31.5653018,39.5545079 L21,34 Z" ></path>
                        </svg>
                    </div>
                    {/*<button className={s.btn}>Замовити</button>*/}
                </div>
            </div>
        </div>
    )
}