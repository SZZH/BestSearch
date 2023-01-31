import moment from "moment";
import { useEffect } from "react";
import * as echarts from "echarts";

import "./index.css";

const monthMap = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

const ListItem = (props) => {
  const { data, loading } = props;

  if (loading) {
    return (
      <div className="list-item-box list-item-box-loading">
        <div className="list-item-title"></div>
        <div className="list-item-subTitle"></div>
        <div className="list-item-chart"></div>
      </div>
    );
  }

  const chartId = `chart-container-${data.name}`;

  useEffect(() => {
    const dom = document.getElementById(chartId);
    const myChart = echarts.init(dom, null, {
      renderer: "canvas",
      useDirtyRect: false,
    });
    const x = data.search_msv?.map((item) => item.date);
    const y = data.search_msv?.map((item) => item.sv);
    const chartOption = {
      backgroundColor: "rgba(128, 128, 128, 0)",
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: x,
      },
      grid: {
        x: "0%",
        x2: "0%",
        y: "0%",
        y2: "0%",
      },
      yAxis: {
        type: "value",
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          data: y,
          type: "line",
          areaStyle: {},
          showAllSymbol: false,
          symbol: 'none'
        },
      ],
    };
    myChart.setOption(chartOption);

    const redize = () => myChart.resize()
    window.addEventListener('resize', redize);
    return () => {
      window.removeEventListener('resize', redize);
    };
  }, [data]);

  const startMonth =
    monthMap[Number(moment(data.kwfinder_updated_at).format("MM"))];
  const startYear = moment(data.kwfinder_updated_at).format("YYYY");
  const endMonth =
    monthMap[Number(moment(data.forecast_updated_at).format("MM"))];
  const endYear = moment(data.forecast_updated_at).format("YYYY");

  return (
    <div className="list-item-box">
      <div className="list-item-title">{data.name}</div>
      <div className="list-item-subTitle">Growth {data.cpc * 100}%</div>
      <div id={chartId} className="list-item-chart"></div>
      <div className="list-item-bottom">
        <span>
          {startMonth} {startYear} ~&nbsp;
          {endMonth} {endYear}
        </span>
      </div>
    </div>
  );
};

export default ListItem;
