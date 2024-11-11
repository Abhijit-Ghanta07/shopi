import { useSearchParams } from "react-router-dom";
import useMaxPrice from "../../hooks/UseMaxPrice";
import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  FormCheck,
  FormLabel,
  FormSelect,
  Stack,
} from "react-bootstrap";
import FormRange from "react-bootstrap/esm/FormRange";

import style from "./category.module.scss";

function Filltercard({ data, setData }) {
  const { maxprice } = useMaxPrice(data);
  const [searchParam, setSearchParam] = useSearchParams();
  const [range, setRange] = useState(0);
  const FILLTERS = ["Relavance", "Price Low - High", "Price High - Low"];
  function handleChange(e) {
    let value = e.target.value;
    if (!data) {
      return;
    }
    let filt = FILLTERS.findIndex((item) => item == value);
    sortProduct(filt);
  }
  function sortProduct(q) {
    switch (q) {
      case 0:
        setData([...data]);
        setSearchParam({ sort: "relevance" });
        break;
      case 1:
        setData((prev) => prev.sort((a, b) => a.price - b.price));
        setSearchParam({ sort: "low-high" });
        break;
      case 2:
        setData((prev) => prev.sort((a, b) => b.price - a.price));
        setSearchParam({ sort: "high-low" });
        break;
      default:
        setData(data);
    }
  }
  useEffect(() => {
    setData(data);
  }, [data]);
  useEffect(() => {
    if (data && range > 0) {
      setSearchParam({ price: `${range}` });
      setData((prev) => [...prev.filter((item) => item.price > range)]);
    }
  }, [range]);
  return (
    <Card className={style.filter__card}>
      <CardBody className={style.card__wrapper}>
        <CardTitle className={style.hide__sm}>Fillters</CardTitle>
        <CardText className={style.filter__title}>Sort By:</CardText>
        <div className={style.hide__sm}>
          <Stack gap={2} style={{ paddingBlock: "1rem" }}>
            {FILLTERS.map((filter, index) => (
              <FormCheck
                key={index}
                type="radio"
                label={filter}
                id={filter + "default"}
                name="formId"
                value={filter}
                onChange={handleChange}
              />
            ))}
          </Stack>
          <FormLabel>Price Range:{range}</FormLabel>
          <FormRange
            value={range}
            max={maxprice}
            onChange={(e) => {
              setRange(e.target.value);
            }}
          />
        </div>
        <div className={style.hide__lg}>
          <FormSelect onChange={handleChange}>
            {FILLTERS?.map((fillter, index) => {
              return (
                <option key={index} value={fillter}>
                  {fillter}
                </option>
              );
            })}
          </FormSelect>
        </div>
      </CardBody>
    </Card>
  );
}

export default Filltercard;
