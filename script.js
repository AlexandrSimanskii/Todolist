localStorage.setItem(
  "Tasks",
  JSON.stringify([
    {
      id: 1,
      text: "Сходить на работу",
      isDone: true,
      isImportant: false,
      isChange: false,
    },
    {
      id: 2,
      text: "Покормить собак",
      isDone: false,
      isImportant: false,
      isChange: true,
    },
    {
      id: 3,
      text: "Поучиться",
      isDone: false,
      isImportant: false,
      isChange: false,
    },
  ])
);

let dataTodo = [
  // {
  //   id: 1,
  //   text: "Сходить на работу",
  //   isDone: true,
  //   isImportant: false,
  //   isChange: false,
  // },
  // {
  //   id: 2,
  //   text: "Покормить собак",
  //   isDone: false,
  //   isImportant: false,
  //   isChange: true,
  // },
  // {
  //   id: 3,
  //   text: "Поучиться",
  //   isDone: false,
  //   isImportant: false,
  //   isChange: false,
  // },
];
dataTodo = JSON.parse(localStorage.getItem("Tasks"));
console.log(dataTodo);
let form = document.querySelector(".form");
let list = document.querySelector(".content__list");
let addField = document.querySelector(".form__field");
let addTask = document.querySelector(".form__btn");
let formSpiner = document.querySelector(".form__spiner");
let status = "All";
let activBtn = document.querySelector(".content__btn-active");
let doneBtn = document.querySelector(".content__btn-done");
let allBtn = document.querySelector(".content__btn-all");

const getDataForList = () => {
  list.innerHTML = "";
  dataTodo
    .filter((item) => {
      if (status === "Done") {
        return item.isDone;
      } else if (status === "Active") {
        return !item.isDone;
      }
      return item;
    })
    .forEach((item, idx) => {
      list.innerHTML += `<li class="content__list-item">
  <div class="content__list-item-left">
    <span data-id ="${item.id}" class="content__list-item-done ${
        item.isChange ? "icon-pencil" : item.isDone ? "icon-check" : "icon-ok"
      }"></span>
    <span style="display:${
      item.isChange ? "none" : "inline-block"
    } ;text-decoration:${item.isDone ? "line-through" : "none"}"  data-id ="${
        item.id
      }"   class="content__list-item-text"> ${item.text}</span>
    <input  data-id ="${item.id}" style="display:${
        item.isChange ? "inline-block" : "none"
      }"  class='content__list-item-input' type='text' value = '${item.text}'
  </div>
  <span style="display:${item.isChange ? "none" : "inline-block"}" data-id ="${
        item.id
      }" class="content__list-item-delete icon-cancel"></span>
  <span data-id ="${item.id}" style="display:${
        item.isChange ? "inline-block" : "none"
      }"  class="content__list-item-save">save</span>
</li>
`;
    });

  let allDoneBtn = document.querySelectorAll(".content__list-item-done");
  let allTextBtn = document.querySelectorAll(".content__list-item-text");
  let deleteList = document.querySelectorAll(".content__list-item-delete");
  let allSaveBtn = document.querySelectorAll(".content__list-item-save");
  let btnInput = document.querySelectorAll(".content__list-item-input");

  Array.from(allDoneBtn).forEach((item) => {
    item.addEventListener("click", () => {
      dataTodo = dataTodo.map((el) => {
        if (el.id === +item.getAttribute("data-id")) {
          return { ...el, isDone: !el.isDone };
        }
        return el;
      });
      getDataForList();
    });
  });

  Array.from(deleteList).forEach((item) => {
    item.addEventListener("click", () => {
      dataTodo = dataTodo.filter((el) => {
        return el.id !== +item.getAttribute("data-id");
      });
      getDataForList();
    });
  });

  Array.from(allTextBtn).forEach((item) => {
    item.addEventListener("click", () => {
      dataTodo = dataTodo.map((el) => {
        if (el.id === +item.getAttribute("data-id")) {
          return { ...el, isChange: true };
        }
        return el;
      });
      getDataForList();
    });
  });

  Array.from(allSaveBtn).forEach((item) => {
    item.addEventListener("click", () => {
      let changeText = item.previousElementSibling.previousElementSibling.value;
      dataTodo = dataTodo.map((el) => {
        if (el.id === +item.getAttribute("data-id")) {
          return { ...el, text: changeText, isChange: false };
        }
        return el;
      });
      getDataForList();
    });
  });

  Array.from(btnInput).forEach((item) => {
    item.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        dataTodo = dataTodo.map((el) => {
          if (el.id === +item.getAttribute("data-id")) {
            return { ...el, text: item.value, isChange: false };
          }
          return el;
        });
        getDataForList();
      }
    });
  });
};

getDataForList();
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(dataTodo);
  dataTodo = [
    ...dataTodo,
    {
      id: dataTodo.length ? dataTodo.at(-1).id + 1 : 1,
      text: addField.value,
      isDone: false,
      isImportant: false,
      isChange: false,
    },
  ];
  addField.value = "";
  getDataForList();
  formSpiner.style.display = "inline";
  setTimeout(() => {
    formSpiner.style.display = "none";
  }, 1000);
});

addField.addEventListener("change", () => {
  console.log(addField.value);
});

doneBtn.addEventListener("click", () => {
  status = "Done";
  doneBtn.classList.add("active");
  activBtn.classList.remove("active");
  allBtn.classList.remove("active");
  getDataForList();
});
activBtn.addEventListener("click", () => {
  status = "Active";
  doneBtn.classList.remove("active");
  activBtn.classList.add("active");
  allBtn.classList.remove("active");
  getDataForList();
});
allBtn.addEventListener("click", () => {
  status = "All";
  doneBtn.classList.remove("active");
  activBtn.classList.add("active");
  allBtn.classList.remove("active");
  getDataForList();
});

// let importantBtn = document.querySelector(".content__btn-importan");
// let doneBtn = document.querySelector(".content__btn-done");
// let allBtn = document.querySelector(".content__btn-all");

// const a = doneBtn.addEventListener("click", () => {
//   return list.classList.toggle("delete");
// });

// let k = document.querySelector(".content__icon ");
// k.addEventListener("click", () => {
//   return (addField.value = 66);
// });
getDataForList(dataTodo);

// localStorage.setItem("data", JSON.stringify({ name: "Alexandr", age: 99 }));

// console.log(JSON.parse(localStorage.getItem("data")));
// localStorage.removeItem("age");
