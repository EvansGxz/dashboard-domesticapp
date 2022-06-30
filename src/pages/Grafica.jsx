import { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { indexOrder } from "../services/order-details-services";
import { indexEmployee } from "../services/employee-service";
import { indexCustomer } from "../services/customer-services";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
let horas = []
let empleadoMes= []
let clienteMes= []
const datos = [{mes: "Enero", horas: 0, empleados: 0, clientes: 0}, {mes: "Febrero", horas: 0, empleados: 0, clientes: 0}, {mes: "Marzo", horas: 0, empleados: 0, clientes: 0},
{mes: "Abril", horas: 0, empleados: 0, clientes: 0},{mes: "Mayo", horas: 0, empleados: 0, clientes: 0},{mes: "Junio", horas: 0, empleados: 0, clientes: 0},{mes: "Julio", horas: 0, empleados: 0, clientes: 0},
{mes: "Agosto", horas: 0, empleados: 0, clientes: 0},{mes: "Septiembre", horas: 0, empleados: 0, clientes: 0},{mes: "Octubre", horas: 0, empleados: 0, clientes: 0},{mes: "Noviemre", horas: 0, empleados: 0, clientes: 0},{mes: "Diciembre", horas: 0, empleados: 0, clientes: 0}
];
const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviemre", "Diciembre"];
const options = {
  fill: true,
  responsive: true,
  scales: {
    y: {
      min: 0,
    },
  },
  plugins: {
    legend: {
      display: true,
    },
  },
};
export default function Grafic(){
  const [orders, setOrders] = useState(null)
  const [employee, setEmployee] = useState(null)
  const [customer, setCustomer] = useState(null)
  useEffect(() => {
    indexOrder().then(setOrders)
    indexEmployee().then(setEmployee)
    indexCustomer().then(setCustomer);
  }, [])

  if(orders){
    orders.forEach((order)=>{
      const date = new Date(order.start_date.split('-').join("/"))
      datos.forEach((dat)=>{
        if(dat.mes === labels[date.getMonth()]){
          
          if(order.workday === "Completa"){
            dat.horas=dat.horas+ 9      
          }
          if(order.workday === "Media"){
            dat.horas=dat.horas+ 4.5
          }
          if(order.workday === "Hora"){
            dat.horas=dat.horas+ order.finish_date
          }
        }
      })
    })
    
    datos.forEach(data => {
      horas.push(data.horas)
    })
 
  }

  if(employee){
    employee.forEach(data => {
      const date = new Date(data.employee.created_at.substr(0, 10).split("-").join("/"))
      datos.forEach((dat)=>{
        if(dat.mes === labels[date.getMonth()]){
          dat.empleados=dat.empleados+ 1
        }
      })
    })
    datos.forEach(data => {
      empleadoMes.push(data.empleados)
    })
  }

  if(customer){
    customer.forEach(data => {
      const date = new Date(data.customer.created_at.substr(0, 10).split("-").join("/"))
      datos.forEach((dat)=>{
        if(dat.mes === labels[date.getMonth()]){
          dat.clientes=dat.clientes+ 1
        }
      })
    })
    datos.forEach(data => {
      clienteMes.push(data.clientes)
    })
  }
  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "Horas",
          data: horas,
          tension: 0.3,
          borderColor: "rgb(75, 192, 192)",
          pointRadius: 6,
          pointBackgroundColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.3)",
        },
        {
          label: "Empleados",
          tension: 0.3,
          data: empleadoMes,
          borderColor: "green",
          backgroundColor: "rgba(0, 255, 0, 0.3)",
          pointRadius: 6,
        },
        {
          label: "Clientes",
          tension: 0.3,
          data: clienteMes,
          borderColor: "yellow",
          backgroundColor: "rgba(255, 255, 0, 0.3)",
          pointRadius: 6,
        },
      ],
      labels,
    };
  }, []);

  return <Line data={data} options={options} />;
}