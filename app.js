function handleFormSubmit(event) {
  event.preventDefault();
  const totalseat = document.getElementById("total_seat");
  const total = document.getElementById("total");

  let myobj = {
    num: event.target.num.value,
    name: event.target.name.value,
  };

  axios
    .post(
      "https://crudcrud.com/api/ad6e702e1b9e4db295451b6c8f16549f/products",
      myobj
    )
    .then((res) => {
      console.log(res.data);
      edtingobj = {};
      isediting = false;
    })
    .catch((err) => {
      console.error("Error:", err);
    })
    .finally(() => {
      getdat();
    });
}

const ulSelector = document.querySelector("ul");
let proPrice = [];
function getdat() {
  axios
    .get("https://crudcrud.com/api/ad6e702e1b9e4db295451b6c8f16549f/products")
    .then((res) => {
      ulSelector.innerHTML = "";
      proPrice = res.data;
      countproducts();
      for (let i = 0; i < res.data.length; i++) {
        show(res.data[i]);
      }
    })

    .catch((err) => {
      console.error("Error:", err);
    });
}

getdat();

function show(myobj) {
  //console.log(myobj);
  const newli = document.createElement("li");
  const newlitext = document.createTextNode(`${myobj.num} ${myobj.name}`);
  console.log(myobj.name);
  newli.appendChild(newlitext);

  const del_but = document.createElement("button");
  del_but.id = "d_btn";
  del_but.className = "d_btn";
  del_but.style.margin = "5px";
  del_but.style.backgroundColor = "orangered";
  del_but.style.color = "white";
  const del_text = document.createTextNode("Delete Product");
  del_but.appendChild(del_text);
  del_but.addEventListener("click", function () {
    axios
      .delete(
        "https://crudcrud.com/api/ad6e702e1b9e4db295451b6c8f16549f/products/" +
          myobj._id
      )
      .then((res) => {
        console.log(res);
        getdat();
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  });

  newli.appendChild(newlitext);
  newli.appendChild(del_but);
  ulSelector.appendChild(newli);
}

function countproducts() {
  //console.log(proPrice);
  let totalPrice = 0;

  for (let i = 0; i < proPrice.length; i++) {
    totalPrice += parseInt(proPrice[i].num) || 0;
    // console.log(proPrice[i].num);
  }
  //console.log(totalPrice);
  document.getElementById("toNumber").innerHTML = totalPrice;
}
