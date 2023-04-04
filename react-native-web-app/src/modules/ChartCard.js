import { ResponsiveLine } from '@nivo/line'
import { StyleSheet, Text, View } from 'react-native'

const theme = {
  "background": "#0f111a",
  "textColor": "#c0caf5",
  "fontSize": 11,
  "crosshair": {
    "line": {
      "stroke": "#c5c5c5",
      "strokeWidth": 1,
      "strokeOpacity": 0.35
    }
  },
  "axis": {
      "domain": {
          "line": {
              "stroke": "#3b3f51",
              "strokeWidth": 1
          }
      },
      "legend": {
          "text": {
              "fontSize": 12,
              "fill": "#BB9AF7"
          }
      },
      "ticks": {
          "line": {
              "stroke": "#3b3f51",
              "strokeWidth": 1
          },
          "text": {
              "fontSize": 11,
              "fill": "#c0caf5"
          }
      }
  },
  "grid": {
      "line": {
          "stroke": "#3b3f5180",
          "strokeWidth": 1
      }
  },
  "legends": {
      "title": {
          "text": {
              "fontSize": 11,
              "fill": "#c0caf5"
          }
      },
      "text": {
          "fontSize": 11,
          "fill": "#c0caf5"
      },
      "ticks": {
          "line": {},
          "text": {
              "fontSize": 10,
              "fill": "#c0caf5"
          }
      }
  },
  "tooltip": {
    "container": {
          "flex": 1,
          "left": '5px',
      "top": '5px',
      "zIndex": 3,
      "height": 'auto',
          "width": 'auto',
          "background": "#0f111a",
          "color": "#4b526d",
          "fontSize": 12,
          "boxShadow": '0 3px 2px rgba(0, 0, 0, 0.25)',
          "borderRadius": 8,
      },
      "basic": {"display": 'flex', "whiteSpace": 'pre', "flex": 1},
      "chip": {},
      "table": {},
      "tableCell": {},
      "tableCellValue": {}
  }
}


const styles = StyleSheet.create({
  card: {
    flex: 0.6,
    width: 500,
    height: 500,
    borderRadius: 5,
    backfaceVisibility: 'visible',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    backgroundColor: 'inherit'
  },
  text: {
    color: '#a6accd'
  } 
} )

const commonProperties = {
  width: 400,
  height: 400,
  margin: { top: 35, right: 35, bottom: 35, left: 35 },
  animate: true,
  enableSlices: 'x',
  stacked: true,
  theme: theme

}

const CustomSymbol = ({ size, color, borderWidth, borderColor }) => (
  <g>

      <circle fill="#fff" fillOpacity="30%" r={size / 5} strokeWidth={borderWidth} stroke={borderColor} />

      <circle

          r={size / 7}

          strokeWidth={borderWidth}

          stroke={borderColor}

          fill={color}

          fillOpacity={0.35}

      />

  </g>

)

export const ChartCard = ({data = 0}) => (
  <View style={styles.card}>
    <ResponsiveLine
      {...commonProperties}
        data={[
            {
                id: 'fake corp. A',
                data: [
                    { x: '2018-01-01', y: 7 },
                    { x: '2018-01-02', y: 5 },
                    { x: '2018-01-03', y: 11 },
                    { x: '2018-01-04', y: 9 },
                    { x: '2018-01-05', y: 12 },
                    { x: '2018-01-06', y: 16 },
                    { x: '2018-01-07', y: 13 },
                    { x: '2018-01-08', y: 13 },
                ],
            },
            {
                id: 'fake corp. B',
                data: [
                    { x: '2018-01-04', y: 14 },
                    { x: '2018-01-05', y: 14 },
                    { x: '2018-01-06', y: 15 },
                    { x: '2018-01-07', y: 11 },
                    { x: '2018-01-08', y: 10 },
                    { x: '2018-01-09', y: 12 },
                    { x: '2018-01-10', y: 9 },
                    { x: '2018-01-11', y: 7 },
                ],
            },
        ]}
        xScale={{
            type: 'time',
            format: '%Y-%m-%d',
            useUTC: false,
          precision: 'day',
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
            type: 'linear',
            stacked: false,
            min: 'auto',
            max: 'auto'
        }}
        axisLeft={{
            legend: 'water',
            legendOffset: 12,
        }}
      axisBottom={{
            format: '%b %d',
            tickValues: 'every 2 days',
            legend: '',
            legendOffset: -12,
      }}
      colors={{ scheme: 'accent' }}
        curve={'monotoneX'}
        enablePointLabel={true}
        pointSymbol={CustomSymbol}
        pointSize={16}
        pointBorderWidth={1}
        pointBorderColor={{
            from: 'color',
            modifiers: [['darker', 0.3]],
        }}
        useMesh={true}
      enableSlices={false}
      legends={[
        {
            anchor: 'top-right',
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
  </View>
    
)