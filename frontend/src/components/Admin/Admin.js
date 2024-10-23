import { Brands } from "../Brands/Brands"
import { Categories } from "../Categoties/Categories"
import { Colors } from "../Colors/Colors"
import { CreateDeviceForm } from "../CreateDeviceForm/CreateDeviceForm"
import { BrandForm, CategoryForm, ColorForm } from "../Forms"

import css from "./Admin.module.css"

const Admin = () => {
  return (
    <div className={css.container}>
      <div className={css.block}>
        <Categories />
        <Brands />
        <Colors />
      </div>
      <div className={css.block}>
        <div className={css.wrap}>
          <CategoryForm />
          <BrandForm />
          <ColorForm />
        </div>
        <div>
          <CreateDeviceForm />
        </div>
      </div>
    </div>
  )
}

export { Admin }
