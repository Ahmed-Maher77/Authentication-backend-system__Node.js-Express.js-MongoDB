const allowedOrigins = ["http://localhost:8080"];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {    // to allow all origins => || origin === "*"
            callback(null, true);
        } else {
            callback(new Error("Access denied. Your domain is not allowed to access this server."));
        }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
};

module.exports = corsOptions;