import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import axiosInstance from "../util/axiosInstance";

const FlatsPage = () => {
    const [flats, setFlats] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        numberOfRooms: [],
        minSquare: '',
        maxSquare: '',
        resale: '',
        walling: [],
        address: '',
        sortBy: 'createdAt:desc'
    });

    useEffect(() => {
        fetchFlats();
    }, [filters, currentPage]);

    const fetchFlats = async () => {
        try {
            const params = {
                ...filters,
                numberOfRooms: filters.numberOfRooms.join(','),
                walling: filters.walling.join(','),
                page: currentPage,
            };
            if (filters.resale === true) {
                params.resale = 'true';
            } else if (filters.resale === false) {
                params.resale = 'false';
            }
            const response = await axiosInstance.get('/flats', { params });
            setFlats(response.data.flats);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching flats', error);
        }
    };

    const handleSorting = (event) => {
        setFilters({ ...filters, sortBy: event.target.value });
    };

    const handleNumberOfRooms = (room) => {
        setFilters(prevFilters => {
            const newRooms = prevFilters.numberOfRooms.includes(room)
                ? prevFilters.numberOfRooms.filter(r => r !== room)
                : [...prevFilters.numberOfRooms, room];
            return { ...prevFilters, numberOfRooms: newRooms };
        });
    };

    const handleTypeOfWalls = (type) => {
        setFilters(prevFilters => {
            const newWalls = prevFilters.walling.includes(type)
                ? prevFilters.walling.filter(w => w !== type)
                : [...prevFilters.walling, type];
            return { ...prevFilters, walling: newWalls };
        });
    };

    const handleResaleChange = (event) => {
        setFilters({ ...filters, resale: event.target.checked });
    };

    const handleFilters = () => {
        setCurrentPage(0);
        fetchFlats();
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages - 1));
    };

    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="d-flex justify-content-end mb-3">
                            <label htmlFor="sortingSelect" className="me-2">Сортировать по:</label>
                            <select id="sortingSelect" onChange={handleSorting}>
                                <option value="createdAt:desc">Новые</option>
                                <option value="price:asc">Дешевые</option>
                                <option value="price:desc">Дорогие</option>
                                <option value="numberOfViews:desc">Популярные</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt-3">
                <div className="row row-cols-2">
                    <div className="card-width" style={{ width: '20%' }}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Фильтры</h5>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Цена</label>
                                    <div className="row">
                                        <div className="col">
                                            <input type="number" className="form-control" placeholder="От" min="0" onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })} />
                                        </div>
                                        <div className="col">
                                            <input type="number" className="form-control" placeholder="До" max="3000000" onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="numberOfRooms" className="form-label">Количество комнат</label>
                                    <div className="container">
                                        <div className="row row-cols-2">
                                            <div className="col">
                                                <input type="checkbox" className="form-check-input" value="1" onChange={() => handleNumberOfRooms('1')} />
                                                <label className="form-check-label">1</label>
                                            </div>
                                            <div className="col">
                                                <input type="checkbox" className="form-check-input" value="3" onChange={() => handleNumberOfRooms('3')} />
                                                <label className="form-check-label">3</label>
                                            </div>
                                            <div className="col">
                                                <input type="checkbox" className="form-check-input" value="2" onChange={() => handleNumberOfRooms('2')} />
                                                <label className="form-check-label">2</label>
                                            </div>
                                            <div className="col">
                                                <input type="checkbox" className="form-check-input" value="4" onChange={() => handleNumberOfRooms('4')} />
                                                <label className="form-check-label">4</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="square" className="form-label">Площадь</label>
                                    <div className="row">
                                        <div className="col">
                                            <input type="number" className="form-control" placeholder="От" onChange={(e) => setFilters({ ...filters, minSquare: e.target.value })} />
                                        </div>
                                        <div className="col">
                                            <input type="number" className="form-control" placeholder="До" onChange={(e) => setFilters({ ...filters, maxSquare: e.target.value })} />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label>Тип дома</label>
                                    <div className="container">
                                        <div className="row row-cols-2">
                                            <div className="col">
                                                <input type="checkbox" name="typeOfHouse" className="form-check-input"
                                                       onChange={handleResaleChange}/>
                                                <label className="form-check-label">Новостройка</label>
                                            </div>
                                            <div className="col">
                                                <input type="checkbox" name="typeOfHouse" className="form-check-input"
                                                       onChange={handleResaleChange}/>
                                                <label className="form-check-label">Вторичка</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label>Материал стен</label>
                                    <div className="container">
                                        <div className="row row-cols-2">
                                            <div className="col">
                                                <input type="checkbox" className="form-check-input" onChange={() => handleTypeOfWalls('PANEL')} />
                                                <label className="form-check-label">Панель</label>
                                            </div>
                                            <div className="col">
                                                <input type="checkbox" className="form-check-input" onChange={() => handleTypeOfWalls('BRICK')} />
                                                <label className="form-check-label">Кирпич</label>
                                            </div>
                                            <div className="col">
                                                <input type="checkbox" className="form-check-input" onChange={() => handleTypeOfWalls('MONOLITH')} />
                                                <label className="form-check-label">Монолит</label>
                                            </div>
                                            <div className="col">
                                                <input type="checkbox" className="form-check-input" onChange={() => handleTypeOfWalls('BLOCK')} />
                                                <label className="form-check-label">Блок</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Местонахождение</label>
                                    <input type="text" className="form-control" id="address" placeholder="Город, район, улица" onChange={(e) => setFilters({ ...filters, address: e.target.value })} />
                                </div>

                                <div>
                                    <button className="btn btn-primary mb-3" onClick={handleFilters}>Применить</button>
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
                                                <font class="text-muted" size={1}>Просмотры: {flat.numberOfViews}</font>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        <div className="text-center m-3">
                            <button onClick={handlePreviousPage} disabled={currentPage === 0}>Предыдущая страница</button>
                            <button onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>Следующая страница</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlatsPage;
