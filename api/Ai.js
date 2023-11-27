import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';

const Ai = () => {
  const [loading, isLoading] = useState(false);
  const [askai, setAskai] = useState('');

  const [aianswerArray, setAianswerArray] = useState([
   /*  {entity:'user',
     comment:'Hi what does this site does'},
    {entity:'ai',
     comment:'i am an ai looking to work'},
    {entity:'ai',
     comment:'what do you think i do?'}, */
  ]);
  const [aianswer, setAianswer] = useState();

  //const [askdisese, setAskdisease] = useState("");
  const disease = [
    {
      group: "Respiratory Syndrome",
      effects: ["Cough", "Shortness of Breath", "Wheezing", "Chest Pain"],
    },
    {
      group: "Cardiovascular Syndrome",
      effects: ["Chest pain", "Irrelugar heart beat", "Swelling"],
    },
    {
      group: "Digestive Syndrome",
      effects: ["Nausea", "Vomiting", "Changes in Bowel habits"],
    },
    {
      group: "Nervous Syndrome",
      effects: ["Haedache", "Memory Loss", "Weakness", "Tremors"],
    },
    {
      group: "Skin Syndrome",
      effects: ["Rashes", "Itching", "Redness", "Skin discolration"],
    },
    {
      group: "Urinary Syndrome",
      effects: ["Frequent Urination", "Painful Urination", "Blood in Urine"],
    },
    {
      group: "Mental Syndrome",
      effects: ["Depression", "Anxiety", "Mood Swing"],
    },
  ];

  const [dietchart, setDietchart] = useState();
  //const [askdiet, setAskdiet] = useState("");

  const [prescibe, setPrescibe] = useState("");
  //const [doctoreport, setDoctoreport] = useState("");

  const solveDoubt = useCallback(
    async (e) => {
      e.preventDefault()
      try {
          isLoading(true);
          console.log(askai);
          setAianswerArray((prevArray) => [
            ...prevArray,
            { entity: 'user', comment: askai },
          ]);
          const askdoubt=await axios.post('https://smart-heath-be.vercel.app/askai/askdoubt',{prompt:askai})
          console.log("............",askdoubt.data);
          setAianswerArray((prevArray) => [
            ...prevArray,
            { entity: 'ai', comment: askdoubt.data.message },
          ]);  
          setAskai('')
          isLoading(false);
      } catch (err) {
        console.log(err);
      }
    },
    [askai]
  );
  const predictDisease = useCallback(
    async (e) => {
        try {
          console.log(askai);
          const askdoubt=await axios.post('https://smart-heath-be.vercel.app/askai/predict',{prompt:askai})
          console.log(askdoubt.data.message);
          setAianswer(askdoubt.data.message);
        }
        catch (err) {
          console.log(err);
        }
    },
    [askai]
  );
  const prepareDietChart = useCallback(
    async (e) => {
      try {
      } catch (err) {
        console.log(err);
      }
    },
    [aianswer]
  );
  const prescibeReport = useCallback(
    async (e) => {
      console.log("mbxsckjahcfkjhk");
      const formData = new FormData();
      try {
        formData.append('file', askai);
        console.log(formData);
        const askdoubt=await axios.post('https://smart-heath-be.vercel.app/askai/prescribe',formData, {headers: {
          'Content-Type': 'multipart/form-data',
        }},)
        setPrescibe(askdoubt.data.message);
      } catch (err) {
        console.log(err);
      }
    },
    [askai]
  );

  return {
    loading,
    askai,
    setAskai,
    aianswerArray,
    setAianswerArray,
    aianswer,
    setAianswer,
    disease,
    dietchart,
    setDietchart,
    prescibe,
    setPrescibe,
    solveDoubt,
    predictDisease,
    prepareDietChart,
    prescibeReport,
  };
};

export default Ai;
