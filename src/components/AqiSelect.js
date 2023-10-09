import React from 'react'

const AqiSelect = ({ county, selectHandler, conuntryData, handleSort }) => {
    return (
        <div className='SelectContainer'>
            <select className="form-select" aria-label="Select example" value={county} onChange={selectHandler}>
                {
                    Object.keys(conuntryData)?.map((item, index) => {
                        return <option key={index} value={item}>{item}</option>
                    })
                }
            </select>

            <select className="form-select" aria-label="Select example" defaultValue={"AQI低到高"} onChange={(e) => handleSort(e.target.value)}>
                <option value="AQI低到高">AQI低到高</option>
                <option value="AQI高到低">AQI高到低</option>
            </select>

        </div>
    )
}

export default AqiSelect