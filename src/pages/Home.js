import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Class from '../components/Class';
import Aos from 'aos';



const Home = () => {
    // API 網址
    const initialURL = "https://data.moenv.gov.tw/api/v2/aqx_p_432?api_key=e8dd42e6-9b8b-43f8-991e-b3dee723a52d&limit=1000&sort=ImportDate%20desc&format=JSON";
    let [data, setData] = useState(null);
    const [county, setCounty] = useState('臺北市');

    // 請求http API 函式
    const search = (url) => {

        setTimeout(async () => {
            let result = await axios.get(initialURL, {
            });
            setData(result);
        }, 2000)
    };

    // 只有首次渲染呼叫 http API 函式
    useEffect(() => {
        search(initialURL);
        Aos.init();  // 初始化僅執行一次
    }, []);

    return (
        <div>
            <Class
                data={data}
                setData={setData}
                search={() => search(initialURL)}
                county={county}
                setCounty={setCounty}
            />
        </div>

    );
};

export default Home;