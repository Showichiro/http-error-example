import axios from "axios";

const cases = [
  {
    casename: "axiosでコネクションが取れない場合",
    request: { url: "http://localhost:8080" },
    tool: "axios",
  },
  {
    casename: "axiosでコネクションが取れて400番の場合",
    request: { url: "http://localhost:3000/badRequest" },
    tool: "axios",
  },
  {
    casename: "axiosでコネクションが取れて500番の場合",
    request: { url: "http://localhost:3000/internalServerError" },
    tool: "axios",
  },
  {
    casename: "fetchでコネクションが取れない場合",
    request: { url: "http://localhost:8080" },
    tool: "fetch",
  },
  {
    casename: "fetchでコネクションが取れて400番の場合",
    request: { url: "http://localhost:3000/badRequest" },
    tool: "fetch",
  },
  {
    casename: "fetchでコネクションが取れて500番の場合",
    request: { url: "http://localhost:3000/internalServerError" },
    tool: "fetch",
  },
];

const runner = async () => {
  for (const c of cases) {
    console.log("------------------------------------------");
    console.log(c.casename);
    // request実施
    // axiosの場合
    if (c.tool === "axios") {
      try {
        const res = await axios.get(c.request.url);
        console.log(`res: ${res.data}`);
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        const res = await fetch(c.request.url);
        if (res.ok) {
          console.log("ok");
          const json = await res.json();
          console.log(`res: ${json}`);
        } else {
          console.log("not ok");
          const json = await res.json();
          console.log(`res: ${json}`);
        }
      } catch (e) {
        console.error(e);
      }
    }
    console.log("------------------------------------------");
  }
};

console.log("start");
runner().then(() => {
  console.log("end");
});
