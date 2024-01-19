import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
  import {View, Text, StyleSheet} from 'react-native';
  import { Dimensions } from "react-native";



const screenWidth = Dimensions.get("window").width;
const screenHeigth = Dimensions.get("window").height;
export default function GraficHistoric(){


    const commitsData = [
        { date: "2017-01-02", count: 1 },
        { date: "2017-01-03", count: 2 },
        { date: "2017-01-04", count: 3 },
        { date: "2017-01-05", count: 4 },
        { date: "2017-01-06", count: 5 },
        { date: "2017-01-30", count: 2 },
        { date: "2017-01-31", count: 3 },
        { date: "2017-03-01", count: 2 },
        { date: "2017-04-02", count: 4 },
        { date: "2017-03-05", count: 2 },
        { date: "2017-06-06", count: 4 },
        { date: "2017-06-06", count: 4 },
        { date: "2017-02-05", count: 2 },
        { date: "2017-11-30", count: 4 }
      ];

  return (
 <View>
  <Text>Bezier Line Chart</Text>
  <LineChart
    data={{
      labels: ["1", "2", "3", "4", "5", "6","7","8","9","10"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
             Math.random() * 100,
              Math.random() * 100,
               Math.random() * 100,
                Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width} 
    yAxisInterval={1} 
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, 
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>
  );
}
const chartConfig = {
  backgroundGradientFrom: "#c5cae9",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#c5cae9",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(28, 28, 146, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };