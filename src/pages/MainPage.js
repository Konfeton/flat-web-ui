import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'


function MainPage(props) {
    const [dataList, setData] = useState([]);
    const [page, setPage] = useState(1);



    const [minPrice, setMinPrice] = useState('0');
    const [maxPrice, setMaxPrice] = useState('3000000');
    const [numberOfRooms, setNumberOfRooms] = useState('1,2,3,4');
    const [minArea, setMinArea] = useState('0');
    const [maxArea, setMaxArea] = useState('10000');
    const [resale, setResale] = useState(false);
    const [minYear, setMinYear] = useState('0');
    const [maxYear, setMaxYear] = useState('3000');
    const [walling, setWalling] = useState('PANEL,BLOCK,MONOLITH,BRICK');
    const [city, setCity] = useState('Минск');

    const apiUrl = "http://localhost:8080/api/v1/flats?page="+page+"&minPrice="+minPrice+"&maxPrice="+maxPrice+"&numberOfRooms="+numberOfRooms +
        "&minArea="+minArea+"&maxArea="+maxArea+"&resale="+resale+"&minYear="+minYear+"&maxYear="+maxYear+"&walling="+walling+"&city="+city;
    console.log(apiUrl)
    // const apiUrl = 'http://localhost:8080/api/v1/flats?page='+page;
    useEffect(() => {
        axios.get(apiUrl)
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    const handleSorting = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue === 'createdAt:DESC') {
            // Send API request for sorting by new
            axios.get(apiUrl.concat("&order="+selectedValue))
                .then(response => {
                    setData(response.data)
                })
                .catch(error => {

                });
        } else if (selectedValue === 'price:ASC') {
            // Send API request for sorting by price
            let url = apiUrl.concat("&order="+selectedValue);
            console.log(url)
            axios.get(url)
                .then(response => {
                    setData(response.data)
                })
                .catch(error => {

                });
        }else {
            // Send API request for sorting by price
            let url = apiUrl.concat("&order="+selectedValue);
            console.log(url)
            axios.get(url)
                .then(response => {
                    setData(response.data)
                })
                .catch(error => {

                });
        }
        // Add more conditions based on your options
    };

    function handleNextPage() {
        setPage(page + 1)
        axios.get(apiUrl)
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                // Handle errors
            });
    }

    function handlePreviousPage() {
        setPage(page - 1)

        axios.get(apiUrl)
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                // Handle errors
            });
    }



    const [arrayOfRooms, setArrayOfRooms] = useState([]);

