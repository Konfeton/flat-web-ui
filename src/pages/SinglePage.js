import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";



function SinglePage() {


    const {id} = useParams();
    const [data, setData] = useState({
        "id": "",
        "address": "",
        "user": {
            "name": "",
            "phone": ""
        },
        "numberOfRooms": "",
        "description": "",
        "year": "",
        "floor": "",
        "numberOfFloors": "",
        "photo": "",
        "walling": "",
        "area": {
            "total": "",
            "living": "",
            "kitchen": "0.0"
        },
        "resale": "",
        "price": {
            "amount": "",
            "currency": "",
            "convertedPrice": "",
            "convertedCurrency": ""
        },
        "createdAt": "",
        "lastTimeUp": ""

    })
    console.log(id)
    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/flats/" + id)
            .then(response => {
                setData(response.data)
                console.log(data)
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [id]);







    let typeOfWalling;
    switch (data.walling){
        case 'MONOLITH':
            typeOfWalling = "Монолитный";
            break;
        case 'BLOCK':
            typeOfWalling = "Блочный";
            break;
        case 'PANEL':
            typeOfWalling = "Панельный";
            break;
        case 'BRICK':
            typeOfWalling = "Кирпичный";
            break;
    }




    return (
        <div className="container mt-5">
            <div className="row">
                {/* Big Photo of Flat */}
                <div className="col-md-12 mb-3">
                    <img src={data.photo} style={{width: 1400 + 'px', height: 750 + 'px'}} alt="Flat"
                         className="img-fluid"/>
                </div>

                <div className="container text-center">
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <p>{`${data.price.amount}$`}</p>
                                <p>{`${parseInt(data.price.convertedPrice, 10).toFixed(0)} р.`}</p>
                            </div>
                        </div>
                        <div className="col text-center ">
                            <div className="mb-3">
                                <p>{data.numberOfRooms} - комнатная квартира </p>
                            </div>
                        </div>
                        <div class="col">

                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="col-md-12">
                    {/* Price */}

                    <div className="container ">
                        <div className="row">

                            <div className="col-8">
                                <div className={"row"}>
                                    <div className="col-8 col-sm-6">
                                        <div className="mb-3 ms-5">
                                            <p>{`Этаж: ${data.floor} / ${data.numberOfFloors}`}</p>
                                            <p>{`Площадь общая: ${data.area.total} кв.м`}</p>
                                            <p>{`Площадь жилая: ${data.area.living} кв.м`}</p>
                                            <p>{`Площадь кухни: ${data.area.kitchen} кв.м`}</p>
                                            {/* Add more details as needed */}
                                        </div>
                                    </div>
                                    <div class="col-4 col-sm-6">
                                        {Boolean(data.resale) ? (
                                            <p> Вторичка </p>
                                        ) : (
                                            <p> Новостройка </p>
                                        ) }
                                        <p>{typeOfWalling} дом {data.year} года</p>

                                    </div>

                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <h2>Продавец:</h2>
                                    <p>{`${data.user.name}`}</p>
                                    <p>{`${data.user.phone}`}</p>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </div>

            {/* Description */}
            <div className="row row-cols-2">
                <div className="ms-5 mt-3  col-7">

                    <p>{data.description}</p>
                </div>

                <div className="col-3 ms-5">
                    <p>Размещено <br/> {data.createdAt}</p>
                    <p>Последний раз редактировалось <br/> {data.lastTimeUp}</p>


                </div>
            </div>

            {/* Address */}
            <div className="row">
                <div className="col-md-12 ms-5">
                    <h2>{data.address}</h2>
                </div>
            </div>

        </div>
    );
}

export default SinglePage;