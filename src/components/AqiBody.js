import React from 'react'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';


const AqiBody = ({ conuntryData, county, handleArrowClick }) => {
    return (
        <div className='body row'>
            {
                conuntryData[county]?.map((item, index) => {
                    let color;
                    if (item["空氣品質指標"] > 301) color = "brown";
                    else if (item["空氣品質指標"] >= 201 && item["空氣品質指標"] <= 300) color = "blueviolet";
                    else if (item["空氣品質指標"] >= 151 && item["空氣品質指標"] <= 200) color = "red";
                    else if (item["空氣品質指標"] >= 101 && item["空氣品質指標"] <= 150) color = "orange";
                    else if (item["空氣品質指標"] >= 51 && item["空氣品質指標"] <= 100) color = "gold";
                    else color = "green";

                    return (
                        <div key={`1_${index}`} data-aos="fade-up"
                            data-aos-duration="3000" className="main col-sm-6 col-md-4 col-xl-3 mb-3">
                            <div className="" id="accordionExample">
                                <div className="card h-100">
                                    <div className='card-img-top'>
                                        <CircularProgressbarWithChildren
                                            value={item["空氣品質指標"]}
                                            styles={buildStyles({
                                                textColor: color,
                                                pathColor: color,
                                            })}
                                        >
                                            <div className='content'>
                                                <img
                                                    style={{ width: 100, marginTop: -5 }}
                                                    src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/844721107732967.6408f248b9ff7.gif"
                                                    alt="doge"
                                                />
                                                <div style={{ fontSize: 30, marginTop: -5, color: color }}>
                                                    <strong >{item["空氣品質指標"]}</strong>
                                                    <br />
                                                    <small>{item["測站名稱"]}</small>
                                                </div>
                                            </div>
                                        </CircularProgressbarWithChildren>
                                    </div>

                                    <div className={`card-body row accordion-collapse collapse 
                                                ${(conuntryData[county][index]["箭頭正反"]) ? "show" : ""}`}
                                        id={`${item["測站名稱"]}`} data-bs-parent="#accordionExample"
                                    >
                                        <div className='col-12'>
                                            {
                                                Object.entries(item).map((item1, index) => {
                                                    if (item1[0] != "箭頭正反") {
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
                                                    }
                                                })
                                            }
                                        </div>
                                    </div>

                                    <div className="card-footer">
                                        <small className="text-muted">最後更新於&nbsp;{item["資料發布時間"]}</small>

                                        <div className='card-down' type="button" data-bs-toggle="" data-bs-target={`#${item["測站名稱"]}`} aria-expanded="false" aria-controls={`#${item["測站名稱"]}`}
                                            onClick={() => handleArrowClick(county, index)}
                                        >
                                            {
                                                (conuntryData[county][index]["箭頭正反"]) ? (
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
    )
}

export default AqiBody