import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import data from "./data/data.csv";
import { AreaChart, LineChart } from "react-charts-d3";
import PieHooks from "./Piehooks";
import Bar from "./Bar";
import Bubble from "./Bubble";

function App() {
  //요일
  const [sun, setSun] = useState();
  const [mon, setMon] = useState();
  const [tue, setTue] = useState();
  const [wen, setWen] = useState();
  const [thu, setThu] = useState();
  const [fri, setFri] = useState();
  const [sat, setSat] = useState();
  let aweek = { 월: 0, 화: 0, 수: 0, 목: 0, 금: 0, 토: 0, 일: 0 };

  //주야
  const [day, setDay] = useState(0);
  const [night, setNight] = useState(0);
  let aday = 0;
  let anight = 0;

  //사고 차량
  const [Data_Car, setData_Car] = useState(0);
  const [Data_Two_Wheeled_Car, setData_Two_Wheeled_Car] = useState(0);
  const [Data_Truck, setData_Truck] = useState(0);
  const [Data_Van, setData_Van] = useState(0);
  const [Data_Bicycle, setData_Bicycle] = useState(0);
  const [Data_Car_Etc, setData_Car_Etc] = useState(0);
  let car = 0; //승용차
  let two_wheeled_car = 0; //이륜차
  let truck = 0; //화물차
  let van = 0; //승합차
  let bicycle = 0; //자전거
  let car_etc = 0; //기타

  //사고유형
  const [Data_Acrossing, setData_Acrossing] = useState(0);
  const [Data_Workpiece, setData_Workpiece] = useState(0);
  const [Data_Walking, setData_Walking] = useState(0);
  const [Data_On_Road, setData_On_Road] = useState(0);
  const [Data_Crash, setData_Crash] = useState(0);
  const [Data_Road_Departure, setData_Road_Departure] = useState(0);
  const [Data_Rail, setData_Rail] = useState(0);
  const [Data_Rollover, setData_Rollover] = useState(0);
  const [Data_Road_side, setData_Road_Side] = useState(0);
  const [Data_Over_road, setData_Over_Road] = useState(0);
  const [Data_Accident_etc, setData_Accident_Etc] = useState(0);

  let acrossing = 0; //횡단중
  let workpiece = 0; //공작물충돌
  let walking = 0; //보도통행중
  let on_road = 0; //차도통행중
  let crash = 0; //추돌
  let road_departure = 0; //도로이탈 추락 기타
  let rail = 0; //철길건널목
  let rollover = 0; //전복
  let road_side = 0; //길가장자리구역통행중
  let over_road = 0; //전도
  let accident_etc = 0; //기타

  //피해자 유형별 사망/사상자
  const [Data_Pedistrian_D, setData_Pedistrian_D] = useState(0);
  const [Data_Pedistrian_C, setData_Pedistrian_C] = useState(0);
  const [Data_None_D, setData_None_D] = useState(0);
  const [Data_None_C, setData_None_C] = useState(0);
  const [Data_Car_D, setData_Car_D] = useState(0);
  const [Data_Car_C, setData_Car_C] = useState(0);
  const [Data_Two_Wheeled_Car_D, setData_Two_Wheeled_Car_D] = useState(0);
  const [Data_Two_Wheeled_Car_C, setData_Two_Wheeled_Car_C] = useState(0);
  const [Data_Truck_D, setData_Truck_D] = useState(0);
  const [Data_Truck_C, setData_Truck_C] = useState(0);
  const [Data_Van_D, setData_van_D] = useState(0);
  const [Data_Van_C, setData_van_C] = useState(0);
  const [Data_Bicycle_D, setData_bicycle_D] = useState(0);
  const [Data_Bicycle_C, setData_bicycle_C] = useState(0);
  const [Data_Victim_Etc_D, setData_victim_Etc_D] = useState(0);
  const [Data_Victim_Etc_C, setData_victim_Etc_C] = useState(0);

  let pedistrian_D = 0; //보행자
  let pedistrian_C = 0;
  let none_D = 0; //없음
  let none_C = 0;
  let car_D = 0; //승용차
  let car_C = 0;
  let two_wheeled_car_D = 0; //이륜차
  let two_wheeled_car_C = 0;
  let truck_D = 0; //화물차
  let truck_C = 0;
  let van_D = 0; //승합차
  let van_C = 0;
  let bicycle_D = 0; //자전거
  let bicycle_C = 0;
  let victim_etc_D = 0; //기타
  let victim_etc_C = 0;

  const [bub, setBub] = useState(false);
  const [ara, setAra] = useState(false);
  const [line, setLine] = useState(false);

  useEffect(() => {
    d3.csv(data)
      .then(data => {
        data.map(val => {
          //피해자 종류 파싱
          if (val["피해자_당사자종별_대분류"] === "보행자") {
            pedistrian_D += val["사망자수"] * 1;
            pedistrian_C += val["사상자수"] * 1;
          } else if (val["피해자_당사자종별_대분류"] === "승용차") {
            car_D += val["사망자수"] * 1;
            car_C += val["사상자수"] * 1;
          } else if (val["피해자_당사자종별_대분류"] === "없음") {
            none_D += val["사망자수"] * 1;
            none_C += val["사상자수"] * 1;
          } else if (val["피해자_당사자종별_대분류"] === "이륜차") {
            two_wheeled_car_D += val["사망자수"] * 1;
            two_wheeled_car_C += val["사상자수"] * 1;
          } else if (val["피해자_당사자종별_대분류"] === "화물차") {
            truck_D += val["사망자수"] * 1;
            truck_C += val["사상자수"] * 1;
          } else if (val["피해자_당사자종별_대분류"] === "승합차") {
            van_D += val["사망자수"] * 1;
            van_C += val["사상자수"] * 1;
          } else if (val["피해자_당사자종별_대분류"] === "자전거") {
            bicycle_D += val["사망자수"] * 1;
            bicycle_C += val["사상자수"] * 1;
          } else {
            victim_etc_D += val["사망자수"] * 1;
            victim_etc_C += val["사상자수"] * 1;
          }
          //사고 유형 파싱
          if (val["사고유형"] === "횡단중") {
            acrossing++;
          } else if (val["사고유형"] === "공작물충돌") {
            workpiece++;
          } else if (val["사고유형"] === "보도통행중") {
            walking++;
          } else if (val["사고유형"] === "차도통행중") {
            on_road++;
          } else if (
            val["사고유형"] === "추돌" ||
            val["사고유형"] === "측면충돌" ||
            val["사고유형"] === "정면충돌" ||
            val["사고유형"] === "후진중충돌" ||
            val["사고유형"] === "주/정차차량 충돌"
          ) {
            crash++;
          } else if (val["사고유형"] === "전복") {
            rollover++;
          } else if (
            val["사고유형"] === "도로이탈 추락" ||
            val["사고유형"] === "도로이탈 기타"
          ) {
            road_departure++;
          } else if (val["사고유형"] === "철길건널목") {
            rail++;
          } else if (val["사고유형"] === "길가장자리구역통행중") {
            road_side++;
          } else if (val["사고유형"] === "전도") {
            over_road++;
          } else {
            accident_etc++;
          }
          //가해자 종류 파싱
          if (val["가해자_당사자종별_대분류"] === "승용차") {
            car++;
          } else if (val["가해자_당사자종별_대분류"] === "이륜차") {
            two_wheeled_car++;
          } else if (val["가해자_당사자종별_대분류"] === "화물차") {
            truck++;
          } else if (val["가해자_당사자종별_대분류"] === "승합차") {
            van++;
          } else if (val["가해자_당사자종별_대분류"] === "자전거") {
            bicycle++;
          } else {
            car_etc++;
          }
          //요일 파싱
          if (val["요일"] === "월") {
            aweek.월++;
          } else if (val["요일"] === "화") {
            aweek.화++;
          } else if (val["요일"] === "수") {
            aweek.수++;
          } else if (val["요일"] === "목") {
            aweek.목++;
          } else if (val["요일"] === "금") {
            aweek.금++;
          } else if (val["요일"] === "토") {
            aweek.토++;
          } else if (val["요일"] === "일") {
            aweek.일++;
          }
          //주야 파싱
          if (val["주야"] === "주") {
            aday++;
          } else if (val["주야"] === "야") {
            anight++;
          }
        });
      })
      .then(() => {
        setDay((100 * aday) / (aday + anight));
        setNight((100 * anight) / (aday + anight));

        setMon(aweek.월);
        setTue(aweek.화);
        setWen(aweek.수);
        setThu(aweek.목);
        setFri(aweek.금);
        setSat(aweek.토);
        setSun(aweek.일);

        setData_Car(car);
        setData_Two_Wheeled_Car(two_wheeled_car);
        setData_Truck(truck);
        setData_Van(van);
        setData_Bicycle(bicycle);
        setData_Car_Etc(car_etc);

        setData_Acrossing(acrossing);
        setData_Workpiece(workpiece);
        setData_Walking(walking);
        setData_On_Road(on_road);
        setData_Crash(crash);
        setData_Road_Departure(road_departure);
        setData_Rail(rail);
        setData_Rollover(rollover);
        setData_Road_Side(road_side);
        setData_Over_Road(over_road);
        setData_Accident_Etc(accident_etc);

        setData_Pedistrian_D(pedistrian_D);
        setData_Pedistrian_C(pedistrian_C);
        setData_None_D(none_D);
        setData_None_C(none_C);
        setData_Car_D(car_D);
        setData_Car_C(car_C);
        setData_Two_Wheeled_Car_D(two_wheeled_car_D);
        setData_Two_Wheeled_Car_C(two_wheeled_car_C);
        setData_Truck_D(truck_D);
        setData_Truck_C(truck_C);
        setData_van_D(van_D);
        setData_van_C(van_C);
        setData_bicycle_D(bicycle_D);
        setData_bicycle_C(bicycle_C);
        setData_victim_Etc_D(victim_etc_D);
        setData_victim_Etc_C(victim_etc_C);
        setAra(true);
        setLine(true);
      })
      .then(() => {
        setBub(true);
      })
      .catch(err => {
        throw err;
      });
  });

  let linedata = [
    {
      key: "사고유형",
      values: [
        { x: "횡단중", y: Data_Acrossing },
        { x: "공작물충돌", y: Data_Workpiece },
        { x: "보도통행중", y: Data_Walking },
        { x: "차도통행중", y: Data_On_Road },
        { x: "추돌", y: Data_Crash },
        { x: "도로이탈", y: Data_Road_Departure },
        { x: "철길건널목", y: Data_Rail },
        { x: "전복", y: Data_Rollover },
        { x: "길가가장자리", y: Data_Road_side },
        { x: "전도", y: Data_Over_road },
        { x: "기타", y: Data_Accident_etc }
      ]
    }
  ];

  let areadata = [
    {
      key: "사망자",
      values: [
        { x: "보행자", y: Data_Pedistrian_D },
        { x: "승용차", y: Data_Car_D },
        { x: "없음", y: Data_None_D },
        { x: "이륜차", y: Data_Two_Wheeled_Car_D },
        { x: "화물차", y: Data_Truck_D },
        { x: "승합차", y: Data_Van_D },
        { x: "자전거", y: Data_Bicycle_D },
        { x: "기타", y: Data_Victim_Etc_D }
      ]
    },
    {
      key: "사상자",
      values: [
        { x: "보행자", y: Data_Pedistrian_C },
        { x: "승용차", y: Data_Car_C },
        { x: "없음", y: Data_None_C },
        { x: "이륜차", y: Data_Two_Wheeled_Car_C },
        { x: "화물차", y: Data_Truck_C },
        { x: "승합차", y: Data_Van_C },
        { x: "자전거", y: Data_Bicycle_C },
        { x: "기타", y: Data_Victim_Etc_C }
      ]
    }
  ];
  let bubbledata = {
    children: [
      { Name: "승용차", Count: Data_Car },
      { Name: "이륜차", Count: Data_Two_Wheeled_Car },
      { Name: "화물차", Count: Data_Truck },
      { Name: "승합차", Count: Data_Van },
      { Name: "자전거", Count: Data_Bicycle },
      { Name: "기타", Count: Data_Car_Etc }
    ]
  };
  let piedata = [
    { date: "주", value: day },
    { date: "야", value: night }
  ];
  let bardata = [
    { index: 1, date: "월", value: mon },
    { index: 2, date: "화", value: tue },
    { index: 3, date: "수", value: wen },
    { index: 4, date: "목", value: thu },
    { index: 5, date: "금", value: fri },
    { index: 6, date: "토", value: sat },
    { index: 7, date: "일", value: sun }
  ];

  return (
    <>
      <PieHooks
        data={piedata}
        width={400}
        height={400}
        innerRadius={0}
        outerRadius={200}
      />
      <Bar
        data={bardata}
        width={500}
        height={500}
        top={20}
        bottom={30}
        left={30}
        right={0}
      />

      {bub && <Bubble data={bubbledata} />}

      {ara && (
        <AreaChart height={500} width={300} data={areadata} strokeWidth={0} />
      )}

      {line && <LineChart data={linedata} />}
    </>
  );
}

export default React.memo(App);
