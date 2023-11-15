const dolarApi = async () => {
  const response = await fetch(
    "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
  );
  const data = await response.json();
  return { compra: data[1]["casa"]["compra"], venta: data[1]["casa"]["venta"] };
};

const climaApi = async () => {
  const key = "2b49e552b492073b4d9d65fcfa1a43c9";
  const city = encodeURIComponent("Buenos Aires");
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=es&units=metric`
  );
  const data = await response.json();
  return {
    temp: data.main.temp,
    st: data.main.feels_like,
    max: data.main.temp_max,
    min: data.main.temp_min,
    main: data.weather[0].main,
    desc: data.weather[0].description,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
  };
};

const criptoApi = async () => {
  const response = await fetch("https://criptoya.com/api/lemoncash/btc/ars/1");
  const data = await response.json();
  const numero = new Intl.NumberFormat("es-CL").format(data.totalAsk);
  const responseETH = await fetch(
    "https://criptoya.com/api/lemoncash/eth/ars/1"
  );
  const dataETH = await responseETH.json();
  const numeroETH = new Intl.NumberFormat("es-CL").format(dataETH.totalAsk);
  const responseMATIC = await fetch(
    "https://criptoya.com/api/lemoncash/matic/ars/1"
  );
  const dataMATIC = await responseMATIC.json();
  const numeroMATIC = new Intl.NumberFormat("es-CL").format(dataMATIC.totalAsk);
  const responseDAI = await fetch(
    "https://criptoya.com/api/lemoncash/matic/ars/1"
  );
  const dataDAI = await responseDAI.json();
  const numeroDAI = new Intl.NumberFormat("es-CL").format(dataDAI.totalAsk);
  const responseUSDC = await fetch(
    "https://criptoya.com/api/lemoncash/matic/ars/1"
  );
  const dataUSDC = await responseUSDC.json();
  const numeroUSDC = new Intl.NumberFormat("es-CL").format(dataUSDC.totalAsk);
  const responseUSDT = await fetch(
    "https://criptoya.com/api/lemoncash/matic/ars/1"
  );
  const dataUSDT = await responseUSDT.json();
  const numeroUSDT = new Intl.NumberFormat("es-CL").format(dataUSDT.totalAsk);
  return {
    btc: numero,
    eth: numeroETH,
    matic: numeroMATIC,
    dai: numeroDAI,
    usdc: numeroUSDC,
    usdt: numeroUSDT,
  };
};

const quote = async () => {
  const response = await fetch(
    " https://quote-garden.onrender.com/api/v3/quotes/random",
    {
      cors: "no-cors",
    }
  );
  const data = await response.json();

  return { quote: data.data[0].quoteText, author: data.data[0].quoteAuthor };
};

// Widget Dolar
const compra = document.getElementById("compra");
const venta = document.getElementById("venta");
const dolar = dolarApi().then((data) => {
  compra.innerHTML = `$${data.compra}`;
  venta.innerHTML = `$${data.venta}`;
});
const hora = new Date().getHours();
const minutes = new Date().getMinutes();
const hour = document.getElementById("hour");
hour.innerHTML = `${hora}:${minutes} hs`;

// Widget Cripto
const btc = document.getElementById("btc");
const eth = document.getElementById("eth");
const matic = document.getElementById("matic");
const dai = document.getElementById("dai");
const usdc = document.getElementById("usdc");
const usdt = document.getElementById("usdt");
const btcValue = criptoApi().then((data) => {
  btc.innerHTML = `${data.btc}`;
  eth.innerHTML = `${data.eth}`;
  matic.innerHTML = `${data.matic}`;
  dai.innerHTML = `${data.dai}`;
  usdc.innerHTML = `${data.usdc}`;
  usdt.innerHTML = `${data.usdt}`;
});

// Widget Clima
const temp = document.getElementById("temp");
const st = document.getElementById("st");
const max = document.getElementById("temp-max");
const min = document.getElementById("temp-min");
const main = document.getElementById("main");
const desc = document.getElementById("desc");
const pressure = document.getElementById("pressure");
const humidity = document.getElementById("humidity");
const clima = climaApi().then((data) => {
  temp.innerHTML = `${data.temp}°C`;
  st.innerHTML = `${data.st}°C`;
  max.innerHTML = `${data.max}°C`;
  min.innerHTML = `${data.min}°C`;
  main.innerHTML = `${data.main}`;
  desc.innerHTML = `${data.desc}`;
  pressure.innerHTML = `${data.pressure} hPa`;
  humidity.innerHTML = `${data.humidity}%`;
});

// Widget quote
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const data = quote().then((data) => {
  quoteText.innerHTML = `${data.quote}`;
  quoteAuthor.innerHTML = `${data.author}`;
});
