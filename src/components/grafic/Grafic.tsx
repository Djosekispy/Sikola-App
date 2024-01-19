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
const screenHeigth = Dimensions.get("window").height;
export default function Grafic(){
  const data = {
    labels: ["Mat.", "Port.", "Artes","Ciências"],
    data: [0.4, 0.6, 0.8,0.2],
  };

return (
<View>
  <ProgressChart
  data={data}
  width={screenWidth}
  height={300}
  chartConfig={chartConfig}
  hideLegend={false}
/>
</View>
);
  }

const chartConfig = {
    backgroundGradientFrom: "#c5cae9",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#c5cae9",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(28, 25, 146, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

  };
