import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import SymbolForm from "./SymbolForm";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';

const baseURL = "http://127.0.0.1:8000/api/";
let validatedSet = new Set();

function MainToolComponent() {
  const [token, setToken] = useState("");
  const [symbol, setSymbol] = useState("");
  const [storedSymbols, setStoredSymbols] = useState([]);

  useEffect(() => {
    axios.get(baseURL+"access-token/").then((response) => {
      console.log(response)
      if (response.data['token'] === null){
        console.log("error getting token")  
        alert("Your API Token is Expired");    
      }
      else{
        console.log(response.data["token"])
        setToken(response.data["token"]);
      }
    }).catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (token !== null) {
      axios
        .get(baseURL + "get-symbols/", {
          params: {
            access_token: token,
          },
        })
        .then((response) => {
          validatedSet = new Set(response.data["symbols"]);

        }).catch(function (error) {
            console.log(error);
          });
    }
  }, [token]);

  useEffect(() => {
    getStoredSymbols();
    const intervalId = setInterval(() => {
        
      getStoredSymbols();
    }, 1000 * 10); // in milliseconds
    return () => clearInterval(intervalId);
  }, []);

  const getStoredSymbols = () => {
    if ( token ){
    axios
      .get(baseURL + "get-stored-data/", {
        params: {
          access_token: token,
        },
      })
      .then((response) => {
        setStoredSymbols(response.data);
      });
    }
  };

  function formatDate() {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  //symbls must be a prepared string "AAPL,A"
  function getUpdatedData(symbls) {
    let date = formatDate();

    axios
      .post(baseURL+"get-stock-data/", {
        token: token,
        date: date,
        symbols: symbls,
      })
      .then((response) => {
        getStoredSymbols();
      }).catch(function (error) {
        console.log(error.toJSON());
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let symbolPresent = false

    for(let i = 0; i<storedSymbols.length; i++){
        if (Object.keys(storedSymbols[i])[0] === symbol){
            symbolPresent = true
        }
    }
    if(symbolPresent){
        alert("This Symbol is already tracked");
        setSymbol("");
    }
    else if (validatedSet.has(symbol)) {
      //process symbol
      await getUpdatedData(symbol); //post request
      setSymbol("");
    } else {
      alert("Invalid Symbol");
      setSymbol("");
    }
  }

  function handleDelete(e, deleteSymbol){
    e.preventDefault()
    axios.delete("http://127.0.0.1:8000/api/delete-symbol/"+deleteSymbol).then((response)=>{
        getStoredSymbols()
    })

}
 
  return (
    <div>
      <Box
        sx={{
          width: 700,
          height: 500,
        }}
      >
        <Card sx={{ minWidth: 275 }} style={{ backgroundColor: "#282c34" }}>
          <SymbolForm
            setSymbol={setSymbol}
            handleSubmit={handleSubmit}
            symbol={symbol}
            style={{ backgroundColor: "#FFF" }}
          />

          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
            ></Typography>
            
            <table>
              <thead>
                <tr style={{
                  color: "orange"
                }}>
                  <th>SYMBOL |</th>
                  <th>I.U. MID |</th>
                  <th>IV30 |</th>
                  <th>IV30_CHANGE </th>
                </tr>
              </thead>

              <tbody>
                {storedSymbols.map((element) => {
                  const sym = Object.keys(element);
                  const implied_underlying_mid =
                    element[sym]["implied_underlying_mid"];
                  const iv30 = element[sym]["iv30"];
                  const iv30_change = element[sym]["iv30_change"];

                  return (
                    <tr key={sym} style={{
                        color: "White"
                      }}>
                      <td>{sym}</td>
                      <td>{implied_underlying_mid}</td>
                      <td>{iv30}</td>
                      <td>{iv30_change}</td>
                      <td><button style={{backgroundColor: "transparent"}} type="button" onClick={(e)=>{handleDelete(e,sym)}}><DeleteIcon style={{color:"darkred"}}/></button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default MainToolComponent;
