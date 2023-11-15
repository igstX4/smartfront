import { Header } from "../components/Header";
import { Outlet, useNavigation } from "react-router-dom";
import { FC } from "react";

interface LayoutI {
  setActive(name : string, category: string):void
}

export const Layout : FC<LayoutI> = ({setActive}) => {
  // const navigation = useNavigation()
  return (
      <div>
        <Header setActive={setActive} />
        <Outlet />
      </div>
  )
}