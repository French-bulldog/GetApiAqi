import React, { useEffect, useState } from 'react';
import './styles/Class.css';
import 'animate.css';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const Class = (props) => {

    // 存選擇的select值回父系
    const selectHandler = (event) => {
        props.setCounty(event.target.value);
    };
    // 過濾縣市Title
    const Country = [];
    let Color = "";

    // 依照縣市分類
    let conuntrydata = {};

    const [Conuntrydata, setConuntrydata] = useState();

    // 在資料不存在時顯示預設內容或錯誤處理
    // 為何前面請求 http 未做完就送props過來?
    // 這邊可以做成function 用useEffect 做偵測，抓完資料才執行
    if (!props.data || !props.data.data || !props.data.data.records) {
        return <div>資料讀取中...</div>;
    }
    else {

        // 裝英翻中資訊
        const fields = props.data.data.fields;

        props.data.data.records?.map((item) => {

            // 處理縣市重複過濾
            var check = false;
            for (var i in Country)
                if (item.county === Country[i]) {
                    check = true;
                }
            if (!check) {
                Country.push(item.county);

                // 依照縣市分類
                conuntrydata = { ...conuntrydata, [item.county]: [] };
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

            item = { ...item, ["箭頭正反"]: false };

            // 依照縣市分類
            conuntrydata[item["縣市"]].push(item);
        })




        const HandlerArrow = (city, index) => {

            // 如果還未將資料創建
            if (Conuntrydata === undefined) {

                // Create a copy of the data to modify
                const updatedData = { ...conuntrydata };

                // Toggle the "箭頭正反" value
                updatedData[city][index]["箭頭正反"] = !updatedData[city][index]["箭頭正反"];

                // Update the state with the modified data
                setConuntrydata(updatedData);
            }
            // 已創建資料
            else {
                setConuntrydata((prevState) => {

                    if (prevState && prevState[city] && prevState[city][index]) {
                        const updatedData = { ...prevState };
                        updatedData[city][index]["箭頭正反"] = !updatedData[city][index]["箭頭正反"];
                        return updatedData;
                    }
                }
                )
            }
        };

        console.log(conuntrydata);

        return (
            <div className='Class'>

                <div className="container mt-4">
                    <h2><b>各縣市空氣品質AQI</b></h2>

                    <div className='level'>
                        <div className='item item1'>
                            <p>AQI 0-50</p>
                            <h4>綠</h4>
                            <p className='cation'>良好</p>
                        </div>
                        <div className='item item2 '>
                            <p>AQI 51-100</p>
                            <h4>黃</h4>
                            <p className='cation'>普通</p>
                        </div>
                        <div className='item item3 '>
                            <p>AQI 101-150</p>
                            <h4>橘</h4>
                            <p className='cation'>對敏感族群不良</p>
                        </div>
                        <div className='item item4 '>
                            <p>AQI 151-200</p>
                            <h4>紅</h4>
                            <p className='cation'>對所有族群不良</p>
                        </div>
                        <div className='item item5 '>
                            <p>AQI 201-300</p>
                            <h4>紫</h4>
                            <p className='cation'>非常不良</p>
                        </div>
                        <div className='item item6 '>
                            <p>AQI 301-500</p>
                            <h4>褐</h4>
                            <p className='cation'>有害</p>
                        </div>
                    </div>


                    <select className="form-select" aria-label="Select example" defaultValue="臺北市" onChange={selectHandler}>
                        {
                            Country.map((item, index) => {
                                return <option key={index} value={item}>{item}</option>
                            })
                        }
                    </select>
                </div>

                {/* g-4 裡面項目上下都margin間隔 */}
                <div className='container mt-4'>
                    <div className='body row' id="accordionExample">
                        {
                            conuntrydata[props.county].map((item, index) => {

                                if (item["空氣品質指標"] > 100) Color = "red";
                                else if (item["空氣品質指標"] >= 51 && item["空氣品質指標"] <= 100) Color = "gold";
                                else Color = "green";

                                return (

                                    <div key={`1_${index}`} data-aos="fade-up"
                                        data-aos-duration="3000" className="main col-sm-6 col-md-4 col-xl-3 mb-3">
                                        <div className="">
                                            <div className="card h-100">
                                                {/* 卡片圖片或標題 */}

                                                <div className='card-img-top'>
                                                    <CircularProgressbarWithChildren
                                                        value={item["空氣品質指標"]}
                                                        styles={buildStyles({
                                                            textColor: Color,
                                                            pathColor: Color,

                                                        })}
                                                    >


                                                        <div className='content'>
                                                            <img
                                                                style={{ width: 100, marginTop: -5 }}
                                                                src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/844721107732967.6408f248b9ff7.gif"
                                                                alt="doge"
                                                            />
                                                            <div style={{ fontSize: 30, marginTop: -5, Color: Color }}>
                                                                <strong >{item["空氣品質指標"]}</strong>
                                                                <br />
                                                                <small>{item["測站名稱"]}</small>
                                                            </div>
                                                        </div>
                                                    </CircularProgressbarWithChildren>


                                                </div>

                                                {/* 卡片內容 */}
                                                <div className={`card-body row accordion-collapse collapse`}
                                                    id={`${item["測站名稱"]}`} data-bs-parent="#accordionExample"
                                                >
                                                    <div className='col-12'>
                                                        {
                                                            Object.entries(item).map((item1, index) => {
                                                                return (<div key={index}>
                                                                    <h6 className="card-title">
                                                                        {
                                                                            (item1[0] != "" || null) ? item1[0] : "BUG"
                                                                        }
                                                                    </h6>
                                                                    <p className="card-value">
                                                                        {
                                                                            (item1[1] != "" || null) ? item1[1] : "尚無資料"
                                                                        }
                                                                    </p>
                                                                </div>)
                                                            })
                                                        }
                                                    </div>

                                                </div>

                                                <div className="card-footer">
                                                    <small className="text-muted">最後更新於&nbsp;{item["資料發布時間"]}</small>

                                                    <div className='card-down' type="button" data-bs-toggle="collapse" data-bs-target={`#${item["測站名稱"]}`} aria-expanded="true" aria-controls="collapseOne"
                                                        onClick={() => HandlerArrow(props.county, index)}
                                                    >

                                                        {
                                                            ((Conuntrydata?.[props.county]?.[index]?.["箭頭正反"])) ? (
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-caret-up" viewBox="0 0 16 16">
                                                                    <path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z" />
                                                                </svg>
                                                            ) : (
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-caret-down" viewBox="0 0 16 16">
                                                                    <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
                                                                </svg>
                                                            )
                                                        }
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Class;
