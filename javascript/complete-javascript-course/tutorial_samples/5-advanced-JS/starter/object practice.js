const person = {
  isHuman: false,
  printIntroduction: function(){
    console.log(`name is  ${this.name} and is human ${this.isHuman}`)
  }
}

const me = Object.create(person)
me.name = "computer"
me.isHuman = true

me.printIntroduction()


