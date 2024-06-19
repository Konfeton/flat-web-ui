import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axiosInstance from "../util/axiosInstance";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

function SinglePage() {

    const token = localStorage.getItem("token");
    const { id } = useParams();
    const [data, setData] = useState({
        price: 0,
        numberOfRooms: 0,
        year: 0,
        floor: 0,
        numberOfFloors: 0,
        area: {
            total: 0,
            living: 0,
            kitchen: 0
        },
        photo: '',
        createdAt: '',
        lastTimeUp: '',
        flatParams: {
            resale: false,
            walling: '',
            timeToMetro: 0,
            timeToMall: 0,
            district: '',
            location: {
                address: '',
                latitude: '',
                longitude: ''
            },
            description: ''
        }
    });
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        axiosInstance.get(`/flats/${id}`)
            .then(response => {
                setData(response.data);
                if (token) {
                    checkIfLiked(response.data.id);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [id, token]);

    const checkIfLiked = async (flatId) => {
        try {
            const response = await axiosInstance.get('/flats/liked');
            const likedFlats = response.data.map(flat => flat.id);
            setIsLiked(likedFlats.includes(flatId));
        } catch (error) {
            console.error('Error fetching liked flats', error);
        }
    };

    const handleLikeClick = async () => {
        if (isLiked) {
            try {
                await axiosInstance.delete('/flats/liked', { data: { flatId: id } });
                setIsLiked(false);
            } catch (error) {
                console.error('Error unliking flat', error);
            }
        } else {
            try {
                await axiosInstance.post('/flats/liked', { flatId: id });
                setIsLiked(true);
            } catch (error) {
                console.error('Error liking flat', error);
            }
        }
    };

    let typeOfWalling;
    switch (data.flatParams.walling) {
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
        default:
            typeOfWalling = "Неизвестно";
    }

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Big Photo of Flat */}
                <div className="col-md-12 mb-3">
                    <img src={data.photo} style={{ width: 1400 + 'px', height: 750 + 'px' }} alt="Flat" className="img-fluid" />
                </div>

                <div className="container text-center">
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <p>{`${data.price}$`}</p>
                            </div>
                        </div>
                        <div className="col text-start ">
                            <div className="mb-3">
                                <p>{data.numberOfRooms} - комнатная квартира </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="col-md-12">
                    <div className="container">
                        <div className="row">
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-8 col-sm-6">
                                        <div className="mb-3 ms-5">
                                            <p>{`Этаж: ${data.floor} / ${data.numberOfFloors}`}</p>
                                            <p>{`Площадь общая: ${data.area.total} кв.м`}</p>
                                            <p>{`Площадь жилая: ${data.area.living} кв.м`}</p>
                                            <p>{`Площадь кухни: ${data.area.kitchen} кв.м`}</p>
                                            <p>{`Время до метро: ${data.flatParams.timeToMetro} мин.`}</p>
                                            <p>{`Время до ТЦ: ${data.flatParams.timeToMall} мин.`}</p>
                                            <p>{`Район: ${data.flatParams.district}`}</p>
                                        </div>
                                    </div>
                                    <div className="col-4 col-sm-6">
                                        {data.flatParams.resale ? (
                                            <p>Вторичка</p>
                                        ) : (
                                            <p>Новостройка</p>
                                        )}
                                        <p>{`${typeOfWalling} дом ${data.year} года`}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    {token && (
                                        <FontAwesomeIcon
                                            icon={isLiked ? filledHeart : regularHeart}
                                            size="2x"
                                            color={isLiked ? 'red' : 'grey'}
                                            onClick={handleLikeClick}
                                        />
                                    )}
                                    <p>Размещено:</p>
                                    <p>{`${data.createdAt}`}</p>
                                    <p>последний раз редактировалось:</p>
                                    <p>{`${data.lastTimeUp}`}</p>
                                </div>
                                {token ? (
                                    <>
                                        <Link to={`/flats/${id}/rate`}>
                                            <button>Оценить квартиру</button>
                                        </Link>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Description */}
                    <div className="row row-cols-2">
                        <div className="ms-5 mt-3 col-7">
                            <p>{data.flatParams.description}</p>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="row">
                        <div className="col-md-12 ms-5">
                            <h2>{data.flatParams.location.address}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SinglePage;
