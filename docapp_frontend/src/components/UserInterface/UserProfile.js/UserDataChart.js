import React, {useState} from 'react'
import 'chart.js/auto';
import { Line, defaults } from 'react-chartjs-2'

const UserDataChart = (props) => {
  const [userData,setUserData] = React.useState(props.data)
  const [refresh,setRefresh] = useState(props.refresh)

  var arr = []
  props.data.map((item,index)=>{arr.push(index)})
  return (
    <div>
      <Line
        data={{
          labels: arr,
          datasets: [
            {
              label: 'your data',
              data: props.data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
            // {
            //   label: 'High BP',
            //   data: props.data,
            //   backgroundColor: 'orange',
            // },
          ],
        }}
        height={300}
        width={810}
        options={{
          maintainAspectRatio: true,
          scales: {
            yAxes:{
              // min:0
            },
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    </div>
  )
}

export default UserDataChart