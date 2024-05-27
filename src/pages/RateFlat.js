import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../util/axiosInstance";

const RateFlat = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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

    const [ratings, setRatings] = useState({
        price: 1,
        numberOfRooms: 1,
        year: 1,
        floor: 1,
        numberOfFloors: 1,
        totalArea: 1,
        livingArea: 1,
        kitchenArea: 1,
        walling: 1,
        timeToMetro: 1,
        timeToMall: 1,
        district: 1,
        address: 1
    });

    useEffect(() => {
        fetchFlatDetails();
    }, [id]);

    const fetchFlatDetails = async () => {
        try {
            const response = await axiosInstance.get(`/flats/${id}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching flat details', error);
        }
    };

    const handleRatingChange = (param, value) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [param]: parseInt(value)
        }));
    };

    const handleNestedRatingChange = (category, param, value) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [category]: {
                ...prevRatings[category],
                [param]: parseInt(value)
            }
        }));
    };

    const handleSubmit = async () => {
        const payload = {
            price: ratings.price,
            numberOfRooms: ratings.numberOfRooms,
            year: ratings.year,
            floor: ratings.floor,
            numberOfFloors: ratings.numberOfFloors,
            totalArea: ratings.totalArea,
            livingArea: ratings.livingArea,
            kitchenArea: ratings.kitchenArea,
            walling: ratings.walling,
            timeToMetro: ratings.timeToMetro,
            timeToMall: ratings.timeToMall,
            district: ratings.district,
            address: ratings.address
        };

        try {
            await axiosInstance.post(`/marks/${id}`, payload);
            alert('Rating submitted successfully');
            navigate(`/flats/${id}`);
        } catch (error) {
            console.error('Error submitting ratings', error);
            alert('Failed to submit ratings');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Rate Flat</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Parameter</th>
                    <th>Value</th>
                    <th>Rating</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Price</td>
                    <td>{data.price}</td>
                    <td>
                        <select
                            value={ratings.price}
                            onChange={(e) => handleRatingChange('price', e.target.value)}
                        >
                            {[1, 2, 3, 4, 5].map((val) => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Number of Rooms</td>
                    <td>{data.numberOfRooms}</td>
                    <td>
                        <select
                            value={ratings.numberOfRooms}
                            onChange={(e) => handleRatingChange('numberOfRooms', e.target.value)}
                        >
                            {[1, 2, 3, 4, 5].map((val) => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Year</td>
                    <td>{data.year}</td>
                    <td>
                        <select
                            value={ratings.year}
                            onChange={(e) => handleRatingChange('year', e.target.value)}
                        >
                            {[1, 2, 3, 4, 5].map((val) => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Floor</td>
                    <td>{data.floor}</td>
                    <td>
                        <select
                            value={ratings.floor}
                            onChange={(e) => handleRatingChange('floor', e.target.value)}
                        >
                            {[1, 2, 3, 4, 5].map((val) => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Number of Floors</td>
                    <td>{data.numberOfFloors}</td>
                    <td>
                        <select
                            value={ratings.numberOfFloors}
                            onChange={(e) => handleRatingChange('numberOfFloors', e.target.value)}
                        >
                            {[1, 2, 3, 4, 5].map((val) => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Total Area</td>
                    <td>{data.area.total}</td>
                    <td>
                        <select
                            value={ratings.totalArea}
                            onChange={(e) => handleRatingChange('totalArea', e.target.value)}
                        >
                            {[1, 2, 3, 4, 5].map((val) => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Living Area</td>
                    <td>{data.area.living}</td>
                    <td>
                        <select
                            value={ratings.livingArea}
                            onChange={(e) => handleRatingChange('livingArea', e.target.value)}
                        >
                            {[1, 2, 3, 4, 5].map((val) => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Kitchen Area</td>
                    <td>{data.area.kitchen}</td>
                    <td>
                        <select
                            value={ratings.kitchenArea}
                            onChange={(e) => handleRatingChange('kitchenArea', e.target.value)}
                        >
                            {[1, 2, 3, 4, 5].map((val) => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Walling</td>
                    <td>{data.flatParams.walling}</td>
                    <td>
                        <select
                            value={ratings.walling}
                            onChange={(e) => handleRatingChange('walling', e.target.value)}
                        >
                            {[1, 2, 3, 4, 5].map((val) => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Time to Metro</td>
                    <td>{data.flatParams.timeToMetro}</td>
                    <td>
                        <select
                            value={ratings.timeToMetro}
                            onChange={(e) => handleRatingChange('timeToMetro', e.target.value)}
                        >
                            {[1, 2, 3, 4, 5].map((val) => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Time to Mall</td>
                    <td>{data.flatParams.timeToMall}</td>
                    <td>
                        <select
                            value={ratings.timeToMall}
                            onChange={(e) => handleRatingChange('timeToMall', e.target.value)}
                        >
                            {[1, 2, 3, 4, 5].map((val) => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                    </td>
                </tr>

                <tr>
                    <td>District</td>
                    <td>{data.flatParams.district}</td>
                    <td>
                        <select
                            value={ratings.district}
                            onChange={(e) => handleRatingChange('district', e.target.value)}
                        >
                            {[1, 2, 3, 4, 5].map((val) => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>{data.flatParams.location.address}</td>
                    <td>
                        <select
                            value={ratings.address}
                            onChange={(e) => handleRatingChange('address', e.target.value)}
                        >
                            {[1, 2, 3, 4, 5].map((val) => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                </tbody>
            </table>
            <button className="btn btn-primary" onClick={handleSubmit}>Rate</button>
        </div>
    );
};

export default RateFlat;
