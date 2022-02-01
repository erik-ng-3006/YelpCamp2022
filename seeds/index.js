const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 200; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			images: [
				{
					url: "https://res.cloudinary.com/dvay0rlg4/image/upload/v1643529286/YelpCamp/ced00eljphh33mblkpmh.jpg",
					filename: "YelpCamp/ced00eljphh33mblkpmh",
				},
				{
					url: "https://res.cloudinary.com/dvay0rlg4/image/upload/v1643529292/YelpCamp/qcdxrxkqoful0mrikjfk.jpg",
					filename: "YelpCamp/qcdxrxkqoful0mrikjfk",
				},
				{
					url: "https://res.cloudinary.com/dvay0rlg4/image/upload/v1643529295/YelpCamp/qb0tilrf0gzyforzvf15.jpg",
					filename: "YelpCamp/qb0tilrf0gzyforzvf15",
				},
			],
			description:
				"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce tellus odio, dapibus id fermentum quis, suscipit id erat. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Sed ac dolor sit amet purus malesuada congue. Maecenas sollicitudin. Duis viverra diam non justo. Nullam eget nisl. Integer malesuada. Mauris metus. Nunc dapibus tortor vel mi dapibus sollicitudin. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam erat volutpat. Nunc tincidunt ante vitae massa. Fusce dui leo, imperdiet in, aliquam sit amet, feugiat eu, orci. Aenean vel massa quis mauris vehicula lacinia",
			price,
			author: "61f1082326bd54b3834c9512",
			geometry: {
				type: "Point",
				coordinates: [
					cities[random1000].longitude,
					cities[random1000].latitude,
				],
			},
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
