import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Aos from 'aos';
import './styles/Class.css';
import 'animate.css';
import 'react-circular-progressbar/dist/styles.css';
import AqiIndex from '../components/AqiIndex';
import AqiSelect from '../components/AqiSelect';
import AqiBody from '../components/AqiBody';
import AqiLoading from '../components/AqiLoading';

const API_URL = "https://data.moenv.gov.tw/api/v2/aqx_p_432?api_key=e8dd42e6-9b8b-43f8-991e-b3dee723a52d&limit=1000&sort=ImportDate%20desc&format=JSON";

const Home = () => {
    const [data, setData] = useState(null); // 裝api資料
    const [county, setCounty] = useState('臺北市'); // 目前縣市選擇
    const [conuntryData, setConuntryData] = useState({}); // 各區域分類資料
    const [display, setDisplay] = useState(""); // loading 顯示處理

    // 得到api函式
    const fetchData = async () => {
        let result;
        try {
            result = await axios.get(API_URL);
        } catch (error) {
            console.error(error);
        }
        setData(result.data);
    };

    // 初次渲染 拿API資料，Aos初始化
    useEffect(() => {
        fetchData();
        Aos.init();
    }, []);

    // 縣市選擇函式
    const selectHandler = (event) => {
        setCounty(event.target.value);
    };


    // 當裝api資料有異動時才執行
    useEffect(() => {
        if (data) {
            const country = []; // 縣市
            const TempData = {}; // 暫存區域詳細資料分類
            const fields = data?.fields; // 裝英翻中資訊

            data.records?.forEach((item) => {
                if (!country.includes(item.county)) {
                    country.push(item.county);
                    TempData[item.county] = [];
                }

                // 將所有資訊英翻中
                Object.keys(item).forEach((key) => {
                    fields.forEach(type => {
                        if (type.id == key) {
                            item = { ...item, [type.info.label]: item[key] };
                            delete item[key];
                        }
                    })
                })

                const newItem = { ...item, ["箭頭正反"]: false }; // 在每個區域都塞布林供詳細資訊展開
                TempData[item["縣市"]].push(newItem);
            });
            setConuntryData(TempData); // 將區域等等資料分清楚賽進
            setDisplay("d-none"); // aqi取完資料 將loading隱藏
            handleSort("AQI低到高"); // 初始化預設排序
        }
    }, [data]);



    // 箭頭看更多資訊函式
    const handleArrowClick = (city, index) => {
        // 將點選箭頭詳細資訊 布林相反
        setConuntryData(prevState => {
            const updatedData = { ...prevState };
            updatedData[city][index]["箭頭正反"] = !updatedData[city][index]["箭頭正反"];
            return updatedData;
        });
    };

    // 資料排序函式
    const handleSort = (type) => {
        setConuntryData(prev => {
            let temp = { ...prev };
            Object.values(temp).forEach((area) => {
                area.sort(function (a, b) {
                    if (type == "AQI低到高") return parseInt(a["空氣品質指標"]) - parseInt(b["空氣品質指標"]);
                    else if (type == "AQI高到低") return parseInt(b["空氣品質指標"]) - parseInt(a["空氣品質指標"]);
                });
            });
            return temp;
        });
    };


    return (
        <div className='Class'>

            {/* Loading圖 */}
            <AqiLoading display={display} />

            <div className="container mt-4">
                {/* Title */}
                <h2><b>各縣市空氣品質AQI</b></h2>

                {/* 指標圖 */}
                <AqiIndex />

                {/* 縣市選擇 / 排序選擇 */}
                <AqiSelect
                    county={county}
                    selectHandler={selectHandler}
                    conuntryData={conuntryData}
                    handleSort={handleSort} />
            </div>

            <div className='container mt-4'>
                {/* AQI各區域資料顯示 */}
                <AqiBody
                    conuntryData={conuntryData}
                    county={county}
                    handleArrowClick={handleArrowClick} />
            </div>
        </div>
    );
};

export default Home;
