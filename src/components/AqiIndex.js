import React from 'react'

const AqiIndex = () => {
    return (
        <div className='level row'>
            <div className='col-6 col-sm-4 col-lg-2'>
                <div className='item item1'>
                    <p>AQI 0-50</p>
                    <h4>綠</h4>
                    <p className='cation'>良好</p>
                </div>
            </div>
            <div className='col-6 col-sm-4 col-lg-2'>
                <div className='item item2'>
                    <p>AQI 51-100</p>
                    <h4>黃</h4>
                    <p className='cation'>普通</p>
                </div>
            </div>
            <div className='col-6 col-sm-4 col-lg-2'>
                <div className='item item3'>
                    <p>AQI 101-150</p>
                    <h4>橘</h4>
                    <p className='cation'>對敏感族群不良</p>
                </div>
            </div>
            <div className='col-6 col-sm-4 col-lg-2'>
                <div className='item item4'>
                    <p>AQI 151-200</p>
                    <h4>紅</h4>
                    <p className='cation'>對所有族群不良</p>
                </div>
            </div>
            <div className='col-6 col-sm-4 col-lg-2'>
                <div className='item item5'>
                    <p>AQI 201-300</p>
                    <h4>紫</h4>
                    <p className='cation'>非常不良</p>
                </div>
            </div>
            <div className='col-6 col-sm-4 col-lg-2'>
                <div className='item item6'>
                    <p>AQI 301-500</p>
                    <h4>褐</h4>
                    <p className='cation'>有害</p>
                </div>
            </div>
        </div>
    )
}

export default AqiIndex