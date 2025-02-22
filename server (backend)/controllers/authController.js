const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
	try {
		const { first_name, last_name, email, password } = req.body;
		const isValid = first_name && last_name && email && password;

		if (!isValid) {
			return res.status(400).json({ message: "Invalid inputs! All Fields are required." });
		}

		const foundUser = await User.findOne({ email }).exec();
		if (foundUser) {
			return res.status(401).json({ message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10); // add 10 random characters

		const user = await User.create({
			first_name,
			last_name,
			email,
			password: hashedPassword,
		});

		const accessToken = jwt.sign(
			{ UserInfo: { id: user._id } },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "120m" }
		);

		const refreshToken = jwt.sign(
			{ UserInfo: { id: user._id } },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: "30d" }
		);

		res.cookie("jwt", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production", // Set to true for HTTPS
			sameSite: "None", // cross-site cookie => mainDomain + subDomain (strict => only mainDomain)
			maxAge: 604800000, // 7 days
		});

		res.status(201).json({
                message: 'You have successfully registered',
				accessToken,
				email: user.email,
				first_name: user.first_name,
				last_name: user.last_name,
			});
	} catch (error) {
		console.error("Error during registration:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isValid = email && password;

        if (!isValid) {
			return res.status(400).json({ message: "Invalid inputs! All Fields are required." });
		}

		const foundUser = await User.findOne({ email }).exec();
		if (!foundUser) {
			return res.status(401).json({ message: "User doesn't exist!" });
		}

		const isMatch = await bcrypt.compare(password, foundUser.password); // add 10 random characters

        if (!isMatch) {
            return res.status(401).json({ message: "Wrong Password!" });
        }

		const accessToken = jwt.sign(
			{ 
                UserInfo: { 
                    id: foundUser._id 
                } 
            },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "120m" }
		);

		const refreshToken = jwt.sign(
			{ 
                UserInfo: { 
                    id: foundUser._id 
                } 
            },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: "30d" }
		);

		res.cookie("jwt", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production", // Set to true for HTTPS
			sameSite: "None", // cross-site cookie => mainDomain + subDomain (strict => only mainDomain)
			maxAge: 604800000, // 7 days
		});

		res.status(201).json({
				message: 'You have successfully logged in',
                accessToken,
				email: foundUser.email,
				first_name: foundUser.first_name,
				last_name: foundUser.last_name,
			});
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const refresh = (req, res) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const refreshToken = cookies.jwt;
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: 'Unauthorized User! Invalid token' });
                }
                const foundUser = await User.findById(decoded.UserInfo.id).exec();
                if (!foundUser) {
                    return res.status(403).json({ message: 'Unauthorized User! User not found' });
                }
                const accessToken = jwt.sign(
                    { 
                        UserInfo: { 
                            id: foundUser._id 
                        } 
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "120m" }
                );
                res.json({ accessToken });
            })
    } catch (err) {
        console.error("Error during refresh token validation:", err);
        return res.status(500).json({ message: "Internal server error" });
    } 
}

const logout = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
    });
    res.json({ message: "Logged out successfully" });
}

module.exports = { register, login, refresh, logout };
