const uuid = require('uuid')
const fs = require('fs')
const path = require('path')


const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
)

class Card {
    // constructor(title, description, price, img) {
    //     this.title = title;
    //     this.description = description;
    //     this.price = price;
    //     this.img = img;
    //     this.uuid = uuid.v4()
    // }

    static async add(course) {
        let card = await Card.fetch()
        const index = card.courses.findIndex(c => c.id === course.id)
        const candidate = card.courses[index]
        if (candidate) {
            candidate.count++
            card.courses[index] = candidate
        } else {
            course.count = 1
            card.courses.push(course)
        }
        card.price += +course.price


        return new Promise((resolve, reject) => {
            fs.writeFile(p,
                JSON.stringify(card),
                (err) => {
                    if (err) reject(err)
                    resolve()
                }
            )
        })
    }

    static async remove(id) {
        const card = await Card.fetch()
        const index = card.courses.findIndex(c => c.id === id)
        console.log(index)
        const course = card.courses[index]
        if (course.count === 1) {
            //delete
            card.courses = card.courses.filter(c => c.id !== course.id)
        } else {
            //change count
            card.courses[index].count--
        }
        card.price -= course.price
        return new Promise((resolve, reject) => {
            fs.writeFile(p,
                JSON.stringify(card),
                (err) => {
                    if (err) reject(err)
                    resolve(card)
                }
            )
        })
    }

    static async fetch() {
        return new Promise(((resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if (err) reject(err)
                resolve(JSON.parse(content))
            })
        }))
    }


}

module.exports = Card