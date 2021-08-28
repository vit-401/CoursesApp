const uuid = require('uuid')
const fs = require('fs')
const path = require('path')

class Course {
    constructor(title, description, price, img) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.img = img;
        this.uuid = uuid.v4()
    }

    toJSON() {
        return {
            title: this.title,
            description: this.description,
            price: this.price,
            img: this.img,
            id: this.uuid
        }
    }

    async save() {
        const courses = await Course.getAll()
        courses.push(this.toJSON())
        return new Promise(((resolve, reject) => {
                fs.writeFile(
                    path.join(__dirname, '..', 'data', 'courses.json'),

                    JSON.stringify(courses),

                    (err) => {
                        if (err) reject(err)
                        resolve()
                    })
            })
        )

    }

    static getAll() {
        return new Promise((res, rej) => {

            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                "utf-8",
                (err, content) => {
                    if (err) {
                        rej(err)
                    } else {
                        res(JSON.parse(content))
                    }
                }
            )
        })

        // return
    }

    static async getById(id) {
        const courses = await Course.getAll()

        return courses.find(course => course.id === id)
    }

    static async update(data) {
        const courses = await Course.getAll()

        const updatedCourses = courses.map(c => c.id === data.id ? data : c)
        return new Promise(((resolve, reject) => {
                fs.writeFile(
                    path.join(__dirname, '..', 'data', 'courses.json'),


                    JSON.stringify(updatedCourses),

                    (err) => {
                        if (err) reject(err)
                        resolve()
                    })
            })
        )

    }
}

module.exports = Course