import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useColorModeValue } from '@chakra-ui/react';

const StockChart = () => {
    const stockPriceList = useSelector( rootReducer => rootReducer.stock.selectPricePeriod );
    const period = useSelector( rootReducer => rootReducer.stock.selectPeriod );
    const isDark = useColorModeValue(false, true);
    const themeColor = isDark ? 'rgba(255, 255, 255, 0.92)' : 'rgba(0, 0, 0, 0.64)';
    
    const data = useMemo(() => {
        return {
            labels: stockPriceList.map( price => price["날짜"].split(' ')[0]),
            datasets: [
                {
                label: null,
                data: stockPriceList.map( price => price['종가']),
                borderColor: 'rgb(86, 115, 235)',
                borderwidth: period === 'TENYEARS' ? 1 : 4,
                pointRadius: period === 'TENYEARS' ? 0 : 3,
                pointBackgroundColor: 'rgb(86, 115, 235)',
                },
            ],
        }
    }, [stockPriceList, period])
    const options = useMemo(() => {
        return {
            plugins: { legend: { display: false } },
            interaction: {
            intersect: false,
            mode: 'index',
            },
            scales: {
                x: {
                    ticks: {
                        color: themeColor,
                        maxTicksLimit: 12,
                        maxRotation: 20,
                    },
                    grid: {
                        bordeWidth: 0.125,
                        linewidth: 0.125,
                        color: themeColor,
                        tickColor: themeColor,
                        borderColor: themeColor,
                    },
                },
                y: {
                    ticks: {
                        color: themeColor,
                    },
                    grid: {
                        borderwidth: 0.125,
                        linewidth: 0.125,
                        color: themeColor,
                        tickColor: themeColor,
                        borderColor: themeColor,
                    }
                }
            }
        }
    }, [themeColor])

    
    return (
        <>
            {stockPriceList && (
                <Line data={data} options={options} />
            )}
        </>
    )
    
}


export default StockChart;