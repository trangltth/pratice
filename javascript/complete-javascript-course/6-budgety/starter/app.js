//---------------------budgetController------------------------
var budgetController = (function(){
  
  // contructure transaction
  transaction = function(id, description, value){
    this.id = id,
    this.description = description,
    this.value = value
  };

  var calculateBudgetByType = function(type){
    sum = 0
    data.allItems[type].forEach(function(item){
      sum += item.value
    })
    data.total[type] = sum
  }

  var data = {
    allItems:{
      inc: [],
      exp: [],
    },
    total: {
      inc: 0,
      exp: 0
    },
    budget: 0,
    percentage: -1
  };

  return {
    addTransaction: function (type, description, value) {
      id = data.allItems[type].length + 1
      trans = new transaction(id, description, value)
      data.allItems[type].push(trans)
      return trans
    },
    getAllTransaction: function () {
      return data.allItems
    },
    calculateBudget: function(type){
      calculateBudgetByType('inc')
      calculateBudgetByType('exp')
      if (data.total.inc > 0){
        data.percentage = Math.round(data.total.exp * 100 / data.total.inc)        
      } else{
        data.percentage = -1
      }
      data.budget = data.total.inc - data.total.exp
    },
    getBudget: function () {
      return{
        totalInc: data.total.inc,
        totalExp: data.total.exp,
        budget: data.budget,
        percentage: data.percentage
      }
    },
    publicTest: function () {
      console.log(data)
    }
  }

})();

//---------------------UIController-------------------------
var UIController = (function () {
  var DOMElement = {
    input_type: '.add__type',
    input_description: '.add__description',
    input_value: '.add__value',
    btn_click: '.add__btn',
    exp_list: '.expenses__list',
    inc_list: '.income__list',
    budget_total: '.budget__value',
    budget_income_value: '.budget__income--value',
    budget_expense_value: '.budget__expenses--value',
    budget_expense_percentage: '.budget__expenses--percentage'
  };

  var html_tag = {
    inc: '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>',
    exp: '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
  }

  return {
    getInput: function () {
      return{
        type: document.querySelector(DOMElement.input_type).value,
        description: document.querySelector(DOMElement.input_description).value,
        value: document.querySelector(DOMElement.input_value).value
      };
    },
    getDOMElement: function () {
      return DOMElement
    },
    displayAllTransaction: function (listItem) {
    },
    displayTransaction: function(type, trans){
      replaces = {
        '%id%': trans.id,
        '%description%': trans.description,
        '%value%': trans.value
      }
      var re = /%id%|%description%|%value%/g;
      var str = html_tag[type];
      contentHTML = str.replace(re, function (match) {return replaces[match]}); 
      type_list = type + '_list';
      document.querySelector(DOMElement[type_list]).insertAdjacentHTML('beforeend', contentHTML);
    },
    refreshInput: function(){
      document.querySelector(DOMElement.input_type).value = 'inc';
      document.querySelector(DOMElement.input_description).value = "";
      document.querySelector(DOMElement.input_value).value = "";
    },
    alterErrorInput: function (data) {  
      //To do: add alert when get Input error
      input_description_verify = document.querySelector(DOMElement.input_description)
      input_value_verify = document.querySelector(DOMElement.input_value)
      if((data.description.trim() === "") | isNaN(data.description)){
        input_description_verify.reportValidity()
        input_description_verify.setCustomValidity('Please Set Description!');
      } 

      if(data.value <= 0)
      {
        input_value_verify.reportValidity()
        input_value_verify.setCustomValidity('Please Input Positive Number!')
      } else if (isNaN(data.value)){
        input_value_verify.reportValidity()
        input_value_verify.setCustomValidity('Please Input a Number!')
      } 

    },
    initValidity: function () {
      document.querySelector(DOMElement.input_description).reportValidity()
      document.querySelector(DOMElement.input_description).setCustomValidity('');
      document.querySelector(DOMElement.input_value).reportValidity()
      document.querySelector(DOMElement.input_value).setCustomValidity('');
    },
    displayBudget: function(budget){
      document.querySelector(DOMElement.budget_total).textContent = budget.budget;
      document.querySelector(DOMElement.budget_income_value).textContent = budget.totalInc;
      document.querySelector(DOMElement.budget_expense_value).textContent = budget.totalExp;
      document.querySelector(DOMElement.budget_expense_percentage).textContent = 
            budget.percentage < 0 ? '---' : budget.percentage + '%';
    }
  }
})();

// --------------- Controller Oject ------------------------------
var controller = (function (budgetControll, UIControll) {

  var eventListener = function () {
    document.querySelector(UIControll.getDOMElement().btn_click).addEventListener('click', processTransaction);
    
    input_transaction_tag = UIControll.getDOMElement().input_value + ', ' + UIControll.getDOMElement().input_description
    document.querySelectorAll(input_transaction_tag).forEach(function (element, index, listObject) {
      element.addEventListener('keypress', function (event) {
        if(event.keyCode === 13 | event.which === 13){
          processTransaction()
        }
      });
      element.addEventListener('input', function () {
        UIControll.initValidity()
      })
    });
    
  };

  displayBudget = function(){
    budgetControll.calculateBudget()
    budget = budgetControll.getBudget()
    UIControll.displayBudget(budget)
  }

  processTransaction = function(){
    // get transaction from UI
    data = UIControll.getInput()
    data.value = parseFloat(data.value) 
    // check input correct or not
    if (!isNaN(data.value) && (data.description.trim() !== "") && data.value >=  0) {      
      // save data to budgetControll
      trans = budgetControll.addTransaction(data.type, data.description, data.value)

      // display input data to UI
      UIControll.displayTransaction(data.type, trans)

      // Clear Input
      UIControll.refreshInput()

      displayBudget()
    }
    else {
      UIControll.alterErrorInput(data);
    }
  }

  displayAllTransaction = function () {
    listItem = budgetControll.getAllTransaction();
    console.log("start debug displayAllTransaction in Controller:", listItem)
    UIControll.displayAllTransaction(listItem)
  }
  return {
    init: function(){
      console.log('Starting Application');
      displayBudget({
        totalInc:0,
        totalExp:0,
        budget:0,
        percentage: -1
      });
      eventListener();
    }
  };

})(budgetController, UIController);

controller.init()

