import { professionsObject as professions } from "./professions.api";
const qualities = {
    tedious: {
        _id: "67rdca3eeb7f6fgeed471198",
        name: "Нудила",
        color: "primary"
    },
    strange: {
        _id: "67rdca3eeb7f6fgeed471100",
        name: "Странный",
        color: "secondary"
    },
    buller: {
        _id: "67rdca3eeb7f6fgeed4711012",
        name: "Троль",
        color: "success"
    },
    alcoholic: {
        _id: "67rdca3eeb7f6fgeed471101",
        name: "Алкоголик",
        color: "danger"
    },
    handsome: {
        _id: "67rdca3eeb7f6fgeed471102",
        name: "Красавчик",
        color: "info"
    },
    uncertain: {
        _id: "67rdca3eeb7f6fgeed471103",
        name: "Неуверенный",
        color: "dark"
    }
};

const users = [
    {
        _id: "67rdca3eeb7f6fgeed471815",
        name: "Джон Дориан",
        img: "data:image/jpeg;base64,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",
        profession: professions.doctor,
        email: "Jony7351@tw.com",
        sex: "male",
        qualities: [qualities.tedious, qualities.uncertain, qualities.strange],
        completedMeetings: 36,
        rate: 2.5,
        bookmark: false
    },
    {
        _id: "67rdca3eeb7f6fgeed471816",
        name: "Кокс",
        email: "white4571@twipet.com",
        sex: "male",
        img: "https://images5.fanpop.com/image/photos/31100000/Dr-Cox-dr-perry-cox-31127889-1024-768.png",
        profession: professions.doctor,
        qualities: [qualities.buller, qualities.handsome, qualities.alcoholic],
        completedMeetings: 15,
        rate: 2.5,
        bookmark: false
    },
    {
        _id: "67rdca3eeb7f6fgeed471817",
        name: "Боб Келсо",
        email: "bob007@tw.com",
        sex: "male",
        img: "https://images.fanpop.com/images/image_uploads/Dr-Kelso-scrubs-43467_524_626.jpg",
        profession: professions.doctor,
        qualities: [qualities.buller],
        completedMeetings: 247,
        rate: 3.5,
        bookmark: false
    },
    {
        _id: "67rdca3eeb7f6fgeed471818",
        name: "Рэйчел Грин",
        email: "green7311@fam.biz",
        sex: "female",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROwKU5J3qONbCxUoF_Kv1KvYZaRHLDhNxy0Q&usqp=CAU",
        profession: professions.waiter,
        qualities: [qualities.uncertain],
        completedMeetings: 148,
        rate: 3.5,
        bookmark: false
    },
    {
        _id: "67rdca3eeb7f6fgeed471819",
        name: "Шелдон Купер",
        email: "mindgames6878@phis.tech",
        sex: "male",
        img: "https://kino-teatr.ua/public/main/serials/article_454.jpg",
        profession: professions.physics,
        qualities: [qualities.strange, qualities.tedious],
        completedMeetings: 37,
        rate: 4.6,
        bookmark: false
    },
    {
        _id: "67rdca3eeb7f6fgeed471820",
        name: "Леонард Хофстедтер",
        email: "mindes000@phis.tech",
        sex: "male",
        img: "https://u.movielib.ru/charpics/1001583059/r/i91fpwso/charpics-r.jpg",
        profession: professions.physics,
        qualities: [qualities.strange, qualities.uncertain],
        completedMeetings: 147,
        rate: 3.5,
        bookmark: false
    },
    {
        _id: "67rdca3eeb7f6fgeed471821",
        name: "Говард Воловиц",
        email: "gov1903@phis.tech",
        sex: "male",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDxQqx-pkpzMNX6SAsZrRdWPynRi5ucJAE4uRmhI7jRE5iyGZeQU2Dy7vsmjvWJKg_QTM&usqp=CAU",
        profession: professions.engineer,
        qualities: [qualities.strange, qualities.tedious],
        completedMeetings: 72,
        rate: 3.5,
        bookmark: false
    },
    {
        _id: "67rdca3eeb7f6fgeed471822",
        name: "Никола Тесла",
        email: "electro@underground.tech",
        sex: "male",
        img: "https://patentmsk.ru/upload/iblock/2d3/2d3ed6899d31675cf32b173662abfdcb.jpg",
        profession: professions.engineer,
        qualities: [qualities.handsome],
        completedMeetings: 72,
        rate: 5,
        bookmark: false
    },
    {
        _id: "67rdca3eeb7f6fgeed471823",
        name: "Моника Геллер",
        email: "mono@super.com",
        sex: "female",
        img: "http://images6.fanpop.com/image/photos/39500000/Monica-Geller-friends-39567779-448-573.jpg",
        profession: professions.cook,
        qualities: [qualities.strange, qualities.uncertain],
        completedMeetings: 17,
        rate: 4.5,
        bookmark: false
    },
    {
        _id: "67rdca3eeb7f6fgeed471824",
        name: "Рататуй",
        email: "ratatatata@underground.com",
        sex: "male",
        img: "https://i.pinimg.com/originals/3a/48/25/3a48250333ec31c81fe01201285c1b0b.jpg",
        profession: professions.cook,
        qualities: [qualities.handsome, qualities.buller],
        completedMeetings: 17,
        rate: 4.5,
        bookmark: false
    },
    {
        _id: "67rdca3eeb7f6fgeed47181f",
        name: "Джоуи Триббиани",
        email: "joe@trib.com",
        sex: "male",
        img: "https://citaty.info/files/characters/14608.png",
        profession: professions.actor,
        qualities: [qualities.uncertain, qualities.strange],
        completedMeetings: 434,
        rate: 3.5,
        bookmark: false
    },
    {
        _id: "67rdca3eeb7f6fgeed47181r",
        name: "Брэд Питт",
        email: "superstar@star.com",
        sex: "male",
        img: "https://n1s1.starhit.ru/6f/58/f5/6f58f5de8ef7a8669cef896d4b704f99/444x460_0_92764dc43eeb25ee237acec0c520fd36@480x497_0xac120003_20009305281589455348.jpg",
        profession: professions.actor,
        qualities: [qualities.handsome],
        completedMeetings: 434,
        rate: 5,
        bookmark: false
    }
];

if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(users));
}

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(JSON.parse(localStorage.getItem("users")));
        }, 2000);
    });
const update = (id, data) =>
    new Promise((resolve) => {
        const users = JSON.parse(localStorage.getItem("users"));
        const userIndex = users.findIndex((u) => u._id === id);
        users[userIndex] = { ...users[userIndex], ...data };
        localStorage.setItem("users", JSON.stringify(users));
        resolve(users[userIndex]);
    });

const getById = (id) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(
                JSON.parse(localStorage.getItem("users")).find(
                    (user) => user._id === id
                )
            );
        }, 1000);
    });

export default {
    fetchAll,
    getById,
    update
};
