const save = document.querySelector(".save");
const newJob = document.querySelector(".newJob");
const list = document.querySelector(".list");
const unDoneNum = document.querySelector(".unDoneNum");
const filter = document.querySelector(".filter");
const listStatus = document.querySelector(".listStatus");
let dataList = [];

// 渲染初始化
function renderData() {
    let str = "";
    dataList.forEach(function(value, index){
        str += `<li class="todo rounded bg-light shadow-sm fs-6 px-3 py-3 my-3 d-flex align-items-center">
        <label class="checkbox" for="">
            <input type="checkbox" data-num="${index}" ${value.checked}/>
            <span>${value.content}</span>
        </label>
        <a href="#" class="deleteDone ms-auto me-2 text-secondary" ><i class="fas fa-times fs-5" data-num="${index}"></i></a>
    </li>`
    });
    list.innerHTML = str;
    checkedNum();
};

// 計算待完成項目數
function checkedNum() {
    let count = 0;
    dataList.forEach(function(value){
        if (value.checked == "") {
            count+=1;
        }
    });
    unDoneNum.textContent = `${count} 個待完成項目`
}

// 新增待辦事項函式
function addTodo() {
    let obj = [];
    if (newJob.value.trim() == ""){
        alert("請輸入待辦事項");
        return
    }
    obj.content = newJob.value;
    obj.checked = "";
    newJob.value = "";
    dataList.push(obj);
    renderData();
};

renderData();
checkedNum();

// 新增待辦事項
save.addEventListener("click", function(e){
    addTodo();
});

newJob.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});

// 刪除待辦事項、監聽清單內未完成事項並顯示筆數
list.addEventListener("click", function(e){
    if (e.target.nodeName == "I") {
        let num = e.target.getAttribute("data-num");
        dataList.splice(num, 1);
        renderData();
    } else if (e.target.getAttribute("type") == "checkbox") {
        let num = e.target.getAttribute ("data-num");
        if (dataList[num].checked == "checked") {
            dataList[num].checked = "";
        } else {
            dataList[num].checked = "checked"
        }
        checkedNum();
    }
});

// 清除所有已完成項目
listStatus.addEventListener("click", function(e){
    if (e.target.textContent == "清除已完成項目") {
        dataList = dataList.filter(item => !item.checked);
        renderData();
    };
});



// 分類事項
filter.addEventListener("click", function(e){
    let str = "";
    if (e.target.textContent == "全部") {
        renderData()
    } else if (e.target.textContent == "待完成") {
        dataList.forEach (function(value, index){
            if (value.checked == "") {
                str += `<li class="todo rounded bg-light shadow-sm fs-6 px-3 py-3 my-3 d-flex align-items-center">
                <label class="checkbox" for="">
                <input type="checkbox" data-num="${index}" ${value.checked}/>
                <span>${value.content}</span>
                </label>
                <a href="#" class="delete ms-auto me-2 text-secondary"><i class="fas fa-times fs-5" data-num="${index}"></i></a>
                </li>`
            }
            list.innerHTML = str;
        });
    } else if (e.target.textContent == "已完成") {
        dataList.forEach(function(value, index){
            if (value.checked == "checked") {
                str += `<li class="todo rounded bg-light shadow-sm fs-6 px-3 py-3 my-3 d-flex align-items-center">
                <label class="checkbox" for="">
                <input type="checkbox" data-num="${index}" ${value.checked}/>
                <span>${value.content}</span>
                </label>
                <a href="#" class="delete ms-auto me-2 text-secondary"><i class="fas fa-times fs-5" data-num="${index}"></i></a>
                </li>`
            }
            list.innerHTML = str;
        })
    }
});