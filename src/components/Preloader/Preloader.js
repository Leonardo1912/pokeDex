import React from "react";
import style from "./Preloader.module.scss"

const Preloader = (props) => {
    return(
        <div>
            <div className={style.loading}>
                LOADING....
            </div>
        </div>
    )
}

export default Preloader;
