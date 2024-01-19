import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
  import {View, Text} from 'react-native';
  import { Dimensions } from "react-native";
  
  const screenWidth = Dimensions.get("window").width;
  
  export default function GraficLessons(){
    const data = {
        labels: ["%"],
        datasets: [
          {
            data: [0]
          }
        ]
      };
  return (
    <BarChart
    data={data}
    width={150}
    height={220}
    chartConfig={chartConfig}
   showValuesOnTopOfBars={true}
  />
  );
    }
  
  const chartConfig = {
    backgroundGradientFrom: "#7b7bf1",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#c5cae9",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `skyblue`,
    labelColor: (opacity = 1) => `black`,
    yAxisTicks: {
      show: true,
      color: 'transparent',
    },
  };
