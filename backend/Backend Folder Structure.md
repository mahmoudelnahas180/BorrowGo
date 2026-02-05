backend/
│
├── src/
│   ├── config/
│   │   ├── db.js            # الاتصال بقاعدة البيانات
│   │   └── env.js           # متغيرات البيئة
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   └── chat.controller.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   └── chat.routes.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Message.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── services/
│   │   └── socket.service.js
│   │
│   ├── utils/
│   │   └── helpers.js
│   │
│   ├── app.js               # إعداد Express
│   └── server.js            # تشغيل السيرفر
│
├── .env
├── .gitignore
├── package.json
└── README.md

🧠 شرح كل جزء بسرعة
🔹 config/
إعدادات المشروع

الاتصال بـ MongoDB / MySQL

قراءة .env

🔹 controllers/
منطق التطبيق

يستقبل request ويرجع response

مفيش routes هنا

مثال:

exports.login = (req, res) => {
  res.json({ message: "login success" });
};
🔹 routes/
تعريف الـ Endpoints فقط

بيربط route بـ controller

router.post('/login', login);
🔹 models/
Schema / Models

التعامل مع قاعدة البيانات

User.find()
🔹 middlewares/
auth

validation

error handling

🔹 services/
منطق معقد

Socket.io / WebSocket

APIs خارجية

🔹 utils/
Functions مساعدة

formatting

tokens

🔹 app.js
إعداد Express

middlewares

routes

🔹 server.js
تشغيل السيرفر

listen على port

