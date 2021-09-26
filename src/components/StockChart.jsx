import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';


const StockChart = () => {
    const stockPriceList = useSelector( rootReducer => rootReducer.stock.selectPricePeriod );
    const selectPeriod = useSelector( rootReducer => rootReducer.stock.selectPeriod);
    
    console.log('선택 기간');
    console.log(selectPeriod);

    console.log('가격 리스트 : ');
    console.log(stockPriceList);
    
    const data = {
        labels: stockPriceList.map( price => price["날짜"]),
        datasets: [
            {
              label: null,
              data: stockPriceList.map( price => price['종가']),
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };
    const options = {
        plugins: { legend: { display: false } },
        interaction: {
          intersect: false,
          mode: 'index',
        },
    };
    
    return (
        <div>
            {stockPriceList && (
                <Line data={data} options={options} />
            )}
        </div>
    )
    
}


export default StockChart;