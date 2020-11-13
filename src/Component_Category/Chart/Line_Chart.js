import React from 'react';
import {ResponsiveLine} from '@nivo/line'
import theme from "../../MyTheme/Theme";


const colors = {'Japan': theme.palette.grey["400"], 'China': theme.palette.secondary.main, 'American': theme.palette.primary.main}
const getColor = bar => colors[bar.id]

const data = [
    {
        "id": "Japan",
        "data": [
            {
                "x": 15,
                "y": 14
            },
            {
                "x": 20,
                "y": 111
            },
            {
                "x": 30,
                "y": 75
            },
        ]
    },
    {
        "id": "China",
        "data": [
            {
                "x": 12,
                "y": 99
            },
            {
                "x": 40,
                "y": 20
            },
            {
                "x": 90,
                "y": 50
            },
        ]
    },

    {
        "id": "American",
        "data": [
            {
                "x": 23,
                "y": 130
            },
            {
                "x": 49,
                "y": 40
            },
            {
                "x": 99,
                "y": 35
            },
        ]
    },


]

const Line_Chart = () => {
    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'linear' }}
            yScale={{ type: 'linear', max: 'auto', reverse: false }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Extend',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Volume',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            colors={(bar) =>{
                return getColor(bar)
            }}
            pointSize={8}
            pointColor={'white'}
            pointBorderWidth={2}
            pointBorderColor={theme.palette.grey["500"]}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    );
};

export default Line_Chart;
