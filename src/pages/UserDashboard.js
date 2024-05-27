import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    const [flats, setFlats] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        fetchLastViewedFlats();
    }, [currentPage]);

    const fetchLastViewedFlats = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/v1/flats/lastViewed', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setFlats(response.data);
        } catch (error) {
            console.error('Error fetching last viewed flats', error);
        }
    };



    return (
        <div>
            <div className="container-fluid mt-3">
                <div className="row row-cols-2">
                    <div className="card-width" style={{ width: '20%' }}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">User Menu</h5>
                                <div className="mb-3">
                                    <Link to="/dashboard" className="d-block mb-2">Последние просмотренные</Link>
                                    <Link to="/liked" className="d-block mb-2">Понравившиеся</Link>
                                    <Link to="/rated" className="d-block">Оценённые</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className="row">
                            {flats.map(flat => (
                                <div key={flat.id} className="col-md-4 mb-4">
                                    <Link to={`/flats/${flat.id}`}>
                                        <div className="card">
                                            <img src={flat.photo} className="card-img-top" alt="Flat" width={300} height={250} />
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
        </div>
    );
};

export default UserDashboard;
