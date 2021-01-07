import React from 'react';
import {ResponsiveBar} from '@nivo/bar'
import theme from "../../MyTheme/Theme";
import Paper from "@material-ui/core/Paper";
import AutoSizer from "react-virtualized-auto-sizer";

const colors = {
    'Hot dog': theme.palette.grey["200"],
    'Burger': theme.palette.secondary.main,
    'Sandwich': theme.palette.primary.main
}
const getColor = bar => colors[bar.id]

const data = [
    {
        id: "2014",
        "Hot dog": 114,
        "Burger": 48,
        "Sandwich": 84,
    },
    {
        id: "2015",
        "Hot dog": 86,
        "Burger": 76,
        "Sandwich": 49,
    },
    {
        id: "2016",
        "Hot dog": 147,
        "Burger": 155,
        "Sandwich": 48,
    },
    {
        id: "2017",
        "Hot dog": 136,
        "Burger": 182,
        "Sandwich": 20,
    },
    {
        id: "2018",
        "Hot dog": 132,
        "Burger": 15,
        "Sandwich": 55,

    },
    {
        id: "2019",
        "Hot dog": 50,
        "Burger": 151,
        "Sandwich": 123,

    },
    {
        id: "2020",
        "Hot dog": 116,
        "Burger": 121,
        "Sandwich": 146,

    }
]


const CustomBorder = ({bars}) =>
    bars.map(bar => (
        <line
            key={bar.key}
            x1={bar.x + bar.width / 2}
            y1={bar.y + bar.height}
            x2={bar.x + bar.width / 2}
            y2={bar.y + bar.height - 10}
            stroke={function () {
                console.log(bar)
                console.log(bar.data.id)
                console.log(getColor(bar))
                return getColor(bar.data)
            }()}
            strokeWidth={20}
            style={{pointerEvents: "none"}}
        />
    ));

const Bar_Chart = () => {
    return (
        <AutoSizer defaultHeight={400}>
            {({height, width}) => (
                <Paper elevation={3} style={{
                    width: width,
                    height: height,
                }}>
                    <ResponsiveBar
                        data={data}
                        keys={['Hot dog', 'Burger', 'Sandwich']}
                        indexBy='id'
                        margin={{top: 50, right: 130, bottom: 50, left: 60}}
                        padding={0.1}
                        colors={(bar) => {
                            return getColor(bar)
                        }}
                        animate={true}
                        padding={0.45}
                        enableLabel={false}
                        groupMode="grouped"
                        defs={[]}
                        fill={[]}
                        borderColor={{from: 'color', modifiers: [['darker', 3]]}}
                        borderRadius={3}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Year',
                            legendPosition: 'middle',
                            legendOffset: 32
                        }}

                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Food',
                            legendPosition: 'middle',
                            legendOffset: -40
                        }}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                        legends={[
                            {
                                dataFrom: 'keys',
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 120,
                                translateY: 0,
                                itemsSpacing: 2,
                                itemWidth: 100,
                                itemHeight: 20,
                                itemDirection: 'left-to-right',
                                itemOpacity: 0.85,
                                symbolSize: 20,
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                        motionStiffness={90}
                        motionDamping={15}
                        onClick={function (node, e) {
                            console.log(node);

                        }}
                        layers={[
                            "grid",
                            "axes",
                            "bars",
                            "markers",
                            "legends",
                            "annotations"
                        ]}
                    />
                </Paper>
            )}
        </AutoSizer>

    )
        ;
};

export default Bar_Chart;