//TODO rework (do not working properly)
    const handleNumberOfRooms = (amenity) => {
        // Check if the checkbox is already in the state
        if (arrayOfRooms.includes(amenity)) {
            // If it is, remove it
            setArrayOfRooms(arrayOfRooms.filter((item) => item !== amenity));
        } else {
            // If it's not, add it
            setArrayOfRooms([...arrayOfRooms, amenity]);
        }
        setNumberOfRooms(arrayOfRooms.join(','))
        console.log(arrayOfRooms)

    };



    //TODO rework (do not working properly)

    const [arrayOfWalls, setArrayOfWalls] = useState([]);
    function handleTypeOfWalls(wall) {
        if (arrayOfWalls.includes(wall)) {
            // If it is, remove it
            setArrayOfWalls(arrayOfWalls.filter((item) => item !== wall));
        } else {
            // If it's not, add it
            setArrayOfWalls([...arrayOfWalls, wall]);
        }
        console.log(arrayOfWalls)


        setWalling(arrayOfWalls.join(','))
    }
    function handleFilters() {
        axios.get(apiUrl)
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                // Handle errors
            });
    }
    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="d-flex justify-content-end mb-3 ">
                            <label htmlFor="sortingSelect" className="me-2">Сортировать по:</label>
                            <select className="" id="sortingSelect" onChange={handleSorting}>
                                <option value="createdAt:DESC" >Новые</option>
                                <option value="price:ASC" >Дешевые</option>
                                <option value="price:DESC" >Дорогие</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>




            <div className="container-fluid mt-3">
                <div className="row row-cols-2">
                    {/* Filter Menu (Left) */}
                    <div className="card-width" style={{width: 20 + '%'}} >
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Filter Menu</h5>


                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Цена</label>
                                    <div className="row">
                                        <div class="col">
                                            <input type="number" class="form-control" placeholder="От" onChange={(e) => setMinPrice(e.target.value)}/>
                                        </div>
                                        <div className="col">
                                            <input type="number" className="form-control" placeholder="До" onChange={(e) => setMaxPrice(e.target.value)}/>
                                        </div>
                                    </div>
                                </div>


                                <div className="mb-3">
                                    <label htmlFor="numberOfRooms" className="form-label">Количество комнат</label>
                                    <div className="container">
                                        <div className="row row-cols-2">
                                            <div className="col">
                                                <input type="checkbox" className="form-check-input" value={'1'} onChange={(event) => handleNumberOfRooms('1')} />
                                                <label className="form-check-label">1</label>
                                            </div>
                                            <div class="col">
                                                <input type="checkbox" className="form-check-input" value={'3'} onChange={(event) => handleNumberOfRooms('3')} />
                                                <label className="form-check-label">3</label>
                                            </div>
                                            <div class="col">
                                                <input type="checkbox" className="form-check-input" value={'2'} onChange={(event) => handleNumberOfRooms('2')} />
                                                <label className="form-check-label">2</label>
                                            </div>
                                            <div class="col">
                                                <input type="checkbox" className="form-check-input" value={'4'} onChange={(event) => handleNumberOfRooms('4')} />
                                                <label className="form-check-label">4</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="mb-3">
                                    <label htmlFor="square" className="form-label">Площадь</label>
                                    <div className="row">
                                        <div className="col">
                                            <input type="number" className="form-control" placeholder="От" onChange={(e) => setMinArea(e.target.value)}/>
                                        </div>
                                        <div className="col">
                                            <input type="number" className="form-control" placeholder="До" onChange={(e) => setMaxArea(e.target.value)}/>
                                        </div>
                                    </div>
                                </div>


                                <div className="mb-3">
                                    <label htmlFor="numberOfRooms" className="form-label">Тип дома</label>
                                    <div className="container">
                                        <div className="row row-cols-2">
                                            <div className="col">
                                                <input type="radio" name={"typeOfHouse"} className="" id="typeOfHouse" onChange={(e) =>setResale(true)}/>
                                                <label className="form-check-label" htmlFor="typeOfHouse">Вторичка</label>
                                            </div>
                                            <div className="col">
                                                <input type="radio" name={"typeOfHouse"} className="" id="typeOfHouse" onChange={(e) =>setResale(false)}/>
                                                <label className="form-check-label" htmlFor="typeOfHouse">Новостройка</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="mb-3">
                                    <label htmlFor="numberOfRooms" className="form-label">Материал стен</label>
                                    <div className="container">
                                        <div className="row row-cols-2">
                                            <div className="col">
                                                <input type="checkbox" className="form-check-input" onChange={(e) => handleTypeOfWalls('PANEL')} />
                                                <label className="form-check-label" >Панель</label>
                                            </div>
                                            <div className="col">
                                                <input type="checkbox" className="form-check-input" onChange={(e) => handleTypeOfWalls('BRICK')} />
                                                <label className="form-check-label" >Кирпич</label>
                                            </div>
                                            <div className="col">
                                                <input type="checkbox" className="form-check-input" onChange={(e) => handleTypeOfWalls('MONOLITH')} />
                                                <label className="form-check-label" >Монолит</label>
                                            </div>
                                            <div className="col">
                                                <input type="checkbox" className="form-check-input" onChange={(e) => handleTypeOfWalls('BLOCK')} />
                                                <label className="form-check-label" >Блок</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="numberOfRooms" className="form-label">Местонахождение</label>
                                    <input type="text" className="form-control" id="numberOfRooms" placeholder={"Город, район, улица"} onChange={(e) => setCity(e.target.value)}/>
                                </div>
                                <div className={""}>
                                    <button class="btn btn-primary mb-3" onClick={handleFilters}>Применить</button>
                                </div>


                            </div>
                        </div>
                    </div>

                    {/* Cards with Flats (Right) */}
                    <div className="col-md-9">
                        <div className="row">

                            {dataList.map(item => (
                                <div key={item.id} className="col-md-4 mb-4">
                                    <Link to={"/apartments/" + item.id}>
                                        <div className="card">
                                            <img src={item.photo} className="card-img-top" alt="Flat" width={300} height={250}/>
                                            <div className="card-body">
                                                <p>Цена: {item.price.amount}$</p>
                                                <p>Кол-во комнат: {item.numberOfRooms}</p>
                                                <p>Год: {item.year}</p>
                                                <p>Этаж: {item.floor} / {item.numberOfFloors}</p>
                                                <p>Площадь: {item.area.total} / {item.area.living}/ {item.area.kitchen}</p>
                                                {/* Add more details as needed */}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        {/*pagination*/}
                        <div className={"text-center m-3"}>
                            <button onClick={handlePreviousPage}>Предыдущая страница</button>
                            <button onClick={handleNextPage}>Следующая страница</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default MainPage;