import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../util/axiosInstance";

const ImportancePage = () => {
    const [importance, setImportance] = useState({
        price: 0,
        numberOfRooms: 0,
        year: 0,
        floor: 0,
        numberOfFloors: 0,
        totalArea: 0,
        livingArea: 0,
        kitchenArea: 0,
        walling: 0,
        timeToMetro: 0,
        timeToMall: 0,
        timeToClinic: 0,
        timeToKindergarten: 0,
        timeToSchool: 0,
        district: 0,
        address: 0,
    });

    const [flats, setFlats] = useState([]);

    const parameterTranslations = {
        price: 'Цена',
        numberOfRooms: 'Количество комнат',
        year: 'Год',
        floor: 'Этаж',
        numberOfFloors: 'Количество этажей',
        totalArea: 'Общая площадь',
        livingArea: 'Жилая площадь',
        kitchenArea: 'Площадь кухни',
        walling: 'Тип стен',
        timeToMetro: 'Время до метро',
        timeToMall: 'Время до ТЦ',
        timeToClinic: 'Время до поликлиники',
        timeToKindergarten: 'Время до детского сада',
        timeToSchool: 'Время до школы',
        district: 'Район',
        address: 'Адрес',
    };

    const handleImportanceChange = (param, value) => {
        setImportance(prevImportance => ({
            ...prevImportance,
            [param]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const queryParams = new URLSearchParams(importance).toString();
            const response = await axiosInstance.get(`/flats/unique?${queryParams}`);
            setFlats(response.data);
        } catch (error) {
            console.error('Error submitting importance', error);
            alert('Failed to submit importance');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Умный поиск</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Параметр</th>
                    <th>Важность</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(importance).map((param) => (
                    <tr key={param}>
                        <td>{parameterTranslations[param]}</td>
                        <td>
                            <select
                                value={importance[param]}
                                onChange={(e) => handleImportanceChange(param, parseInt(e.target.value))}
                            >
                                {[0, 1, 2, 3, 4].map((val) => (
                                    <option key={val} value={val}>{val}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className="btn btn-primary mb-5" onClick={handleSubmit}>Найти</button>

            <div>
                <h2>Квартиры на основе ваших предпочтений</h2>
                <div className="col-md-9">
                    <div className="row">
                        {flats.map(flat => (
                            <div key={flat.id} className="col-md-4 mb-4">
                                <Link to={`/flats/${flat.id}`}>
                                    <div className="card">
                                        <img src={flat.photo} className="card-img-top" alt="Flat" width={300} height={250}/>
                                        <div className="card-body">
                                            <p>Цена: {flat.price}$</p>
                                            <p>Кол-во комнат: {flat.numberOfRooms}</p>
                                            <p>Год: {flat.year}</p>
                                            <p>Этаж: {flat.floor} / {flat.numberOfFloors}</p>
                                            <p>Площадь: {flat.area.total} / {flat.area.living} / {flat.area.kitchen}</p>
                                            <font className="text-muted" size={1}>Просмотры: {flat.numberOfViews}</font>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImportancePage;
