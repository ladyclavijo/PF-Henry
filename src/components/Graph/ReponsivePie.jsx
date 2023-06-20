
// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from '@nivo/pie'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsivePie = ({data = [
    {
      id: "hack",
      label: "hack",
      value: 78,
      color: "hsl(159, 70%, 50%)",
    },
    {
      id: "css",
      label: "css",
      value: 113,
      color: "hsl(40, 70%, 50%)",
    },
    {
      id: "sass",
      label: "sass",
      value: 597,
      color: "hsl(268, 70%, 50%)",
    },
    {
      id: "python",
      label: "python",
      value: 333,
      color: "hsl(215, 70%, 50%)",
    },
    {
      id: "go",
      label: "go",
      value: 174,
      color: "hsl(145, 70%, 50%)",
    },
  ]}) => (
    <ResponsivePie 
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={{ theme: 'labels.text.fill' }}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'top-left',
                direction: 'column',
                justify: false,
                translateX: -26,
                translateY: 9,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 30,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
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
)
export default MyResponsivePie