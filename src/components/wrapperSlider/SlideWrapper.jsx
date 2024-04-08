import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";

// style
import style from "./slider.module.scss";

const SlideWrapper = ({ slideRef, scrollWid, slideBy, deley = 3000 }) => {
  const [index, setIndex] = useState(1);
  const screen = window.innerWidth;

  const handleSlideClick = () => {
    if (scrollWid > screen && screen > index * slideBy) {
      slideRef.current.style.transform = `translateX(-${index * slideBy}px)`;
      setIndex(index + 1);
    }
  };
  useEffect(() => {
    if (index > 1) {
      const resetSlide = setTimeout(() => {
        slideRef.current.style.transform = "translateX(0px)";
        setIndex(1);
      }, deley);

      return () => {
        clearTimeout(resetSlide);
      };
    }
  }, [index]);

  useEffect(() => {
    return () => {
      setIndex(1);
    };
  }, []);

  return (
    <div className={style.relative__arrow} onClick={handleSlideClick}>
      <IoIosArrowForward />
    </div>
  );
};

export default SlideWrapper;
