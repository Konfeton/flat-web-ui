import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import RechartsExample from "../components/RechartsExample";



function Statistics() {


    const [avgPriceByDays, setAvgPriceByDays] = useState({

    })
    const [avgPricePerSquareMeterByDays, setAvgPricePerSquareMeterByDays] = useState({

    })

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/statistics/price")
             .then(response => {
                setAvgPriceByDays(response.data)

            })
            .catch(err => {
                console.log(err)
            })
    }, );

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/statistics/price/m2")
            .then(response => {
                setAvgPricePerSquareMeterByDays(response.data)
            })
            .catch(err => {

            })
    }, );

    const [maxPrice, setMaxPrice] = useState();
    const [minPrice, setMinPrice] = useState();
    const [medianPrice, setMedianPrice] = useState();
    const [mode, setMode] = useState();

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/statistics/price/max")
            .then(response => {
                setMaxPrice(response.data)
            })
            .catch(err => {

            })
        axios.get("http://localhost:8080/api/v1/statistics/price/min")
            .then(response =>{
                setMinPrice(response.data)

            })
        axios.get("http://localhost:8080/api/v1/statistics/price/median")
            .then(response =>{
                setMedianPrice(response.data)

            })
        axios.get("http://localhost:8080/api/v1/statistics/price/mode")
            .then(response =>{
                setMode(response.data)

            })
    }, );



    const transformedPrice = Object.keys(avgPriceByDays).map(date => ({
        date,
        avgPrice: avgPriceByDays[date],
    }));

    const transformedPricePerSquareMeter = Object.keys(avgPricePerSquareMeterByDays).map(date => ({
        date,
        avgPrice: avgPricePerSquareMeterByDays[date],
    }));



    return(
        <div>
            <div className={"container-fluid"}>
                <div className={"row row-cols-2"}>
                    <div>
                        Средняя цена по дням, $
                        <RechartsExample chartData={transformedPrice}/>
                        Средняя цена за квадратный метр, $
                        <RechartsExample chartData={transformedPricePerSquareMeter}/>
                    </div>
                    <div>
                        <p>Самая дорогая квартира: {maxPrice}$</p>
                        <p>Самая дешевая квартира: {minPrice}$</p>
                        <p>Медианная цена: {medianPrice}$</p>
                        <p>Мода: {mode}$</p>
                    </div>
                </div>
            </div>




        </div>
    );
}

export default Statistics;