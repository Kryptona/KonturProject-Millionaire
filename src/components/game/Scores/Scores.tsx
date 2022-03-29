import styles from "./Scores.scss"
import React from "react";
import scoresList from "../../../resources/scores.json"


export const Scores : React.FC = () => {
    const scores = scoresList.map(x => <li id={x.id}>{x.amount}</li>).reverse()
    return (
        <div className={styles.root}>
            <ul>
                {scores}
            </ul>
        </div>
    )
}
