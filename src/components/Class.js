import React, { useState } from 'react';
import './styles/Class.css';
import 'animate.css';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const Class = (props) => {


    const [cardbodyshow, setCardBodyShow] = useState("d-none");

    // 存選擇的select值回父系
    const selectHandler = (event) => {
        props.setCounty(event.target.value);
    };
    // 過濾縣市Title
    const Country = [];
    let Color = "";

    // 依照縣市分類
    let conuntrydata = {};

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

            // 依照縣市分類
            conuntrydata[item["縣市"]].push(item);
        })


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
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                            onClick={() => {
                                setCardBodyShow((pre) => {
                                    if (pre == "") return "d-none";
                                    else return "";
                                })
                            }}
                        />
                        <label className="form-check-label w-25" htmlFor="flexSwitchCheckChecked">詳細資料</label>
                    </div>
                </div>

                {/* g-4 裡面項目上下都margin間隔 */}
                <div className='container mt-4'>
                    <div className='body row'>
                        {/*
                        40上
                        15-40
                        15下
                        這邊本來要用reducer 因為只有一個變數，所以只會有一個狀態，無法及時渲染，
                        這邊只能乖乖用style改
                    */}
                        {
                            conuntrydata[props.county].map((item, index) => {

                                if (item["空氣品質指標"] > 100) Color = "red";
                                else if (item["空氣品質指標"] >= 51 && item["空氣品質指標"] <= 100) Color = "gold";
                                else Color = "green";

                                return (
                                    // <tr key={item.siteid} >
                                    //     <td style={{ border: "0.1rem solid black", color: "black", background: Color }}>
                                    //         地區：{item.sitename}，AQI：{item.aqi === '' ? '暫無資料' : item.aqi}
                                    //         ，空氣品質：{item.status === "" ? '暫無資料' : item.status}
                                    //     </td>
                                    // </tr>

                                    <div key={`1_${index}`} data-aos="fade-up"
                                        data-aos-duration="3000" className="main col-sm-6 col-md-4 col-xl-3 mb-3">
                                        <div className="">
                                            <div className="card h-100">

                                                {/* <img src="https://picsum.photos/seed/picsum/2000/2000" className="card-img-top" alt="..." /> */}
                                                {/* 卡片圖片或標題 */}

                                                <div className='card-img-top'>


                                                    <CircularProgressbarWithChildren
                                                        value={item["空氣品質指標"]}
                                                        styles={buildStyles({
                                                            textColor: Color,
                                                            pathColor: Color,
                                                            // backgroundColor: "#3e98c7",
                                                            // trailColor: "gold"
                                                        })}
                                                    >
                                                        {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}

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
                                                <div className={`card-body row ${cardbodyshow}`}>
                                                    {/* <h5 className="card-title">Card title</h5> */}
                                                    {/* <p className="">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> */}

                                                    <div className='col-12'>
                                                        {
                                                            Object.entries(item).map((item1, index) => {
                                                                return (<>
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
                                                                </>)
                                                            })
                                                        }
                                                    </div>



                                                </div>
                                                <div className="card-footer">
                                                    <small className="text-muted">最後更新於&nbsp;{item["資料發布時間"]}</small>
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
