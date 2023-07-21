import React, { useState } from 'react';
import Styles from "./moduleCSS/Class.module.css"

const Class = (props) => {

    // 存選擇的select值回父系
    const selectHandler = (event) => {
        props.setCounty(event.target.value);
    };
    // 過濾縣市
    const Country = [];
    let Color = "";


    // 在資料不存在時顯示預設內容或錯誤處理
    // 為何前面請求 http 未做完就送props過來?
    if (!props.data || !props.data.data || !props.data.data.records) {
        return <div>資料讀取中...</div>;
    }
    else {
        // 處理縣市重複過濾
        props.data.data.records.map((item) => {
            var check = false;
            for (var i in Country)
                if (item.county === Country[i]) {
                    check = true;
                }
            if (!check) {
                Country.push(item.county);
            }
        })

        return (
            <div>
                <div className="container mt-4">
                    <h2>各縣市空氣品質AQI</h2>
                    <select className="form-select" aria-label="Select example" defaultValue="臺北市" onChange={selectHandler}>
                        {
                            Country.map((item, index) => {
                                return <option key={index} value={item}>{item}</option>
                            })
                        }
                    </select>
                </div>
                <table>
                    <thead>

                        {/* 
                        40上
                        15-40
                        15下
                        這邊本來要用reducer 因為只有一個變數，所以只會有一個狀態，無法及時渲染，
                        這邊只能乖乖用style改
                    */}
                        {
                            props.data.data.records.map((item) => {
                                if (item.county === props.county) {
                                    if (item.aqi > 40) Color = "red";
                                    else if (item.aqi >= 15 && item.aqi <= 40) Color = "yellow";
                                    else Color = "green";

                                    return (
                                        <tr key={item.siteid} >
                                            <td style={{ border: "0.1rem solid black", color: "black", background: Color }}>
                                                地區：{item.sitename}，AQI：{item.aqi === '' ? '暫無資料' : item.aqi}
                                                ，空氣品質：{item.status === null ? '暫無資料' : item.status}


                                            </td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </thead>
                </table>

            </div>
        );
    }
}

export default Class;
