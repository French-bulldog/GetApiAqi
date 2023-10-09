import React from 'react'

const AqiLoading = ({ display }) => {
    return (
        <div className={`loading ${display}`}>
            {/* 資料讀取中... */}
            <img src='https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700'></img>
        </div>
    )
}

export default AqiLoading