import { useSearchParams } from "react-router-dom"

import css from "./DeviceSorter.module.css"

const DeviceSorter = () => {
  const [query, setQuery] = useSearchParams()

  const handleSelectChange = (e) => {
    e.preventDefault()

    let obj = {}

    if (query.get("name")) {
      obj = {
        ...obj,
        name: query.get("name"),
      }
    }

    if (query.get("price_gte")) {
      obj = {
        ...obj,
        price_gte: query.get("price_gte"),
      }
    }

    if (query.get("price_lte")) {
      obj = {
        ...obj,
        price_lte: query.get("price_lte"),
      }
    }

    if (query.get("category")) {
      obj = {
        ...obj,
        category: query.get("category").toString(),
      }
    }

    if (query.get("color")) {
      obj = {
        ...obj,
        color: query.get("color").toString(),
      }
    }

    if (query.get("brand")) {
      obj = {
        ...obj,
        brand: query.get("brand").toString(),
      }
    }

    if (query.get("limit")) {
      obj = {
        ...obj,
        limit: query.get("limit"),
      }
    }

    if (query.get("page")) {
      obj = {
        ...obj,
        page: query.get("page"),
      }
    }

    if (e.target.value) {
      obj = {
        ...obj,
        sort: e.target.value,
      }
    }

    setQuery(obj)
  }

  return (
    <div className={css.container}>
      <select
        value={query.get("sort") || "Sort by ascending price"}
        className={css.select}
        onChange={handleSelectChange}
      >
        <option value="asd">Sort by ascending price</option>
        <option value="desc">Sort by descending price</option>
      </select>
    </div>
  )
}

export { DeviceSorter }
