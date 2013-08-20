fridge = "full of beer"

items = "beer1 beer2 beer3".split " "

for beer in items
  console.log beer


for i in [5..10]
  console.log i

x = [1..22]

console.log x

drinkBeer = ->
  console.log "mmm beer"
  true

for item in items when item isnt 'beer2'
  drinkBeer()

fridge =
  beer: items
  chips: ["potato", "bbq"]
  consume: (item) ->
    item.pop()

add = (x, y) ->
  x + y

console.log add 7, 12


$(document).ready ->
  console.log "document is ready"
  $('h1').click ->
    $('body').css 'background-color', '#f0f'
