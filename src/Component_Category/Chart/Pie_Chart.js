import React from 'react';
import { ResponsivePie } from '@nivo/pie'
import theme from "../../MyTheme/Theme";

const colors = {
    'elixir': theme.palette.primary.light,
    'stylus': theme.palette.secondary.main,
    'hack': theme.palette.primary.main,
}
const getColor = bar => colors[bar.id]

const data = [
    {
        "id": "elixir",
        "label": "elixir",
        "value": 489,
    },
    {
        "id": "stylus",
        "label": "stylus",
        "value": 300,
    },
    {
        "id": "hack",
        "label": "hack",
        "value": 450,
    },

]

const Pie_Chart = () => {
    return (
        <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={(bar)=>{
                return getColor(bar)
            }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor={{ from: 'color' }}
            enableSlicesLabels={false}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor={theme.palette.grey["50"]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            defs={[

            ]}
            fill={[

            ]}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    translateY: 56,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />

    );
};

export default Pie_Chart;
