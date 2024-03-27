import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export interface ElementFactories {
  colorPicker: (props: { defaultValue: string }) => React.ReactNode;
  toggle: (props: { label: string; onClick?: any }) => React.ReactNode;
  checkbox: (props: { label: string }) => React.ReactNode;
  radio: (props: { label: string; options: string[] }) => React.ReactNode;
  button: (props: { label: string; onClick?: any }) => React.ReactNode;
  write: (props: { body: string }) => React.ReactNode;
  chart: (props: { options: object; data: ChartData }) => React.ReactNode;
}

const br: ElementFactories = {} as ElementFactories;

br.checkbox = ({ label }) => {
  return (
    <div>
      <label className="text-lg font-bold">{label}</label>
      <input
        type="checkbox"
        name="check"
        id="check"
        onChange={(e) => console.log(e)}
      />
    </div>
  );
};

br.toggle = ({ label, onClick }) => {
  return (
    <div>
      <label className="font-bold text-lg  ">{label}</label>
      <input
        type="checkbox"
        name="check"
        id="check"
        onClick={onClick}
        onChange={(e) => console.log(e)}
      />
    </div>
  );
};

br.write = ({ body }) => {
  return <div>{body}</div>;
};

br.button = ({ label, onClick }) => {
  return <button className="btn btn-primary">{label}</button>;
};
/*
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
*/
br.chart = ({ options, data }) => {
  // @ts-ignore
  return <Bar options={options} data={data} />;
};

export default br;
